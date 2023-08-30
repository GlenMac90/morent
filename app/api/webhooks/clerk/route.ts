/* eslint-disable camelcase */
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';
import { deleteUserAndCars, updateUser } from '@/lib/actions/user.actions';
import { headers } from 'next/headers';

const webhookSecret = process.env.NEXT_CLERK_WEBHOOK_SECRET;

type EventType = 'user.created' | 'user.updated' | 'user.deleted';

type Event = {
  data: {
    id: string;
    [key: string]: string | Record<string, string>[];
  };
  object: 'event';
  type: EventType;
};

export const POST = async (request: Request) => {
  const payload = await request.json();
  const payloadType: string = payload.type;

  const header = headers();

  const heads = {
    'svix-id': header.get('svix-id'),
    'svix-timestamp': header.get('svix-timestamp'),
    'svix-signature': header.get('svix-signature'),
  };

  const wh = new Webhook(webhookSecret || '');

  let evnt: Event | null = null;

  try {
    evnt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error('Error in verification:', err);
    return NextResponse.json({ message: err }, { status: 400 });
  }

  if (payloadType === 'user.created') {
    const {
      image_url: imageFromData,
      first_name: firstName,
      id: clerkId,
      last_name: lastName,
      email_addresses,
      username: usernameFromData,
    } = evnt.data;

    const name = `${firstName} ${lastName}`;

    let email = '';
    if (
      typeof email_addresses[0] === 'object' &&
      'email_address' in email_addresses[0]
    ) {
      email = email_addresses[0].email_address;
    }

    let image = '';
    if (typeof imageFromData === 'string') {
      image = imageFromData;
    }

    let username = '';
    if (typeof usernameFromData === 'string') {
      username = usernameFromData;
    }

    try {
      await updateUser({
        image,
        name,
        email,
        clerkId,
        username,
        bio: '',
        onboarded: false,
      });

      return NextResponse.json(
        {
          message: 'User created successfully.',
        },
        { status: 201 }
      );
    } catch (err) {
      console.error('Failed to update user:', err);
      return NextResponse.json(
        { message: 'Internal Server Error from Created Event' },
        { status: 500 }
      );
    }
  }

  if (payloadType === 'user.updated') {
    const {
      image_url: imageFromData,
      first_name: firstName,
      id: clerkId,
      last_name: lastName,
      email_addresses,
      username: usernameFromData,
    } = evnt.data;

    const name = `${firstName} ${lastName}`;

    const email =
      typeof email_addresses[0] === 'object' &&
      'email_address' in email_addresses[0]
        ? email_addresses[0].email_address
        : '';

    const image = typeof imageFromData === 'string' ? imageFromData : '';

    const username =
      typeof usernameFromData === 'string' ? usernameFromData : '';

    try {
      await updateUser({
        image,
        name,
        email,
        clerkId,
        username,
        bio: '',
        onboarded: false,
      });

      return NextResponse.json(
        {
          message: 'User updated successfully.',
        },
        { status: 201 }
      );
    } catch (err) {
      console.error('Failed to update user:', err);
      return NextResponse.json(
        { message: 'Internal Server Error from Updated Event' },
        { status: 500 }
      );
    }
  }

  if (payloadType === 'user.deleted') {
    const { id: clerkId } = evnt.data;
    try {
      await deleteUserAndCars(clerkId);
      return NextResponse.json(
        {
          message: 'User deleted successfully.',
        },
        { status: 200 }
      );
    } catch (err) {
      console.error('Failed to delete user:', err);
      return NextResponse.json(
        { message: 'Internal Server Error from Deleted Event' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: 'Request processed successfully.' },
    { status: 200 }
  );
};

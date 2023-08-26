import { Webhook, WebhookRequiredHeaders } from 'svix';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';
import { deleteUserAndCars, updateUser } from '@/lib/actions/user.actions';
import { headers } from 'next/headers';

const webhookSecret = process.env.NEXT_CLERK_WEBHOOK_SECRET;

type EventType = 'user.updated' | 'user.deleted';

type Event = {
  data: {
    id: string;
    [key: string]: string | Record<string, string>[];
  };
  object: 'event';
  type: EventType;
};

export const POST = async (request: Request) => {
  console.log('Received request');
  const payload = await request.json();
  const payloadType: string = payload.type;
  console.log('Payload:', payloadType);

  console.log(payload.data);
  console.log('Full payload:', JSON.stringify(payload));
  const header = headers();

  const heads = {
    'svix-id': header.get('svix-id'),
    'svix-timestamp': header.get('svix-timestamp'),
    'svix-signature': header.get('svix-signature'),
  };

  console.log('Headers:', heads);

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

  if (payloadType === 'user.updated') {
    console.log('Handling user.updated event');
    const {
      image_url: image,
      first_name: firstName,
      id: clerkId,
      last_name: lastName,
      // eslint-disable-next-line camelcase
      email_addresses,
      username,
    } = evnt.data;

    const name = `${firstName} ${lastName}`;
    // @ts-ignore
    // eslint-disable-next-line camelcase
    const email = email_addresses[0]?.email_address;

    try {
      await updateUser({
        // @ts-ignore
        image,
        name,
        email,
        clerkId,
        // @ts-ignore
        username,
        bio: '',
        onboarded: false,
      });

      console.log('User updated successfully');
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
    console.log('Handling user.deleted event');
    const { id: clerkId } = evnt.data;
    console.log(clerkId);
    try {
      await deleteUserAndCars(clerkId);
      console.log('User deleted successfully');
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

  console.log('Request processed successfully');
  return NextResponse.json(
    { message: 'Request processed successfully.' },
    { status: 200 }
  );
};

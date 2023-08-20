import { Webhook, WebhookRequiredHeaders } from 'svix';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';
import { deleteUser, updateUser } from '@/lib/actions/user.actions';
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
    return NextResponse.json({ message: err }, { status: 400 });
  }

  const eventType: EventType = evnt?.type!;

  if (eventType === 'user.created') {
    const {
      image_url: image,
      first_name: name,
      id: userId,
      last_name: username,
    } = evnt.data;
    try {
      await updateUser({
        // @ts-ignore
        image,
        // @ts-ignore
        name,
        // @ts-ignore
        userId,
        // @ts-ignore
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

  if (eventType === 'user.updated') {
    const {
      image_url: image,
      first_name: name,
      id: userId,
      last_name: username,
    } = evnt.data;
    try {
      await updateUser({
        // @ts-ignore
        image,
        // @ts-ignore
        name,
        // @ts-ignore
        userId,
        // @ts-ignore
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

  if (eventType === 'user.deleted') {
    const { id: userId } = evnt.data;

    try {
      await deleteUser(userId);
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

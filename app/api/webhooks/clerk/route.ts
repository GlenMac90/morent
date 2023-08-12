import { Webhook, WebhookRequiredHeaders } from 'svix';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';
import { updateUser } from '@/lib/actions/user.actions';
import { headers } from 'next/headers';
import { useRouter } from 'next/router';
const webhookSecret = process.env.NEXT_CLERK_WEBHOOK_SECRET;

type EventType = 'user.created' | 'user.updated';

type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
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
    console.error('Webhook verification failed:', err);
    return NextResponse.json(
      // @ts-ignore
      { message: err.message || 'Error processing request' },
      { status: 400 }
    );
  }

  if (evnt && evnt.type === 'user.created') {
    const {
      image_url: image,
      first_name: name,
      id: userId,
      last_name: username,
    } = evnt.data;
    console.log(evnt.data);
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
    } catch (err) {
      console.error('Failed to update user:', err);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }

  if (evnt && evnt.type === 'user.updated') {
    const {
      image_url: image,
      first_name: name,
      id: userId,
      last_name: username,
    } = evnt.data;
    console.log(evnt.data);
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
    } catch (err) {
      console.error('Failed to update user:', err);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: 'Request processed successfully.' },
    { status: 200 }
  );
};

// @ts-ignore

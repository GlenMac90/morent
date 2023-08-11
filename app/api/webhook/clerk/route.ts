import { Webhook, WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';

import { updateUser } from '@/lib/actions/user.actions';

const webhookSecret = process.env.NEXT_CLERK_WEBHOOK_SECRET;

type EventType = 'user.created' | 'user.deleted' | 'user.updated';

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
    return NextResponse.json({ message: err }, { status: 400 });
  }

  const eventType: EventType = evnt?.type!;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { userId, bio, image, name } = evnt?.data;

    try {
      await updateUser({
        // @ts-ignore
        userId,
        // @ts-ignore
        bio,
        // @ts-ignore
        image,
        // @ts-ignore
        name,
      });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
};

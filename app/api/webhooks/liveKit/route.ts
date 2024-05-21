import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { connectToDatabase } from "@/lib/database";
import StreamData from "@/lib/database/models/streamData.models";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!,
);

export async function POST(req: Request): Promise<Response> {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get('Authorization')

    if (!authorization) {
        return new Response('No auth header', { status: 400 });
    }

    const event = receiver.receive(body, authorization);

    if (!event) {
        return new Response('Error receiving event', { status: 500 });
    }

    try {
        await connectToDatabase();
        const resolvedEvent = await event;

        const ingressId = resolvedEvent.ingressInfo?.ingressId;

        if (!ingressId) {
            return new Response('No ingressId found in event', { status: 400 });
        }

        const isLive = resolvedEvent.event === 'ingress_started';
        await StreamData.updateOne(
            { ingressId },
            { $set: { isLive } }
        );

        return new Response('Stream data updated successfully', { status: 200 });
    } catch (error) {
        console.error('Error updating stream data:', error);
        return new Response('Internal server error', { status: 500 });
    }
}














// import { headers } from "next/headers";
// import { WebhookReceiver } from "livekit-server-sdk";

// import { connectToDatabase } from "@/lib/database";
// import StreamData from "@/lib/database/models/streamData.models";

// const receiver = new WebhookReceiver(
//     process.env.LIVEKIT_API_KEY!,
//     process.env.LIVEKIT_SECRET_KEY!,
// );

// export async function POST(req: Request): Promise<Response> {
//     const body = await req.text();
//     const headerPayload = headers();
//     const authorization = headerPayload.get('Authorization')

//     if (!authorization) {
//         return new Response('No auth header', {status: 400});
//     }

//     const event = receiver.receive(body, authorization);

//     if (!event) {
//         return new Response('Error receiving event', {status: 500});
//     }

//     try {
//         await connectToDatabase();
//         const resolvedEvent = await event;

//         const ingressId = resolvedEvent.ingressInfo?.ingressId;

//         if (!ingressId) {
//             return new Response('No ingressId found in event', {status: 400});
//         }

//         const isLive = resolvedEvent.event === 'ingress_started';
//         await StreamData.updateOne(
//             { ingressId },
//             { $set: { isLive } }
//         );

//         return new Response('Stream data updated successfully', {status: 200});
//     } catch (error) {
//         console.error('Error updating stream data:', error);
//         return new Response('Internal server error', {status: 500});
//     }
// }


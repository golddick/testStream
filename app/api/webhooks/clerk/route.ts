import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';
import { CreateUserParams } from '@/type'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
//   console.log('Webhook body:', body)



if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, username } = evt.data;

    const email = email_addresses?.[0]?.email_address ?? '';
    const firstName = first_name ?? '';
    const usernameValue = username ?? '';
    // const streamName = `${usernameValue}'s stream`;

    // Create a stream with a dynamically generated name
    const streamName = `${usernameValue}'s stream`;
    const streamId = uuidv4();


    // Assuming createUser and updateUserMetadata functions are defined elsewhere
    const newUser = await createUser({
        clerkId: id,
        email,
        username: usernameValue,
        firstName,
        imageUrl: image_url,
        // stream: id,

        // Assign the generated stream name as a string
    });

    if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
                userId: newUser._id
            }
        });
    }

    return NextResponse.json({ message: 'ok', user: newUser });
}


// if (eventType === 'user.created') {
//   const { id, email_addresses, image_url, first_name, username } = evt.data;

//   const email = email_addresses?.[0]?.email_address ?? '';
//   const firstName = first_name ?? '';
//   const usernameValue = username ?? '';
  
//   // Generate a unique ID for the stream
//   const streamId = id;

//   // Create a stream with the generated ID and the stream name
//   const streamName = `${usernameValue}'s stream`;

//   try {
//     // await connectToDatabase();
//     // const newStream = await Stream.create({
//     //   _id: streamId,
//     //   name: streamName
//     // });

//     const newUser = await createUser({
//       clerkId: id,
//       email,
//       username: usernameValue,
//       firstName,
//       imageUrl: image_url,
//       // Assign the generated stream ID to the user's stream field
//       // stream: [{ _id: streamId, name: streamName }]

//     });

//     if (newUser) {
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//           userId: newUser._id
//         }
//       });
//     }

//     return NextResponse.json({ message: 'ok', user: newUser });
//   } catch (error) {
//     console.log('Error creating user or stream:', error);
//     return new Response('Error creating user or stream', {
//       status: 500
//     });
//   }
// }





if (eventType === 'user.updated') {
    const {id, image_url, first_name,  username } = evt.data

    const user = {
      firstName: first_name!,
      username: username!,
      imageUrl: image_url,
    }

    const updatedUser = await updateUser(id, user)

    return NextResponse.json({ message: 'OK', user: updatedUser })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const deletedUser = await deleteUser (id!)

    return NextResponse.json({ message: 'OK', user: deletedUser })
  }



  return new Response('', { status: 200 })
}



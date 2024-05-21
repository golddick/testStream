 // Define the StreamInfo type
// type StreamInfo = {
//   streamId: string;
//   name: string;
// };
 
 // ====== USER PARAMS
 export type CreateUserParams = {
    clerkId: string
    firstName: string
    username: string
    email: string
    imageUrl: string
    // stream: string;
  }

  export type UpdateUserParams = {
    firstName: string
    username: string
    imageUrl: string
  }
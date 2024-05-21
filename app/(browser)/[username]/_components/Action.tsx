'use client'

import { onBlock, onUnBlock } from '@/actions/block'
import { onFollow, onUnFollow } from '@/actions/follow'
import { onCreateStream } from '@/actions/stream'
import { Button } from '@/components/ui/button'

import React, { useTransition } from 'react'

// Import toast from 'sonner' for displaying error or success messages
import { toast } from 'sonner'

interface ActionProps {
    isfollowing: boolean;
    userId: string;
    isBlocked: boolean
}

const Action = ({ isfollowing, userId, isBlocked }: ActionProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            // Call onFollow with the userId
            onFollow(userId)
                .then((data) => {
                    // Show success message with the followed username
                    toast.success(`You just followed ${data.updatedOtherUser.username}`)
                })
                .catch(() => {
                    // Show error message
                    toast.error(`Something went wrong following `)
                })
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            // Call onUnFollow with the userId
            onUnFollow(userId)
                .then((data) => {
                    // Show success message
                    toast.success(`You just unfollowed ${data.updatedOtherUser.username}`)
                })
                .catch(() => {
                    // Show error message
                    toast.error('Something went wrong')
                })
        })
    }

    // Define onClick function to handle follow/unfollow action
    const onClick = () => {
        if (isfollowing) {
            // If already following, unfollow
            handleUnFollow()
        } else {
            // If not following, follow
            handleFollow()
        }
    }


    const handleBlock = () => {
        startTransition(() => {
            // Call onUnFollow with the userId
            onBlock(userId)
                .then((data) => {
                    // Show success message
                    toast.success(`You just blocked ${data.updatedLoggedInUser.username}`)
                })
                .catch(() => {
                    // Show error message
                    toast.error('Something went wrong')
                })
        })
    }
    
    const handleUnBlock = () => {
        startTransition(() => {
            // Call onUnFollow with the userId
            onUnBlock(userId)
                .then((data) => {
                    // Show success message
                    toast.success(`You just  UnBlocked ${data.updatedLoggedInUser.username}`)
                })
                .catch(() => {
                    // Show error message
                    toast.error('Something went wrong')
                })
        })
    }

    const onClickBlock = () => {
        if (isfollowing) {
            // If already following, unfollow
            handleBlock()
        } else {
            // If not following, follow
            handleUnBlock()
        }
    }


    // const handleStream = () => {
    //     startTransition(() => {
    //         // Call onUnFollow with the userId
    //         onCreateStream()
    //             // .then((data) => {
    //             //     // Show success message
    //             //     toast.success(`stream created`)
    //             // })
    //             // .catch(() => {
    //             //     // Show error message
    //             //     toast.error('Something went wrong')
    //             // })
    //     })
    // }
    const handleStream = async () => {
        try {
            // Call onCreateStream
            const streamData = await onCreateStream();
            // Show success message if needed
            toast.success(`Stream created: ${streamData.name}`);
        } catch (error) {
            // Show error message if needed
            toast.error('Something went wrong');
            console.error('Error handling stream creation:', error);
        }
    };
    


    return (
        <>

        <Button variant={'primary'} onClick={onClick} disabled={isPending}>
            {isfollowing ? "UnFollow" : "Follow"}
        </Button>

        <Button onClick={handleBlock} disabled={isPending}>
            { isBlocked ? 'unBlock' :"Block"}
        </Button>
        <Button  disabled={isPending} onClick={handleStream}>
           create stream
        </Button>
        
        </>
      
    )
}

export default Action

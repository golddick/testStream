import { StreamPlayerSkeleton } from "@/app/(dashboard)/u/[username]/(home)/_component/StreamPlayer";

const UserLoading  = () => {
    return (
        <div className="h-full">
            <StreamPlayerSkeleton/>
        </div>
    )
}

export default UserLoading 
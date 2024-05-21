import { getLoginUserByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import NavBar from "./_component/NavBar/NavBar";
import DashSideBar from "./_component/DashboardSideBar/DashSideBar";
import { DashBoardContainer } from "./_component/Container";

interface CreatorLayoutProps {
    children: React.ReactNode;
    params: {username: string}
}


const CreatorLayout = async ({params,children}: CreatorLayoutProps) => {

    const loggedInUser = await getLoginUserByUsername(params.username)

console.log(' loggedInUser in dash',loggedInUser)

if (!loggedInUser) {
    redirect('/')
}

    return(
        <>
        <NavBar/>
        <div className="flex h-full pt-20">
            <DashSideBar/>
            <DashBoardContainer>
            {children}
            </DashBoardContainer>
        </div>
        </>
    )
}

export default CreatorLayout
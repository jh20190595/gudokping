import { Navigate } from "react-router-dom";
import PublicPage from "../../pages/public/PublicPage.tsx";
import { useAuthStore } from "../../store/useAuthStore.ts";
import LoadingScreen from "../ui/LoadingScreen.tsx";

export default function PublicLayout() {

    const { session , isAuthLoading } = useAuthStore();

    if(isAuthLoading) {
        return <LoadingScreen/>
    }

    if(session) {
        return <Navigate to='/dashBoard' replace />;
    }

    return (
        <PublicPage/>
    )
}
import { Navigate } from "react-router-dom";
import PublicPage from "../../pages/public/PublicPage.tsx";
import { useAuthStore } from "../../store/useAuthStore.ts";
import LoadingScreen from "../ui/LoadingScreen.tsx";

export default function PublicLayout() {

    const session = useAuthStore((state) => state.session);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading)

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
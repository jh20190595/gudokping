import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../ui/LoadingScreen.tsx";
import { useAuthStore } from "../../store/useAuthStore.ts";

export default function ProtectedRoute() {

    const { session, isAuthLoading} = useAuthStore();

    if (isAuthLoading) {
        return <LoadingScreen />
    }

    if (!session) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../ui/LoadingScreen.tsx";
import { useAuthStore } from "../../store/useAuthStore.tsx";

export default function LoginValidation() {

    const { session, isAuthLoading, setSession, setAuthLoading } = useAuthStore();

    if (isAuthLoading) {
        return <LoadingScreen />
    }

    if (!session) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}
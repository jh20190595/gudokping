import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.ts";

export default function ProtectedRoute() {

    const { session, isAuthLoading} = useAuthStore();

    if (isAuthLoading) return null;

    if (!session) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}
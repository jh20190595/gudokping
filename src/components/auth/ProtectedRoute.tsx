import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.ts";

export default function ProtectedRoute() {

    const session = useAuthStore((state) => state.session);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

    if (isAuthLoading) return null;

    if (!session) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}
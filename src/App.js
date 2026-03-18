import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import PlatformLayout from './components/layout/PlatformLayout.tsx';
import DashBoard from './pages/platform/dashBoard.tsx';
import Subscription from './pages/platform/subscription.tsx';
import PublicLayout from './components/layout/PublicLayout.tsx';
import PublicPage from './pages/Public/PublicPage.tsx';
import LoginValidation from './components/auth/LoginValidation.tsx';
import { Toaster } from 'react-hot-toast';
import LoadingScreen from './components/ui/LoadingScreen.tsx';
import { useAuthStore } from './store/useAuthStore.tsx';
import { supabase } from './lib/supabase.ts';
import Calendar from './pages/platform/calendar.tsx';
import Feedback from './pages/platform/feedback.tsx';
import Help from './pages/platform/help.tsx';
import Setting from './pages/platform/setting.tsx';

const Analytics = lazy(() => import('./pages/platform/analytics.tsx')) // 지연로딩

function App() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    })
    useEffect(() => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark])

    const { setSession, setAuthLoading } = useAuthStore();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => { // 사용자가 입장하자마자 제일 먼저 보는 tsx이니 
            setSession(session);                                    // 여기서 supabase에서 세션을 가져온 뒤 전역값으로 저장
            setAuthLoading(false);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setAuthLoading(false);
        });

        return () => {
            if (authListener && authListener.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, [setSession, setAuthLoading]);


    return (
        <BrowserRouter>

            <Toaster
                position='top-center' //알림창 위치
                reverseOrder={false} // false는 생성된 순으로 아래, true는 최신이 맨 위에
                containerStyle={{ //알림을 감싸는 박스에 직접 css지정할 때 사용
                    zIndex: 99999,
                }}
                toastOptions={{
                    duration: 2000,
                    style: {
                        background: 'var(--bg-main)',
                        color: 'var(--text-main)',
                    }
                }}
            />
            <Routes>

                <Route path='/' element={<PublicLayout />} />

                <Route element={<LoginValidation />}>
                    <Route element={<PlatformLayout />}>
                        <Route path='/dashBoard' element={<DashBoard />} />
                        <Route path='/subscription' element={<Subscription />} />
                        <Route path='/calendar' element={<Calendar />} />
                        <Route path='/feedback' element={<Feedback />} />
                        <Route path='/help' element={<Help />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route path='/analytics' element={
                            <Suspense fallback={<div><LoadingScreen /></div>}>
                                <Analytics />
                            </Suspense>
                        } />
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App;

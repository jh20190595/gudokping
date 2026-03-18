import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore.tsx';
import { supabase } from '../../lib/supabase.ts';
import styles from './setting.module.css';
import { LogOut, User, Bell, Trash2, CreditCard, Moon, Download, Smartphone, Settings as SettingsIcon, Database, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUpdateProfile,useProfileSettings} from '../../hooks/useProfile.tsx';

export default function Settings() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    })
    const { session, setSession } = useAuthStore();
    const navigate = useNavigate();
    const userId = session?.user?.id;

    const userEmail = session?.user?.email || '이메일 정보 없음';
    const userName = session?.user?.user_metadata?.name || '구독핑 유저';
    const avatarUrl = session?.user?.user_metadata?.avatar_url || 'https://via.placeholder.com/80';

    const { data : isEmailEnabled = true , isLoading : isLoadingProfile } = useProfileSettings();
    const { mutate : updateEmail, isPending } = useUpdateProfile();

    useEffect(() => {  
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark])

    /*const handleToggleEmail = () => {
        if(!userId || isPending) return;

        console.log('현재 상태 :', isEmailEnabled, '보낼 상태 : ', !isEmailEnabled)
        updateEmail({
            id : userId,
            emailEnabled : !isEmailEnabled,
        })
    }*/

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error('로그아웃에 실패했습니다.');
        } else {
            setSession(null);
            toast.success('로그아웃 되었습니다.');
            navigate('/');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>Settings</h2>
                <p className={styles.subtitle}>내 계정과 앱 설정을 관리하세요.</p>
            </header>


            <div className={styles.mainGrid}>


                <section className={styles.card}>
                    <h3 className={styles.cardTitle}>
                        <User size={20} strokeWidth={2.5} /> 내 프로필
                    </h3>
                    <div className={styles.profileContent}>
                        <img src={avatarUrl} alt="Profile" className={styles.avatar} />
                        <div className={styles.userInfo}>
                            <p className={styles.userName}>{userName}</p>
                            <p className={styles.userEmail}>{userEmail}</p>
                        </div>
                    </div>
                </section>


                <section className={styles.card}>
                    <h3 className={styles.cardTitle}>
                        <SettingsIcon size={20} strokeWidth={2.5} /> 환경 설정
                    </h3>
                    <div className={styles.listContent}>

                        <div className={styles.listItem}  style={{ cursor : isPending ? 'not-allowed' : 'pointer' , opacity : isPending ? 0.6 : 1}}>
                            <div className={styles.itemLeft}>
                                <Bell size={20} strokeWidth={2.5} />
                                <span>결제일 알림</span>
                            </div>

                            <div
                                className={styles.togglePlaceholder}
                                style={{
                                    backgroundColor: isEmailEnabled ? '#4ade80' : 'var(--text-sub)',
                                    position: 'relative',
                                }}
                            >

                                <div style={{
                                    position: 'absolute',
                                    top: '1px',
                                    left: '2px',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--bg-card)',
                                    border: '2px solid var(--border-shadow)',
                                    transform: isEmailEnabled ? 'translateX(16px)' : 'translateX(0px)',
                                    transition: 'transform 0.2s ease'
                                }} />
                            </div>
                        </div>


                        <div className={styles.listItem} onClick={() => setIsDark(!isDark)}>
                            <div className={styles.itemLeft}>
                                {isDark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
                                <span>{isDark ? '라이트 모드' : '다크 모드'}</span>
                            </div>
                            <div
                                className={`${styles.togglePlaceholder} ${isDark ? styles.toggleOn : ''}`}
                                style={{
                                    backgroundColor: isDark ? '#4ade80' : 'var(--text-sub)',
                                    position: 'relative',
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '1px',
                                    left: '2px',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--bg-card)',
                                    border: '2px solid var(--border-shadow)',
                                    transform: isDark ? 'translateX(16px)' : 'translateX(0px)',
                                    transition: 'transform 0.2s ease'
                                }} />
                            </div>
                        </div>

                    </div>
                </section>


                <section className={styles.card}>
                    <h3 className={styles.cardTitle}>
                        <Database size={20} strokeWidth={2.5} /> 데이터 관리
                    </h3>
                    <div className={styles.listContent}>
                        <div className={`${styles.listItem} ${styles.noHover}`}>
                            <div className={styles.itemLeft}>
                                <Smartphone size={20} strokeWidth={2.5} />
                                <span>앱 버전</span>
                            </div>
                            <span className={styles.versionBadge}>v1.0.0</span>
                        </div>
                    </div>
                </section>


                <section className={styles.card}>
                    <h3 className={styles.cardTitle}>
                        <CreditCard size={20} strokeWidth={2.5} /> 계정 관리
                    </h3>
                    <div className={styles.listContent}>
                        <button className={styles.actionBtn} onClick={handleLogout}>
                            <LogOut size={18} strokeWidth={2.5} /> 로그아웃
                        </button>
                        <button
                            className={`${styles.actionBtn} ${styles.dangerBtn}`}
                        >
                            <Trash2 size={18} strokeWidth={2.5} /> 회원 탈퇴
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}
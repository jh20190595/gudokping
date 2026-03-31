import { NavLink } from "react-router-dom"
import styles from './SideBar.module.css'
import { IoHome } from 'react-icons/io5';
import { RiFileListFill } from "react-icons/ri";
import { useAuthStore } from "../../store/useAuthStore.ts";
import { memo } from "react";

export default function SideBar() {

    const session = useAuthStore((state) => state.session);

    const userName = session?.user?.user_metadata?.name || '구독핑';
    const avatarUrl = session?.user?.user_metadata?.avatar_url || 'https://via.placeholder.com/80';

    return (
        <>
         
            <div className={styles.container}>

                <div className={styles.logoWrap}>
                    <img src={avatarUrl} alt="profile" className={styles.avatar} />
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>User</p>
                    </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.sectionContainer}>

           
                    <div className={`${styles.topSectionWrap} ${styles.desktopOnly}`}>
                        <div className={styles.sectionTitle}>Main</div>
                        <NavLink
                            to="./dashBoard"
                            className={({ isActive }) =>
                                isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                            }
                        >
                            <IoHome size={16} color="#666" />
                            <span>DashBoard</span>
                        </NavLink>
                    </div>

                    <div className={styles.sectionWrap}>
                        <div className={styles.sectionTitle}>Subscriptions</div>
                        <NavLink
                            to="./subscription"
                            className={({ isActive }) =>
                                isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                            }
                        >
                            <RiFileListFill size={16} color="#666" />
                            <span>My Subscription</span>
                        </NavLink>

                        <NavLink
                            to="./calendar"
                            className={({ isActive }) =>
                                isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                            }
                        >
                            <RiFileListFill size={16} color="#666" />
                            <span>Calendar</span>
                        </NavLink>

                        <NavLink
                            to="./analytics"
                            className={({ isActive }) =>
                                isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                            }
                        >
                            <RiFileListFill size={16} color="#666" />
                            <span>Analytics</span>
                        </NavLink>
                    </div>

                    <div className={styles.sectionWrap}>
                        <div className={styles.sectionTitle}>Community</div>
                        <NavLink
                            to="./feedback"
                            className={({ isActive }) =>
                                isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                            }
                        >
                            <RiFileListFill size={16} color="#666" />
                            <span>Feedback</span>
                        </NavLink>

                        <NavLink
                            to="./help"
                            className={({ isActive }) =>
                                isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                            }
                        >
                            <RiFileListFill size={16} color="#666" />
                            <span>Help (FAQ)</span>
                        </NavLink>
                        <NavLink
                            to="./setting"
                            className={({ isActive }) =>
                                isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                            }
                        >
                            <RiFileListFill size={16} color="#666" />
                            <span>Setting</span>
                        </NavLink>
                    </div>
                </div>

            </div>


            <nav className={styles.bottomTab}>
                <NavLink
                    to="./dashBoard"
                    className={({ isActive }) =>
                        isActive ? `${styles.tabItem} ${styles.tabActive}` : styles.tabItem
                    }
                >
                    <IoHome size={22} />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="./subscription"
                    className={({ isActive }) =>
                        isActive ? `${styles.tabItem} ${styles.tabActive}` : styles.tabItem
                    }
                >
                    <RiFileListFill size={22} />
                    <span>구독</span>
                </NavLink>

                <NavLink
                    to="./calendar"
                    className={({ isActive }) =>
                        isActive ? `${styles.tabItem} ${styles.tabActive}` : styles.tabItem
                    }
                >
                    <RiFileListFill size={22} />
                    <span>캘린더</span>
                </NavLink>

                <NavLink
                    to="./analytics"
                    className={({ isActive }) =>
                        isActive ? `${styles.tabItem} ${styles.tabActive}` : styles.tabItem
                    }
                >
                    <RiFileListFill size={22} />
                    <span>분석</span>
                </NavLink>

                <NavLink
                    to="./setting"
                    className={({ isActive }) =>
                        isActive ? `${styles.tabItem} ${styles.tabActive}` : styles.tabItem
                    }
                >
                    <RiFileListFill size={22} />
                    <span>설정</span>
                </NavLink>
            </nav>
        </>
    )
}


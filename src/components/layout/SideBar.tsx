import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from './SideBar.module.css'
import { IoHome, IoCard, IoBarChart, IoCalendarNumberSharp } from 'react-icons/io5';
import { RiFileListFill } from "react-icons/ri";

export default function SideBar() {

    return (
        <div className={styles['container']}>

            <div className={styles.logoWrap}>
                ]               로고 들어갈 자리
            </div>

            <div className={styles.sectionContainer}>

                <div className={styles.sectionWrap}>

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
                        <span>analytics</span>
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
                        <span>feedback</span>
                    </NavLink>

                    <NavLink
                        to="./help"
                        className={({ isActive }) =>
                            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                        }
                    >
                        <RiFileListFill size={16} color="#666" />
                        <span>help (FAQ)</span>
                    </NavLink>

                </div>
            </div>

        </div>
    )
}
import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from './SideBar.module.css'
import { IoHome, IoCard, IoBarChart, IoCalendarNumberSharp } from 'react-icons/io5';
import { RiFileListFill } from "react-icons/ri";

export default function SideBar() {

    return (
        <div className={styles['container']}>

            <div className={styles.logoWrap}>
                <NavLink
                    to="./"
                >asset</NavLink>
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
                        to="./analytics"
                        className={({ isActive }) =>
                            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                        }
                    >
                        <RiFileListFill size={16} color="#666" />
                        <span>analytics</span>
                    </NavLink>
                </div>
            </div>

        </div>
    )
}
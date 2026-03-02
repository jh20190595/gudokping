import { Outlet } from "react-router-dom";
import SideBar from "./SideBar.tsx";
import styles from './PlatformLayout.module.css'
import { useModalStore } from '../../store/useModalStore.tsx';
import AddSubscriptionModal from '../../components/subscription/AddSubscriptionModal.tsx'

export default function DashBoardLayout() {

    const { isOpen} = useModalStore();
    
    return (
        <div className={styles.container}>

            <aside className={styles.sideWrap}><SideBar /></aside>


            <main className={styles.contentWrap}><Outlet /></main>

            {isOpen && <AddSubscriptionModal />}

        </div>
    )
}
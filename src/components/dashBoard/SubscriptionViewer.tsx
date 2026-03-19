import { useState } from "react"
import styles from './SubscriptionViewer.module.css';

import { useSubscriptions } from '../../hooks/useSubscriptionsQuery.ts';
import DetailsComponent from "../ui/DetailsComponent.tsx";
import LoadingScreen from "../ui/LoadingScreen.tsx";
import OverviewComponent from "../ui/OverviewComponent.tsx";

export default function SubscriptionViewer() {

    const { data: subscriptions, isLoading } = useSubscriptions('created_at');
    const [selectMenu, setSelectMenu] = useState<'Overview' | 'Details'>('Overview')

    if (subscriptions.length === 0) return <div>등록된 구독이 없어요! </div>

    if(isLoading) return <LoadingScreen/>

    return (
        <div className={styles.container}>

            <div className={styles.menuWrap}>
                <div style={{ display :'flex' , gap : '10px'}}>
                <button className={styles.menuBtn} onClick={() => setSelectMenu('Overview')}>Overview</button>
                <button className={styles.menuBtn} onClick={() => setSelectMenu('Details')}>Details</button>
                </div>
            </div>

            <div className={styles.ListWrap}>
                {selectMenu === "Overview" ? <OverviewComponent /> : <DetailsComponent/>}
            </div>

        </div>
    )
}
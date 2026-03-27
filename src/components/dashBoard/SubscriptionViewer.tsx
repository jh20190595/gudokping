import { useState } from "react"
import styles from './SubscriptionViewer.module.css';

import { useSubscriptions } from '../../hooks/useSubscriptionsQuery.ts';
import DetailsComponent from "../ui/DetailsComponent.tsx";
import OverviewComponent from "../ui/OverviewComponent.tsx";
import SubscriptionViewerSkeleton from "../skeleton/SubscriptionViewerSkeleton.tsx";

export default function SubscriptionViewer() {

    const { data: subscriptions, isLoading = true } = useSubscriptions('created_at');
    const [selectMenu, setSelectMenu] = useState<'Overview' | 'Details'>('Overview')
    
    if(isLoading) return <SubscriptionViewerSkeleton/>
    if (subscriptions.length === 0) return <div>등록된 구독이 없어요! </div>

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
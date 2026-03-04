import { useState } from "react"
import styles from './ExpenseChart.module.css';
import OverviewComponent from "../ui/OverviewCompoent.tsx";
import { useSubscriptions } from "../../hooks/useSubscriptions.tsx";
import DetailsComponent from "../ui/DetailsComponent.tsx";
import LoadingScreen from "../ui/LoadingScreen.tsx";

export default function ExpenseChart() {

    const [sortType, setSortType] = useState<'price' | 'created_at'>('created_at')
    const { data: subscriptions, isLoading } = useSubscriptions(sortType);
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
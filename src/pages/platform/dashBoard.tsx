import ExpenseChart from '../../components/dashBoard/ExpenseChart.tsx'
import SummaryCards from '../../components/dashBoard/SummaryCards.tsx'
import UpcomingList from '../../components/dashBoard/UpcomingList.tsx'

import styles from './dashBoard.module.css'
import SavingInsight from '../../components/dashBoard/SavingInsight.tsx';
import { useModalStore } from '../../store/useModalStore.tsx';

export default function DashBoard() {

    const {openForm} = useModalStore();

    return (
        <div className={styles.container}>

            <div className={styles.topSection}>
                <div className={styles.title}>DashBoard</div>
                <button className={styles.addSubscriptionBtn} onClick={openForm}>+ 구독 추가</button>
            </div>

            <SummaryCards />
            <div className={styles.divider}></div>

            <div className={styles.bottomSection}>
                <section className={styles.chartArea}><ExpenseChart /></section>
                <section className={styles.listArea}><UpcomingList /></section>
                <section className={styles.insightArea}><SavingInsight/></section>
            </div>
        </div>
    )
}
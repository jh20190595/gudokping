import SubscriptionViewer from '../../components/dashBoard/SubscriptionViewer.tsx'
import SummaryCards from '../../components/dashBoard/SummaryCards.tsx'
import UpcomingList from '../../components/dashBoard/UpcomingList.tsx'
import PaymentReminer from '../../components/dashBoard/PaymentReminder.tsx'
import styles from './DashBoard.module.css'

export default function DashBoard() {

    return (
        <div className={styles.container}>

            <SummaryCards />
            <div className={styles.divider}></div>

            <div className={styles.bottomSection}>
                <section className={styles.chartArea}><SubscriptionViewer /></section>
                <section className={styles.listArea}><UpcomingList /></section>
                <section className={styles.PaymentReminderArea}><PaymentReminer/></section>
            </div>
        </div>
    )
}
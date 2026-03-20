import CalendarComponent from '../../components/calendar/CalendarComponent.tsx';
import SummaryCards from '../../components/dashBoard/SummaryCards.tsx';
import styles from './Calendar.module.css';

export default function Calendar() {
    return (
        <div className={styles.container}>

            <div className={styles.topSection}>
                <SummaryCards />
                <div className={styles.divider}></div>
            </div>
            <div className={styles.content}>
                <CalendarComponent />
            </div>
        </div>
    )
}
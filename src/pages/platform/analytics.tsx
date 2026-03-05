import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import { useModalStore } from '../../store/useModalStore.tsx'
import { calculateMonthlyTotal } from '../../utils/calculateMonthlyTotal.tsx';
import SummaryCards from '../../components/dashBoard/SummaryCards.tsx'
import styles from './analytics.module.css'
import RankComponent from '../../components/analytics/RankCompoent.tsx';
import BudgetComponent from '../../components/analytics/BudgetComponent.tsx';
import VisualComponent from '../../components/analytics/VisualComponent.tsx';

export default function Analytics() {

    const { openForm } = useModalStore();
    const { data: subscriptions } = useSubscriptions();

    return (
        <div className={styles.container}>
            <SummaryCards />
            <div className={styles.divider}></div>

            <div className={styles.contentWrap}>

                <section className={styles.chartsWrap}> {/* 그래프 영역 */}
                    <h2>Spending Trend</h2>
                </section>

                <section className={styles.rankWrap}> {/* 가격순위  영역 */}
                    <RankComponent />
                </section>

                <section className={styles.budgetWrap}> {/* 예산 영역 */}
                    <BudgetComponent />
                </section>

                <section className={styles.visualWrap}> {/* 시각자료 영역 */}
                    <VisualComponent/>
                </section>

            </div>


        </div>
    )
}
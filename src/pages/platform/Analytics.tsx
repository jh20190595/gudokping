import SummaryCards from '../../components/dashBoard/SummaryCards.tsx'
import styles from './Analytics.module.css'
import RankComponent from '../../components/analytics/RankComponent.tsx';
import BudgetComponent from '../../components/analytics/BudgetComponent.tsx';
import VisualComponent from '../../components/analytics/VisualComponent.tsx';
import MonthlyCostComponent from '../../components/analytics/MonthlyCostComponent.tsx';

export default function Analytics() {




    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <SummaryCards />
                <div className={styles.divider}></div>
            </div>

            <div className={styles.contentWrap}>

                <section className={styles.chartsWrap}> {/* 그래프 영역 */}
                    <MonthlyCostComponent />
                </section>

                <section className={styles.rankWrap}> {/* 가격순위  영역 */}
                    <RankComponent />
                </section>

                <section className={styles.budgetWrap}> {/* 예산 영역 */}
                    <BudgetComponent />
                </section>

                <section className={styles.visualWrap}> {/* 시각자료 영역 */}
                    <VisualComponent />
                </section>

            </div>


        </div>
    )
}
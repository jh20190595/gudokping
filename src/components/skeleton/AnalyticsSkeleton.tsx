import styles from '../../pages/platform/Analytics.module.css'
import skeletonStyles from './Skeleton.module.css';

export default function AnalyticsSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <div className={skeletonStyles.skeletonSummaryCard}></div>
                <div className={styles.divider}></div>
            </div>

            <div className={styles.contentWrap}>
                <section className={`${styles.chartsWrap} ${skeletonStyles.skeletonSection}`} />
                <section className={`${styles.rankWrap} ${skeletonStyles.skeletonSection}`} />
                <section className={`${styles.budgetWrap} ${skeletonStyles.skeletonSection}`} />
                <section className={`${styles.visualWrap} ${skeletonStyles.skeletonSection}`} />
            </div>
        </div>
    )
}
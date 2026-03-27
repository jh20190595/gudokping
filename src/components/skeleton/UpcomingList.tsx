import styles from '../../components/dashBoard/Upcoming.module.css';
import skeletonStyles from './skeleton.module.css';

export default function UpcomingListSkeleton() {
    return (
        <div className={styles.container}>
            <div className={skeletonStyles.skeletonTitle} />
            <div className={styles.UpcomingListWrap}>
                <ul className={styles.ListWrap}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i} className={styles.item}>
                            <div className={skeletonStyles.skeletonImg} />
                            <div className={skeletonStyles.skeletonContent}>
                                <div className={skeletonStyles.skeletonName} />
                                <div className={skeletonStyles.skeletonDday} />
                            </div>
                            <div className={skeletonStyles.skeletonPrice} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
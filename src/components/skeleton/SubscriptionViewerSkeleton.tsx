// src/components/skeleton/SubscriptionViewerSkeleton.tsx
import styles from '../dashBoard/SubscriptionViewer.module.css';
import skeletonStyles from './Skeleton.module.css'

export default function SubscriptionViewerSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.menuWrap}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className={skeletonStyles.skeletonBtn} />
                    <div className={skeletonStyles.skeletonBtn} />
                </div>
            </div>
            <div className={styles.ListWrap}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={skeletonStyles.skeletonViewerItem}>
                        <div className={skeletonStyles.skeletonImg} />
                        <div className={skeletonStyles.skeletonContent}>
                            <div className={skeletonStyles.skeletonName} />
                            <div className={skeletonStyles.skeletonDday} />
                        </div>
                        <div className={skeletonStyles.skeletonPrice} />
                    </div>
                ))}
            </div>
        </div>
    )
}
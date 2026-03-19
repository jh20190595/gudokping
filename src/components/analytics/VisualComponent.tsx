import { useState } from 'react';
import styles from './VisualComponent.module.css';
import TreemapComponent from '../charts/TreemapComponent.tsx';
import BubblesComponent from '../charts/BubblesComponent.tsx';
import DonutComponent from '../charts/DonutComponent.tsx';


const CHARTS_MAP: Record<string, React.ReactNode> = {
    'Treemap': <TreemapComponent />,
    'Bubbles': <BubblesComponent />,
    'Donut': <DonutComponent />,
}

const TAP_TYPE = ['Treemap', 'Bubbles','Donut'];

export default function VisualComponent() {

    const [activeTap, setActiveTap] = useState('Treemap')

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h4 style={{ margin: 0 }}>Subscription Visuals</h4>
                <ul className={styles.topBtnWrap}>
                    {TAP_TYPE.map((item, index) => (
                        <li key={item} className={styles.topBtnItem}>
                            <button className={`${styles.topBtn} ${activeTap === item ? styles.activeBtn : ""}`} onClick={() => setActiveTap(item)}>{item}</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.content}>
                {CHARTS_MAP[activeTap]}
            </div>
            <div className={styles.footer}></div>
        </div>
    )
}

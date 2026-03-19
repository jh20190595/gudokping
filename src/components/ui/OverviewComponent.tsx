import { useMemo, useState, useEffect } from "react";
import styles from './Overview.module.css';
import { useSubscriptions } from '../../hooks/useSubscriptionsQuery.ts';

const COLORS = [
    "#fca5a5", "#93c5fd", "#c4b5fd", "#fdba74", "#86efac",
];

const categoryList = ['OTT', 'SHOPPING', 'AI', 'FOOD', 'MUSIC'];

export default function OverviewComponent() {
    const { data: subscriptions } = useSubscriptions('created_at');

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 200); // 
        return () => clearTimeout(timer);
    }, []);

    const data = useMemo(() => {
        if (!subscriptions) {

            return categoryList.map((item, index) => ({
                name: item,
                value: 0,
                percent: 0,
                color: COLORS[index]
            }))
        }

        const maxSpend = Math.max(...categoryList.map(item =>
            subscriptions.filter(f => f.category === item).reduce((acc, cur) => acc + cur.price, 0)
        ));

        return categoryList.map((item, index) => {
            const totalPrice = subscriptions
                .filter(f => f.category === item)
                .reduce((acc, service) => acc + service.price, 0);

            return {
                name: item,
                value: totalPrice,
                percent: maxSpend > 0 ? Math.min((totalPrice / maxSpend),1) : 0,
                color: COLORS[index]
            }
        })
    }, [subscriptions]);

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>📊 Spending by Category</h4>
            <ul className={styles.menu}>
                {data.map((item, index) => (
                    <li key={item.name} className={styles.content}>
                        <div className={styles.subContent}>
                            <div className={styles.categoryName}>{item.name}</div>
                            <div className={styles.totalPrice}>₩ {item.value.toLocaleString()}/month</div>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '12px',
                            borderRadius: '8px',
                            border: '1px solid #666',
                            backgroundColor: 'var(--bg-sub)',
                            boxSizing: 'border-box',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '8px',
                                backgroundColor: item.color,
                                transformOrigin : 'left',
                                transform : isMounted ? `scaleX(${item.percent})` : 'scaleX(0)',
                                transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)' 
                            }}></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
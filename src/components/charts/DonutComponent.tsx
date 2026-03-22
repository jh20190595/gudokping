import { useSubscriptions } from '../../hooks/useSubscriptionsQuery.ts';
import { useSubscriptionSummary } from '../../hooks/useSubscriptionSummary.ts';
import styles from './DonutComponent.module.css'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

const COLORS = [
    '#FF3366',
    '#00E5FF', 
    '#FFD500', 
    '#B026FF', 
    '#00FF88'
];
const CATEGORY = ['ott', 'music', 'shopping', 'ai', 'food']

export default function DonutComponent() {

    const { data: subscriptions = [] } = useSubscriptions();
    const { summary } = useSubscriptionSummary();
    const totalMonthlycost = summary?.totalMonthlycost || 0;

    const screenWidth = window.innerWidth;
    const innerRadius = screenWidth <= 480 ? 55 : screenWidth <= 768 ? 90 : 150;
    const outerRadius = screenWidth <= 480 ? 85 : screenWidth <= 768 ? 130 : 200;

    const filterData = useMemo(() => {
        if (!subscriptions) return [];
        const categoryData = CATEGORY.map((categoryName) => {
            const totalValue = subscriptions
                .filter((sub) => sub.category.toLocaleLowerCase() === categoryName)
                .reduce((acc, sub) => {
                    const monthlyPrice = sub.billing_cycle === 'yearly' ? sub.price / 12 : sub.price;
                    return acc + monthlyPrice
                }, 0)
            return { name: categoryName, value: totalValue }
        })
        return categoryData.filter(f => f.value > 0);
    }, [subscriptions])

    return (
        <div className={styles.chartWrapper}>
            <div style={{ gridRow: 'span 2' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={filterData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={outerRadius}
                            paddingAngle={5}
                            stroke="none"
                            animationDuration={800}
                            animationBegin={100}
                        >
                            {filterData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className={styles.title}>
                    <div style={{ fontSize: '12px', color: 'var(--text-main)' }}>Total</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        ₩ {Math.floor(totalMonthlycost).toLocaleString()}
                    </div>
                </div>
            </div>

            <ul className={styles.legendWrap}>
                {filterData.map((item, index) => {
                    const percent = totalMonthlycost > 0
                        ? Math.round((item.value / totalMonthlycost) * 100)
                        : 0;
                    return (
                        <li key={`legend-${item.name}`} className={styles.item}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: COLORS[index % COLORS.length]
                                }}></span>
                                <span style={{ textTransform: 'uppercase' }}>{item.name}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <span style={{ color: 'var(--text-main)' }}>{percent}%</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}
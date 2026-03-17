import { useMemo } from 'react';
import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import styles from './MonthlyCostComponent.module.css'

export default function MonthlyCostComponent() {
    const { data: subscriptions = [] } = useSubscriptions();

    const currentMonth = new Date().getMonth();

    const chartData = useMemo(() => {
        if (!subscriptions || subscriptions.length === 0) return [];
        const monthlyArray = Array.from({ length: 12 }, (_, i) => ({
            name: `${i + 1}월`,
            cost: 0,
        }));

        subscriptions.forEach((sub) => {
            const price = Number(sub.price) || 0;

            if (sub.billing_cycle === 'monthly') {
                const startMonth = new Date(sub.start_date).getMonth();
                monthlyArray.forEach((month,idx) => {
                    if( idx >= startMonth ) {
                        month.cost += price;
                    }
                })
            } else if (sub.billing_cycle === 'yearly' && sub.next_billing_date) {
                const monthlySplit = price / 12;
                monthlyArray.forEach((month) => {
                    month.cost += monthlySplit
                })
            }
        });

        return monthlyArray;
    }, [subscriptions]);

    return (
        <div style={{ width: '100%', height: '100%',boxSizing : 'border-box'}}>
            <h4 style={{ margin : '0' , padding : '0' }}>🗓️ 월별 예상 지출</h4>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
    
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666',fontWeight : 700 }}
                        dy={10}
                    />
                    <Tooltip
                        cursor = {{ fill : 'var(--bg-sub)'}}
                        formatter={(value : number) => [`₩ ${Math.floor(value).toLocaleString()}`, '금액']}
                        contentStyle={{
                            backgroundColor : 'var(--bg-card)',
                            border : '2px solid var(--border-shadow)',
                            borderRight : '8px',
                            boxShadow : '4px 4px 0px var(--border-shadow)',
                            padding : '10px 15px',
                        }}
                        labelStyle={{ color : '#666', fontSize : '12px', fontWeight : 700, marginBottom : '4px'}}
                        itemStyle={{ color : '#ef4444', fontSize : '16px', fontWeight : 800, padding : 0}}
                    />

                    <Bar dataKey="cost" radius={[6, 6, 0, 0]} barSize={100}>
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index === currentMonth ? '#93c5fd' : 'var(--bg-sub)'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
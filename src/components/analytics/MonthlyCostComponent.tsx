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
            monthIndex: i 
        }));

        subscriptions.forEach((sub) => {
            if (sub.billing_cycle === 'monthly') {
                const startMonth = new Date(sub.start_date).getMonth(); // 시작월
                for (let i = startMonth; i <=currentMonth; i++) {
                    monthlyArray[i].cost += sub.price;
                }
            } else if (sub.billing_cycle === 'yearly' && sub.next_billing_date) {

                const billingMonth = new Date(sub.next_billing_date).getMonth();
                monthlyArray[billingMonth].cost += sub.price;
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

                    <Bar dataKey="cost" radius={[6, 6, 0, 0]} barSize={100}>
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index === currentMonth ? '#93c5fd' : '#f3f4f6'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
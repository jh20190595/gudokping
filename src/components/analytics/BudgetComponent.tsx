import { useEffect, useState } from 'react';
import styles from './BudgetComponent.module.css';
import { Pencil } from 'lucide-react';
import { useSubscriptionSummary } from '../../hooks/useSubscriptionSummary.ts';

export default function BudgetComponent() {

    const { summary } = useSubscriptionSummary();
    const { totalMonthlycost = 0 } = summary || {};

    const [budget, setBudget] = useState<number>(() => {
        const save = localStorage.getItem('user_budget');
        return save ? Math.max(0, Number(save)) : 0;
    });

    useEffect(() => {
        localStorage.setItem('user_budget', budget.toString());
    }, [budget])

    const handleBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, '');
        const value = Number(rawValue);

        if (!isNaN(value)) {
            setBudget(Math.max(0, value));
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.top}>
                <h4 style={{ margin: 0 }}>Monthly Budget</h4>
                <p style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-main)' }}>* 목표 금액 안에서 알뜰하게 구독하기</p>
            </div>

            <div className={styles.inputWrap}>
                <span style= {{ color : 'var(--text-main)'}}>Budget  :  </span>
                <div className={styles.input}>
                    <span>₩</span>
                    <input
                        value={budget === 0 ? '' : budget.toLocaleString()}
                        onChange={handleBudget}
                    />
                    <Pencil size={16} color='#999' />
                </div>

            </div>

            <div className={styles.gaugeBarWrap}>
                <div className={styles.budgetWrap}>
                    <div>
                    <span style={{ fontSize: "18px", fontWeight: '600' }}>{`₩ ${Math.floor(totalMonthlycost).toLocaleString()} \n`}</span>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-main)' }}>{`/ \n₩ ${Math.floor(budget).toLocaleString()}`}</span>
                    </div>
                    <span style={{ fontSize : '13px' , fontWeight : '700', color : '#f87171' }}>{`${Math.floor(Math.min(totalMonthlycost / Number(budget) * 100,100))}%`}</span>
                </div>
                <GaugeBar budget={budget} monthlyCost={totalMonthlycost} />
                {totalMonthlycost > budget && <h5 style={{ margin: 0, color: 'red', fontSize: '11px', fontWeight: '600' }} className={styles.noticeText}>* 예산을 초과하였습니다.</h5>}

            </div>

        </div>
    )
}

function GaugeBar({ budget, monthlyCost }: { budget: number, monthlyCost: number }) {

    const percent = budget > 0 ? Math.min(monthlyCost / Number(budget),1) : 0;
    const isOverBudget = budget > 0 && monthlyCost > budget;
    const barColor = isOverBudget ? '#fecaca' : "#86efac"

    return (
        <div style={{
            width: '100%',
            height: '14px',
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
                backgroundColor: barColor,
                transformOrigin : 'left',
                transform : `scaleX(${percent})`,
                transition : 'transform 1s cubic-bezier(0.4,0,0.2,1)'
            }}></div>
        </div>
    )
}
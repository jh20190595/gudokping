import { useEffect, useState } from 'react';
import styles from './BudgetComponent.module.css';
import { Pencil } from 'lucide-react';

export default function BudgetComponent() {

    const [budget, setBudget] = useState<number>(() => {
        const save = localStorage.getItem('user_budget');
        return save ? Math.max(0, Number(save)) : 0;
    });

    useEffect(() => {
        localStorage.setItem('user_budget', budget.toString());
    },[budget])

    const handleBudget = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setBudget(Math.max(0,value));
    }

    return (
        <div className={styles.container}>
                <div className={styles.top}>
                    <h4 style={{ margin : 0}}>Monthly Budget</h4>
                    <p style={{ fontSize : '10px' , fontWeight : '600', color : '#333'}}>* 목표 금액 안에서 알뜰하게 구독하기</p>
                </div>

                <div className={styles.inputWrap}>
                    <span>Budget : </span>
                    <input
                        type='number'
                        value={budget === 0 ? '': budget}
                        onChange={handleBudget}
                    />
                </div>
        </div>
    )
}
import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.tsx';
import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import styles from './CalendarComponent.module.css';
import { useState, useMemo } from 'react';

export default function CalendarComponent() {
    
    const data = useMemo(() => {
        const today = new Date();
        return Array.from({ length: 28 }, (_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() + i); // 32 -> 3월이 31일까지니 4월 1일로 저장
            return d;
        });
    }, []);

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isFoldOpen, setIsFoldOpen] = useState(false);
    const [selectedSubs, setSelectedSubs] = useState<any[]>([]);

    const { data: subscriptions = [] } = useSubscriptions('created_at');

    const handleFoldOpen = (dateValue: number, matchSub: any[]) => {
        if (matchSub.length === 0) return;
        if (selectedDay === dateValue) {
            setSelectedDay(null);
        } else {
            setSelectedSubs(matchSub);
            setSelectedDay(dateValue);
        }
    };

    return (
        <ul className={styles.dayListWrap}>
            {data.map((item, index) => {
                const day = item.getDate(); 
                const dateValue = item.getTime(); 

                const matchSub = subscriptions.filter((sub) => {
                    if (!sub.next_billing_date) return false;
                    const subDate = new Date(sub.next_billing_date); 
                    return (
                        subDate.getFullYear() === item.getFullYear() &&
                        subDate.getMonth() === item.getMonth() &&
                        subDate.getDate() === item.getDate()
                    );
                });

                return (
                    <li 
                        key={`day-${index}`} 
                        className={`${styles.dayItem} ${matchSub.length > 0 ? styles.dayItembgChange : ''}`} 
                        onClick={() => handleFoldOpen(dateValue, matchSub)} 
                        aria-disabled={matchSub.length === 0}
                    >
                        <p>{day}</p>
                        <p>{matchSub.length}</p>
                    </li>
                );
            })}

            <li className={`${styles.foldWrap} ${selectedDay !== null ? styles.open : ''}`}>
                <ul className={styles.foldInner}>
                    {selectedSubs.map((item) => {
                        const serviceLogo = SUBSCRIPTION_SERVICES.find(f => f.service_name === item.service_name)?.logoUrl;
                        return (
                            <li key={item.id} className={styles.foldItem}>
                                <img src={serviceLogo} style={{ width: '30px', height: '30px', objectFit: 'contain', borderRadius: '30%' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '700' }}>{item.service_name}</p>
                                    <p style={{ fontSize: '10px', fontWeight: '500', color: '#333' }} >{item.category}</p>
                                </div>
                                <p> * {item.next_billing_date}</p>
                            </li>
                        );
                    })}
                </ul>
            </li>
        </ul>
    );
}
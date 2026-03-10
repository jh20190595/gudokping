import { itemAxisPredicate } from 'recharts/types/state/selectors/axisSelectors';
import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.tsx';
import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import styles from './CalendarComponent.module.css';
import { useState } from 'react';

const getLastDayOfThisMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const currentDate = today.getDate();

    const lastDate = new Date(year, month, 0).getDate();
    const nextMonthLastDate = new Date(year, month + 1, 0).getDate();

    return [currentDate, lastDate, nextMonthLastDate];
}

export default function CalendarComponent() {
    const [currentDate, lastDate, nextMonthLastDate] = getLastDayOfThisMonth();
    const [isFoldOpen, setIsFoldOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState<number | null>(null)
    const [selectedSubs, setSelectedSubs] = useState<any[]>([])

    const currentMonthDays = Array.from({ length: lastDate - currentDate + 1 }, (_, i) => currentDate + i);
    const nextMonthDays = Array.from({ length: nextMonthLastDate }, (_, i) => i + 1)
    const data = [...currentMonthDays, ...nextMonthDays].slice(0, 28)
    const { data: subscriptions = [] } = useSubscriptions('created_at');

    const handleFoldOpen = (day: number, matchSub: any[]) => {

        if (matchSub.length === 0) return;
        if (selectedDay === day) {
            setSelectedDay(null)
        } else {
            setSelectedSubs(matchSub);
            setSelectedDay(day)
        }
    }

    return (
        <ul className={styles.dayListWrap} >
            {data.map((day, index) => {
                const matchSub = subscriptions.filter((sub) => {
                    if (!subscriptions) return false
                    return new Date(sub.next_billing_date).getDate() === day
                }) // 해당 일 서비스 가져오기
                const matchSubLogo = matchSub.map((item) => (
                    SUBSCRIPTION_SERVICES.find(f => f.service_name === item.service_name)?.logoUrl
                )) // 해당 일 서비스의 로고 가져오기
                return (
                    <li key={`day-${index}`} className={`${styles.dayItem} ${matchSub.length > 0 ? styles.dayItembgChange : ''}`} onClick={() => handleFoldOpen(day, matchSub)} aria-disabled={matchSub.length === 0}>
                        <p>{day}</p>
                        <p>{matchSub.length}</p>
                    </li>
                )
            })}

            <li className={`${styles.foldWrap} ${selectedDay !== null ? styles.open : ''}`}>
                <ul className={styles.foldInner}>
                    {selectedSubs.map((item) => {
                        const serviceLogo = SUBSCRIPTION_SERVICES.find(f => f.service_name === item.service_name)?.logoUrl
                        return (
                            <li key={item.id} className={styles.foldItem}>
                                    <img src={serviceLogo} style={{ width: '30px', height: '30px', objectFit: 'contain', borderRadius: '30%' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'cneter', gap: '5px' }}>
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>{item.service_name}</p>
                                        <p style={{ fontSize: '10px', fontWeight: '500', color: '#333' }} >{item.category}</p>
                                    </div>
                                    <p> * {item.next_billing_date}</p>
                            </li>
                        )
                    })}
                </ul>
            </li>

        </ul>
    );
}
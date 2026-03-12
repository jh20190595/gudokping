import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.tsx';
import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import styles from './CalendarTest.module.css';
import { useState, useMemo } from 'react';

// 요일 배열 (일~토)
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarComponent() {
    
    // 오늘 날짜를 기준으로 상단 요일 헤더 동적 생성
    const headerDays = useMemo(() => {
        const todayIdx = new Date().getDay();
        return Array.from({ length: 7 }, (_, i) => WEEKDAYS[(todayIdx + i) % 7]);
    }, []);

    const data = useMemo(() => {
        const today = new Date();
        return Array.from({ length: 28 }, (_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() + i); 
            return d;
        });
    }, []);

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
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
        <div className={styles.calendarContainer}>
            {/* 요일 헤더 */}
            <div className={styles.headerRow}>
                {headerDays.map((day, idx) => (
                    <div key={`header-${idx}`} className={styles.headerItem}>
                        {day}
                    </div>
                ))}
            </div>

            {/* 달력 그리드 */}
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

                    const isToday = index === 0;

                    return (
                        <li 
                            key={`day-${index}`} 
                            className={`
                                ${styles.dayItem} 
                                ${matchSub.length > 0 ? styles.hasSub : ''} 
                                ${selectedDay === dateValue ? styles.selected : ''}
                            `} 
                            onClick={() => handleFoldOpen(dateValue, matchSub)} 
                        >
                            <p className={styles.dateNumber}>
                                {day} {isToday && <span className={styles.todayBadge}>오늘</span>}
                            </p>
                            
                            {/* 구독 항목이 있으면 아이콘 표시 */}
                            <div className={styles.miniLogoWrap}>
                                {matchSub.slice(0, 3).map(sub => {
                                    const logo = SUBSCRIPTION_SERVICES.find(f => f.service_name === sub.service_name)?.logoUrl;
                                    return logo ? <img key={sub.id} src={logo} className={styles.miniLogo} alt="logo" /> : null;
                                })}
                                {/* 3개 이상일 경우 + 기호 */}
                                {matchSub.length > 3 && <span className={styles.moreBadge}>+{matchSub.length - 3}</span>}
                            </div>
                        </li>
                    );
                })}

                {/* 하단 상세 내역 폴드 */}
                <li className={`${styles.foldWrap} ${selectedDay !== null ? styles.open : ''}`}>
                    <ul className={styles.foldInner}>
                        {selectedSubs.map((item) => {
                            const serviceLogo = SUBSCRIPTION_SERVICES.find(f => f.service_name === item.service_name)?.logoUrl;
                            return (
                                <li key={item.id} className={styles.foldItem}>
                                    <img src={serviceLogo} alt={item.service_name} className={styles.foldLogo} />
                                    <div className={styles.foldTextWrap}>
                                        <p className={styles.foldTitle}>{item.service_name}</p>
                                        <p className={styles.foldCategory}>{item.category}</p>
                                    </div>
                                    <div className={styles.foldDateBox}>
                                        {item.next_billing_date} 결제
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
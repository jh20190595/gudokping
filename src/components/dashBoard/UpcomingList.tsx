import { useEffect, useMemo, memo, useState } from 'react';
import styles from './Upcoming.module.css';
import { calculateDday } from '../../utils/dateUtils.tsx';
import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import { IoAlertSharp, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.tsx';

function UpcomingList() {

    const { data: subscriptions, isLoading, isError, error } = useSubscriptions('created_at');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const upcomingList = useMemo(() => {
        if (!subscriptions) return [];

        return subscriptions
            .map((item) => {
                const dDay = calculateDday(item.next_billing_date);
                return { ...item, dDay };
            })
            .filter((item) => item.dDay >= 0 && item.dDay <= 31)
            .sort((a, b) => a.dDay - b.dDay);

    }, [subscriptions]);

    useEffect(() => {
        SUBSCRIPTION_SERVICES.forEach((service) => {
            const img = new Image();
            img.src = service.logoUrl;
        });
    }, []);


    const handlePrevPage = () => {
        if (currentPage - 1 < 1) return

        setCurrentPage(prev => prev - 1)
    }

    const handleNextPage = () => {
        if (currentPage + 1 > totalPage) return

        setCurrentPage(prev => prev + 1);
    }

    const totalPage = Math.ceil(upcomingList.length / 5);
    const currentItem = upcomingList.slice((currentPage - 1) * 5, currentPage * 5);

    if (upcomingList.length === 0) {
        return <div className={styles.emptyMsg}>🎉 당분간 결제 예정이 없어요!</div>;
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>📅 결제 임박</h3>
            <div className={styles.UpcomingListWrap}>
                <ul className={styles.ListWrap}>
                    {currentItem.map((item) => {
                        const serviceLogo = SUBSCRIPTION_SERVICES.find(f => f.service_name.toLowerCase() === item.service_name.toLowerCase())
                        return (
                            <li key={item.id} className={styles.item}>
                                <div className={styles.itemLeft}><img src={serviceLogo?.logoUrl || "Logo"} style={{ width: '40px', height: '40px', borderRadius: '30%', objectFit: 'contain', }} /></div>
                                <div className={styles.itemCenter}>
                                    <span>{item.service_name}</span>
                                    <div style={{ display: 'flex', alignItems : 'center'}}>
                                        <span style={{ fontSize: '11px', fontWeight: '700' }}>{item.dDay === 0 ? "D-day" : `D-${item.dDay}`}</span>
                                        {item.dDay === 0 && (<button className={styles.notice}><IoAlertSharp size={18} color='#ef4444' /></button>)}
                                    </div>
                                </div>
                                <div className={styles.itemRight}>₩ {item.price.toLocaleString()}</div>
                            </li>
                        )
                    })}
                </ul>


                {totalPage > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.footerTop}>
                            <div className={styles.divider}></div>
                        </div>

                        <div className={styles.footerBottom}>
                            <div className={styles.left}><button className={styles.moveBtn} onClick={handlePrevPage} disabled={currentPage === 1}><IoChevronBack size={11} color={currentPage === 1 ? "#999" : "#333"} /> <span>prev</span></button></div>
                            <div className={styles.footerCenter}>{currentPage} / {totalPage} </div>
                            <div className={styles.right}><button className={styles.moveBtn} onClick={handleNextPage} disabled={currentPage === totalPage}><span>next</span> <IoChevronForward size={11} color={totalPage === 3 ? "#999" : "#333"} /> </button></div>
                        </div>
                    </div>
                )}
            </div>



        </div>
    );
}

export default memo(UpcomingList);
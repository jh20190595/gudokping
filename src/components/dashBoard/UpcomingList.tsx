import { useEffect, useMemo, memo, useState } from 'react';
import styles from './Upcoming.module.css';
import { IoAlertSharp, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { calculateDday } from '../../utils/dateUtils.tsx';
import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.tsx';
import ExtendModal from '../ui/ExtendModal.tsx';
import { Subscription } from '../../types/subscription.tsx';
import SubscriptionForm from '../subscription/SubscriptionForm.tsx';

function UpcomingList() {

    const { data: subscriptions, isLoading, isError, error } = useSubscriptions('created_at');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isExtendId, setIsExtendId] = useState<string | null>(null);
    const [editTargetItem, setEditTargetItem] = useState<Subscription | null>(null);

    const upcomingList = useMemo(() => {
        if (!subscriptions) return [];

        return subscriptions
            .map((item) => {
                const dDay = calculateDday(item.next_billing_date);
                return { ...item, dDay };
            })
            .filter((item) => item.dDay >= -7 && item.dDay <= 31)
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

    const handleExtend = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setIsExtendId(id)
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
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontSize: '11px', fontWeight: '700' }}>
                                            {item.dDay === 0 
                                                ? "D-day" 
                                                : item.dDay < 0 
                                                    ? `D+${Math.abs(item.dDay)}`
                                                    : `D-${item.dDay}`
                                            }
                                        </span>
                                        {item.dDay <= 0 && (<button className={styles.notice} onClick={e => handleExtend(e, item.id)}><IoAlertSharp size={18} color='#ef4444' /></button>)}
                                        {isExtendId === item.id && (
                                            <ExtendModal
                                                sub={item}
                                                onClose={(e) => { e.stopPropagation(); setIsExtendId(null) }}
                                                onOpenEdit={() => {
                                                    const { dDay, ...sub } = item // dDay 빼야함
                                                    setEditTargetItem(sub as Subscription)
                                                }}
                                            />
                                        )}
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

            {editTargetItem && (
                <div className={styles.modalOverlay} onClick={() => setEditTargetItem(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <SubscriptionForm
                            initialData={editTargetItem}
                            isEditMode={true}
                            onClose={() => setEditTargetItem(null)}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}

export default memo(UpcomingList);
import { useState } from "react";
import styles from './DetailsComponent.module.css';
import { SUBSCRIPTION_SERVICES } from "../../constants/subscriptionData.ts";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion } from 'framer-motion';
import { useSubscriptions } from '../../hooks/useSubscriptionsQuery.ts';

export default function DetailsComponent() {

    const { data : subscriptions } = useSubscriptions();

    const handlePrevPage = () => {
        if (currentPage - 1 < 1) return

        setCurrentPage(prev => prev - 1)
    }

    const handleNextPage = () => {
        if (currentPage + 1 > totalPage) return

        setCurrentPage(prev => prev + 1);
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPage = Math.ceil((subscriptions?.length || 0) / 5);
    const currentItem = subscriptions.slice((currentPage - 1) * 5, currentPage * 5);

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            <ul className={styles.ListWrap}>
                {currentItem.map((item, index) => {
                    const serviceLogoUrl = SUBSCRIPTION_SERVICES.find(f => f.service_name === item.service_name)?.logoUrl
                    return (
                        <li key={item.id}>
                            <div className={styles.itemContent}>
                                <div style={{ backgroundColor :'#fff' , borderRadius : '8px'}}><img src={serviceLogoUrl} alt = "logos" style={{ width: '30px', height: '30px', borderRadius: '30%', objectFit: 'contain' }} /></div>
                                <div className={styles.textWrap}>
                                    <div>{item.service_name}</div>
                                    <div>₩ {item.price.toLocaleString()}/{item.billing_cycle === 'yearly' ? '년' : '월'}</div>
                                </div>
                            </div>
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
        </motion.div>
    )
}
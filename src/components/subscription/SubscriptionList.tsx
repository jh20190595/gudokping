import { useState } from 'react';
import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.tsx';
import styles from './SubscriptionList.module.css';
import { IoPencilOutline } from 'react-icons/io5';
import SubscriptionForm from './SubscriptionForm.tsx';
import { X } from 'lucide-react';
import DeleteModal from '../ui/DeleteModal.tsx';

const COLORS: Record<string, string> = {
    'ott': "#fca5a5",
    'shopping': "#93c5fd",
    'ai': "#c4b5fd",
    'food': "#fdba74",
    'music': "#86efac"
};

export function SubscriptionItem({ item }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false);
    const [isDeleteForm, setIsDeleteForm] = useState(false);

    const serviceInfo = SUBSCRIPTION_SERVICES.find(f => f.service_name.toLowerCase() === item.service_name.toLowerCase());
    const categoryColor = COLORS[item.category.toLowerCase()] || "#eee";

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (item.next_billing_date) {
            setIsOpen(prev => !prev);
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteForm(true)
    }

    const handleCloseDeleteModal = (e : React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteForm(false);
    }

    return (
        <>
            <li className={`${styles.listItem} ${isOpen ? styles.open : ''}`} onClick={handleOpen}>

                <div className={styles.listMain}>
                    <div className={styles.listImg}>
                        <img
                            src={serviceInfo?.logoUrl}
                            style={{ width: '40px', height: '40px', borderRadius: '30%', objectFit: 'contain' }}
                            alt="logo"
                        />
                    </div>

                    <div className={styles.listContent}>
                        <div className={styles.contentTop}>
                            <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.service_name}</span>
                            <div className={styles.listCategory} style={{ backgroundColor: categoryColor }}>
                                {item.category}
                            </div>
                        </div>


                        <a href={serviceInfo?.site_url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={styles.contentBottom}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.urlBtn}>
                                <span style={{ fontSize: '12px', fontWeight: '600' }}>Website : </span>
                                {serviceInfo?.site_url}
                            </button>
                        </a>
                    </div>
                    {item.next_billing_date && (
                        <div className={styles.deleteBtnWrap}>
                            <button className={styles.deleteBtn} onClick={(e) => handleDelete(e)}>
                                <X size={11} color='#000' strokeWidth={3} />
                            </button>
                        </div>
                    )}
                    {isDeleteForm && <DeleteModal id = {item.id} onClose={(e) => handleCloseDeleteModal(e)} />}

                </div>

                <div className={styles.listFold}>
                    <div className={styles.foldContent}>
                        <div className={styles.foldItem}>
                            <span className={styles.foldTitle}>다음 결제일</span>
                            <span className={styles.foldText}>{item.next_billing_date}</span>
                        </div>

                        <div className={styles.foldItem}>
                            <span className={styles.foldTitle}>메모</span>
                            <span className={styles.foldText}>{item.memo === "" ? "-" : item.memo}</span>
                        </div>

                        <div className={styles.foldItem}>
                            <span className={styles.foldTitle}>플랜명</span>
                            <span className={styles.foldText}>{item.plan_name}</span>
                        </div>

                        <div className={styles.foldItem}>
                            <span className={styles.foldTitle}>요금</span>
                            <span className={styles.foldText}>{item.price?.toLocaleString()}원</span>
                        </div>

                        <div className={styles.foldItem}>
                            <span className={styles.foldTitle}>결제수단</span>
                            <span className={styles.foldText}>{item.payment_type}</span>
                        </div>

                        <div className={styles.foldItem}>
                            <span className={styles.foldTitle}>카드명 또는 결제처</span>
                            <span className={styles.foldText}>{item.payment_name}</span>
                        </div>

                        <div className={styles.editBtnWrap}>
                            <button onClick={e => { e.stopPropagation(); setIsEditForm(true) }} className={styles.editBtn}>
                                <IoPencilOutline size={11} color='black' />
                                Edit Details
                            </button>
                        </div>
                    </div>
                </div>
            </li>

            {isEditForm && (
                <div className={styles.modalOverlay} onClick={() => setIsEditForm(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <SubscriptionForm
                            initialData={item}
                            isEditMode={true}
                            onClose={() => setIsEditForm(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}


export default function SubscriptionList({ data }) {
    return (
        <div className={styles.container}>
            <ul className={styles.listWrap}>
                {data?.map(item => (
                    <SubscriptionItem key={item.id || item.service_name} item={item} />
                ))}
            </ul>

            <div style={{ height : '150px', flexShrink : 0}}/>
        </div>
    );
}
import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.ts';
import { useSubscriptions } from '../../hooks/useSubscriptionsQuery.ts';
import { Lightbulb } from 'lucide-react';
import styles from './RankComponent.module.css';

export default function RankComponent() {

    const { data: subscriptions } = useSubscriptions('price');

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Lightbulb size={16} color="var(--border-shadow)" />
                <h4 style={{ margin: 0 }}>Top 5 Subscriptions</h4>
            </div>
            <ul className={styles.listWrap}>
                {subscriptions.slice(0,5).map((sub, index) => {

                    const serviceLogo = SUBSCRIPTION_SERVICES.find(f => f.service_name === sub.service_name)?.logoUrl

                    return (
                        <li key={sub.id} className={styles.listItem}>

                            <div className={styles.listReft}>
                                <div className={styles.listRank}><span style={{ color : '#fff'}}>{`${index + 1}`}</span></div>
                                <div className={styles.listImg}><img src={serviceLogo} alt="logo" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '30%' }} /></div>
                                <div className={styles.listContent}>
                                    <p style={{ margin : 0, fontSize: '12px', fontWeight: '700' }}>{sub.service_name}</p>
                                    <p style={{ margin : 0, fontSize: '10px', fontWeight: '600', color: '#666' }}>{sub.category}</p>
                                </div>
                            </div>

                            <div className={styles.listRight}>
                                <p>₩ {sub.price.toLocaleString()}원/월</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
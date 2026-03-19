import { useSubscriptionSummary } from '../../hooks/useSubscriptionSummary.ts';
import Card from '../ui/Card.tsx';
import styles from './SummaryCards.module.css';
import { IoWallet, IoApps, IoPricetag, IoCalendar } from 'react-icons/io5';
import { useModalStore } from '../../store/useModalStore.ts';


export default function SummaryCards() {

    const { summary } = useSubscriptionSummary();
    const { openForm } = useModalStore(); 

    const {
        totalMonthlycost = 0,
        activeService = 0,
        MaxPriceService = null,
        MaxPriceserviceLogo = "",
        annualTotalCost = 0
    } = summary || {};

    const summaryData = [
        {
            title: "이번 달 총 결제",
            value: totalMonthlycost === 0 ? '-' : `₩ ${Math.floor(totalMonthlycost).toLocaleString()}원`,
            icon: <IoWallet size={22} />,
            color: "#dbeafe"
        },
        {
            title: "구독 중인 서비스",
            value: activeService === 0 ? '-' : activeService,
            icon: <IoApps size={22} />,
            color: "#d1fae5"
        },
        {
            title: "가장 비싼 구독",
            logo: MaxPriceserviceLogo || "",
            subText: MaxPriceService === null ? '-' : `₩ ${MaxPriceService?.price.toLocaleString()}원`,
            icon: <IoPricetag size={22} />,
            color: "#fef3c7"
        },
        {
            title: "연간 예상 지출",
            value: annualTotalCost === 0 ? "-" : `₩ ${annualTotalCost?.toLocaleString()}원`,
            icon: <IoCalendar size={22} />,
            color: "#fee2e2"
        },
    ];

    return (
        <div className={styles.container}>

            <div className={styles.topSection}>
                <div className={styles.title}>DashBoard</div>
                <button className={styles.addSubscriptionBtn} onClick={openForm}>+ 구독 추가</button>
            </div>

            <div className={styles.summaryWrap}>
                {summaryData.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </div>
        </div>
    )
}
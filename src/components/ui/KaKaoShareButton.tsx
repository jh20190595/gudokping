import { useEffect, useMemo } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useSubscriptions } from "../../hooks/useSubscriptionsQuery.ts";
import { calculateDday } from "../../utils/dateUtils.ts";
import { SUBSCRIPTION_SERVICES } from "../../constants/subscriptionData.tsx";
import styles from './KaKaoShareButton.module.css';

export default function KakaoShareButton() {
    const { data: subscriptions } = useSubscriptions('created_at');
    const KAKAO_JS_KEY = "895b39538da5eeef94e8c1affd889cc7";

    const upcomingList = useMemo(() => {
        if (!subscriptions) return [];
        return subscriptions
            .map((item) => {
                const dDay = calculateDday(item.next_billing_date);
                return { ...item, dDay };
            })
            .filter((item) => item.dDay >= 0 && item.dDay <= 1)
            .sort((a, b) => a.dDay - b.dDay);
    }, [subscriptions]);

    useEffect(() => {
        SUBSCRIPTION_SERVICES.forEach((service) => {
            const img = new Image();
            img.src = service.logoUrl;
        });
    }, []);

    useEffect(() => {
        const { Kakao } = window as any;
        if (Kakao && !Kakao.isInitialized()) {
            Kakao.init(KAKAO_JS_KEY);
        }
    }, []);

    const shareMessage = (serviceName: string, price: number) => {
        const { Kakao } = window as any;
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: `💸 ${serviceName} 파티원 정산 알림!`,
                description: `이번 달 구독료 ${price.toLocaleString()}원을 정산해주세요.`,
                imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37',
                link: {
                    mobileWebUrl: 'http://localhost:3000',
                    webUrl: 'http://localhost:3000',
                },
            },
            buttons: [
                {
                    title: '구독핑에서 확인하기',
                    link: {
                        mobileWebUrl: 'http://localhost:3000',
                        webUrl: 'http://localhost:3000',
                    },
                },
            ],
        });
    };

    return (
        <div className={styles.container}>
            {/* 헤더 */}
            <div className={styles.header}>
                <span className={styles.bellWrap}>
                    🔔
                    {upcomingList.length > 0 && (
                        <span className={styles.headerBadge}>{upcomingList.length}</span>
                    )}
                </span>
                <div>
                    <p className={styles.headerTitle}>정산 알림</p>
                    <p className={styles.headerSub}>결제 전 파티원에게 미리 알려보세요</p>
                </div>
            </div>

            {/* 구분선 */}
            <div className={styles.divider} />

            {/* 빈 상태 */}
            {upcomingList.length === 0 ? (
                <div className={styles.emptyState}>
                    <span>🎉</span>
                    <p>오늘·내일 결제 예정인 구독이 없어요</p>
                </div>
            ) : (
                <ul className={styles.listWrap}>
                    {upcomingList.map((item, index) => {
                        const serviceLogo = SUBSCRIPTION_SERVICES.find(
                            f => f.service_name === item.service_name
                        )?.logoUrl;
                        const isToday = item.dDay === 0;

                        return (
                            <li
                                key={item.id ?? index}
                                className={styles.item}
                                style={{ animationDelay: `${index * 0.06}s` }}
                            >
                                <img
                                    src={serviceLogo}
                                    alt={item.service_name}
                                    className={styles.logo}
                                />

                                <div className={styles.info}>
                                    <div className={styles.nameRow}>
                                        <span className={styles.serviceName}>{item.service_name}</span>
                                        {isToday
                                            ? <span className={styles.badgeToday}>오늘</span>
                                            : <span className={styles.badgeSoon}>내일</span>
                                        }
                                    </div>
                                    <span className={styles.price}>
                                        {item.price.toLocaleString()}원
                                    </span>
                                </div>

                                <button
                                    className={styles.kakaoBtn}
                                    onClick={() => shareMessage(item.service_name, item.price)}
                                    aria-label={`${item.service_name} 정산 요청`}
                                >
                                    <RiKakaoTalkFill size={15} />
                                    <span>정산 요청</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
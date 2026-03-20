import { useEffect, useMemo } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useSubscriptions } from '../../hooks/useSubscriptionsQuery.ts';
import { calculateDday } from "../../utils/dateUtils.ts";
import { SUBSCRIPTION_SERVICES } from "../../constants/subscriptionData.ts";
import styles from './PaymentReminder.module.css';

export default function PaymentReminder() {
    const { data: subscriptions } = useSubscriptions('created_at');
    const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;

    const upcomingList = useMemo(() => {
        if (!subscriptions) return [];
        return subscriptions
            .map((item) => {
                const dDay = calculateDday(item.next_billing_date);
                return { ...item, dDay };
            })
            .filter((item) => item.dDay >= 0 && item.dDay <= 2)
            .sort((a, b) => a.dDay - b.dDay);
    }, [subscriptions]);

    useEffect(() => {
        const scriptId = 'kakao-sdk';

        if (document.getElementById(scriptId)) {
            const { Kakao } = window as any;
            if (Kakao && !Kakao.isInitialized()) Kakao.init(KAKAO_JS_KEY);
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js';
        script.async = true;

        script.onload = () => {
            const { Kakao } = window as any;
            if (Kakao && !Kakao.isInitialized()) {
                Kakao.init(KAKAO_JS_KEY);
            }
        };

        document.head.appendChild(script);
    }, [KAKAO_JS_KEY]);

    const shareMessage = (serviceName: string, price: number, serviceLogo: string) => {
        const { Kakao } = window as any;

        const DOMAIN = "https://www.gudokping.com";

        // 이 로직이 있어야 카카오가 내 서버에 있는 멜론 로고를 긁어갑니다!
        const ImageUrl = serviceLogo.startsWith('http')
            ? serviceLogo
            : `${DOMAIN}${serviceLogo}`;
        if (!Kakao || !Kakao.Share) {
            alert("카카오 기능을 불러오는 중입니다. 잠시 후 다시 시도해 주세요!");
            return;
        }

        Kakao.Share.sendDefault({
            objectType: 'feed',

            itemContent: {
                profileText: `${serviceName} 정산 알림`,
                profileImageUrl: ImageUrl,
                items: [
                    {
                        item: '1인당 결제 금액',
                        itemOp: `${price.toLocaleString()}원`
                    }
                ],
            },

            content: {
                title: `💸 파티원 정산 알림!`,
                description: `구독료 정산의 시간이 왔습니다. 늦지 않게 송금해 주세요!`,
                imageUrl: ImageUrl,
                link: {
                    mobileWebUrl: 'https://gudokping.com',
                    webUrl: 'https://gudokping.com',
                },
            },
            buttons: [
                {
                    title: '구독핑 바로가기',
                    link: {
                        mobileWebUrl: 'https://gudokping.com',
                        webUrl: 'https://gudokping.com',
                    },
                },
            ],
        });
    };

    return (
        <div className={styles.container}>

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


            <div className={styles.divider} />


            {upcomingList.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>✨ 당장 정산할 구독 서비스가 없네요!<br />평화로운 하루입니다.</p>
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
                                    onClick={() => shareMessage(item.service_name, item.price, serviceLogo || '')}
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
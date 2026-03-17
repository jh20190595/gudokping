import { useState } from 'react';
import styles from './help.module.css';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        category: "이런 분들께 딱! 🎯",
        question: "친구들과 구독료를 N빵하고 있는데, 기록은 어떻게 하나요?",
        answer: "전체 결제 금액이 아닌, 실제로 본인의 통장에서 빠져나가는 금액(예: 4인 파티 시 1/4 금액)만 입력해 보세요! 내가 진짜로 소비하는 정확한 월 지출 통계를 낼 수 있습니다. (파티장, 파티원 모두에게 강력 추천!)"
    },
    {
        category: "이런 분들께 딱! 🎯",
        question: "매번 해지 날짜를 까먹고 '눈물의 자동결제'를 당한다면?",
        answer: "구독핑의 캘린더와 D-Day 기능을 적극 활용해 보세요! 원치 않는 구독 서비스의 결제일이 다가오기 전에 미리 확인하고, 내 손으로 직접 해지할 수 있는 골든타임을 지켜드립니다."
    },
    {
        category: "결제 알림 🔔", // 💡 카톡 알림 킬러 기능 강조
        question: "결제일 알림은 어떻게 오나요?",
        answer: "결제 예정일 하루 전(D-1)에 유저님의 카카오톡으로 친절하게 알림 메시지를 보내드려요! 덕분에 해지 타이밍을 놓치거나, 통장 잔액 부족으로 결제가 실패하는 아찔한 상황을 완벽하게 방지할 수 있습니다."
    },
    {
        category: "계정/로그인",
        question: "카카오 로그인만 가능한가요?",
        answer: "현재는 가장 간편하고 안전한 카카오 로그인을 기본으로 제공하고 있습니다. 추후 구글 및 이메일 로그인도 추가될 예정입니다."
    },
    {
        category: "구독 관리",
        question: "구독 정보는 어떻게 추가하나요?",
        answer: "내 구독(My Subscription) 메뉴에서 오른쪽 상단의 '+' 버튼을 눌러 이용 중인 서비스를 검색하고 결제일을 입력하면 간단하게 추가됩니다."
    },
    {
        category: "정산/계산", // 💡 새로 추가된 카테고리
        question: "월 총 결제 금액은 어떻게 계산되나요?",
        answer: "월별 지출을 정확하게 파악하기 위해, 월간 결제 서비스는 해당 금액이 그대로 합산되고, 연간 결제 서비스는 결제 금액을 12개월로 나눈 '월평균 금액'으로 환산되어 총액에 포함됩니다."
    },
    {
        category: "결제 알림",
        question: "결제일 알림은 어떻게 오나요?",
        answer: "현재는 캘린더를 통해 결제 예정일을 한눈에 확인할 수 있습니다. 푸시 알림 및 카카오톡 알림 기능은 현재 개발 중입니다."
    },
    {
        category: "보안",
        question: "제 결제 정보가 안전하게 관리되나요?",
        answer: "저희 앱은 실제 카드 번호를 저장하지 않습니다. 오직 사용자가 입력한 서비스 이름과 결제일 정보만을 Supabase의 보안 정책(RLS)을 통해 안전하게 암호화하여 관리합니다."
    },
    {
        category: "데이터",
        question: "앱을 삭제하면 제 데이터도 지워지나요?",
        answer: "데이터는 계정에 귀속되므로 앱을 삭제해도 다시 로그인하면 그대로 남아있습니다. 완전한 삭제를 원하시면 설정에서 계정 탈퇴를 진행해주세요."
    }
];

export default function Help() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>Help Center</h2>
                <p className={styles.subtitle}>궁금하신 점을 빠르게 찾아보세요.</p>
            </header>

            <div className={styles.faqList}>
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
                    >
                        <button
                            className={styles.questionBox}
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className={styles.categoryBadge}>{item.category}</span>
                            <p className={styles.questionText}>{item.question}</p>
                            <div className={styles.iconBox}>
                                {openIndex === index ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
                            </div>
                        </button>

                        <div className={`${styles.answerWrap} ${openIndex === index ? styles.open : ''}`}>
                            <div className={styles.answerContent}>
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <footer className={styles.footer}>
                <p>찾으시는 내용이 없나요? <br /> <strong>Feedback</strong> 메뉴를 통해 직접 문의해주세요!</p>
            </footer>
        </div>
    );
}
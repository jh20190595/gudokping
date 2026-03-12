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
                <p>찾으시는 내용이 없나요? <br/> <strong>Feedback</strong> 메뉴를 통해 직접 문의해주세요!</p>
            </footer>
        </div>
    );
}
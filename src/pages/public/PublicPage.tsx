import React, { useState, useEffect } from 'react';
import { CheckCircle, CreditCard, Bell, PieChart, Sparkles, ArrowRight } from 'lucide-react';
import styles from './PublicPage.module.css';
import LoginModal from '../../components/auth/LoginModal.tsx'; // 💡 경로 확인해주세요!
import { useNavigate } from 'react-router-dom';

const PublicPage = () => {
    const [scrollY, setScrollY] = useState(0);
    // 💡 모달 상태를 부모로 끌어올림!
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
    },[navigate])

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const subscriptionData = [
        { name: 'Netflix', amount: 13500, color: '#fecaca', percentage: 29.4 },
        { name: 'Spotify', amount: 10900, color: '#d1fae5', percentage: 23.7 },
        { name: 'YouTube Premium', amount: 14900, color: '#dbeafe', percentage: 32.5 },
        { name: 'Apple Music', amount: 6600, color: 'var(--hover-yellow)', percentage: 14.4 }
    ];

    const total = subscriptionData.reduce((sum, item) => sum + item.amount, 0);
    
    const DonutChart = ({ data }: { data: any[] }) => {
        const size = 200;
        const center = size / 2;
        const radius = size / 2 - 10;

        let currentAngle = -90;

        const createSlice = (percentage: number, color: string) => {
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle * (Math.PI / 180);
            const endAngle = (currentAngle + angle) * (Math.PI / 180);

            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);

            const largeArc = angle > 180 ? 1 : 0;

            const path = [
                `M ${center} ${center}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z'
            ].join(' ');

            currentAngle += angle;
            return path;
        };

        return (
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {data.map((item, index) => (
                    <path
                        key={index}
                        d={createSlice(item.percentage, item.color)}
                        fill={item.color}
                        stroke="white"
                        strokeWidth="2"
                    />
                ))}
                <circle cx={center} cy={center} r={radius * 0.6} fill="white" />
                <text
                    x={center}
                    y={center - 10}
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#000"
                >
                    ₩{(total / 1000).toFixed(1)}k
                </text>
                <text
                    x={center}
                    y={center + 15}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#78716c"
                >
                    월 총액
                </text>
            </svg>
        );
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.logo}>
                        <div className={styles.logoIconBox}>
                            <CreditCard size={32} color="#44403c" />
                        </div>
                    </div>
                   
                    <button 
                        className={`${styles.btn1} ${styles.btnPrimary} ${styles.headerBtn}`}
                        onClick={() => setIsLoginModalOpen(true)}
                    >
                        Get Started <ArrowRight size={16} />
                    </button>
                </div>
            </header>

            <section className={styles.heroSection}>
                <div className={styles.wrapper}>
                    <div
                        style={{
                            transform: `translateY(${scrollY * 0.1}px)`,
                            opacity: Math.max(0, 1 - scrollY / 500),
                            transition: 'opacity 0.1s ease-out'
                        }}
                    >
                        <div className={styles.badge}>
                            <Sparkles size={16} color="#ca8a04" />
                            <span style ={{color : '#000'}}>모든 구독을 한 곳에서</span>
                        </div>

                        <h1 className={styles.heroTitle}>
                            구독 관리,<br />
                            <span className={styles.gradientText}>
                                이제 쉽고 간단하게
                            </span>
                        </h1>

                        <p className={styles.heroDesc}>
                            늘어나는 구독 서비스 때문에 고민이신가요?<br />
                            구독핑과 함께 모든 구독을 한눈에 관리하고, 똑똑하게 절약하세요.
                        </p>

              
                        <button 
                            className={`${styles.btn2} ${styles.btnPrimary}`}
                            onClick={() => setIsLoginModalOpen(true)}
                        >
                            무료로 시작하기 <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            <section className={styles.featuresSection}>
                <div className={styles.wrapper}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            구독 관리의 새로운 기준
                        </h2>
                        <p className={styles.sectionDesc}>
                            복잡했던 구독 관리가 이렇게 편해집니다
                        </p>
                    </div>

                    <div className={styles.featureGrid}>

                        <div className={`${styles.featureCard} ${styles.blue}`}>
                            <div className={`${styles.iconBox} ${styles.blue}`}>
                                <CreditCard size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>
                                한눈에 보는 구독 현황
                            </h3>
                            <p className={styles.cardDesc}>
                                모든 구독 서비스를 한 곳에 모아보세요.
                                결제일, 금액, 상태를 직관적으로 확인할 수 있습니다.
                            </p>

                            <div className={styles.chartContainer}>
                                <DonutChart data={subscriptionData} />

                                <div className={styles.legendContainer}>
                                    {subscriptionData.map((item, index) => (
                                        <div key={index} className={styles.legendItem}>
                                            <div className={styles.legendText}>
                                                <div
                                                    className={styles.legendColor}
                                                    style={{ backgroundColor: item.color }}
                                                ></div>
                                                <span style={{ color : '#000', fontWeight : '500'}}>{item.name}</span>
                                            </div>
                                            <span style={{ fontWeight: 500, color: '#000' }}>
                                                {item.percentage.toFixed(1)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.featureCard} ${styles.green}`}>
                            <div className={`${styles.iconBox} ${styles.green}`}>
                                <Bell size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>
                                똑똑한 알림 시스템
                            </h3>
                            <p className={styles.cardDesc}>
                                결제일을 미리 알려드려요.
                                갱신일을 놓쳐서 불필요한 비용이 발생하는 일이 없도록 도와드립니다.
                            </p>
                        </div>

                        <div className={`${styles.featureCard} ${styles.yellow}`}>
                            <div className={`${styles.iconBox} ${styles.yellow}`}>
                                <PieChart size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>
                                지출 분석과 절약 팁
                            </h3>
                            <p className={styles.cardDesc}>
                                월별 구독 지출을 분석하고,
                                사용하지 않는 서비스를 찾아 비용을 절약할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.benefitsSection}>
                <div className={styles.wrapper}>
                    <div className={styles.benefitsGrid}>
                        <div>
                            <h2 className={styles.sectionTitle} style={{ marginBottom: '1.5rem' }}>
                                이런 분들께<br />
                                딱 맞아요
                            </h2>

                            <div className={styles.checkList}>
                                {[
                                    '여러 구독 서비스를 사용하고 계신 분',
                                    '매달 얼마나 쓰는지 궁금하신 분',
                                    '결제일을 자주 놓치시는 분',
                                    '구독 비용을 절약하고 싶으신 분'
                                ].map((benefit, index) => (
                                    <div key={index} className={styles.checkItem}>
                                        <CheckCircle size={24} color="#4ade80" style={{ flexShrink: 0 }} />
                                        <span className={styles.checkText}>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.cardVisual}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardRow}>
                                    <span style={{ color: '#000' }}>이번 달 구독료</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#292524' }}>
                                        ₩45,900
                                    </span>
                                </div>

                                <div className={styles.subscriptionList}>
                                    {subscriptionData.map((sub, index) => (
                                        <div key={index} className={styles.subItem}>
                                            <div className={styles.subInfo}>
                                                <div
                                                    style={{
                                                        width: '0.75rem',
                                                        height: '0.75rem',
                                                        borderRadius: '50%',
                                                        backgroundColor: sub.color
                                                    }}
                                                ></div>
                                                <span style={{ color: '#44403c' }}>{sub.name}</span>
                                            </div>
                                            <span style={{ fontWeight: 500, color: '#292524' }}>
                                                ₩{sub.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.sectionTitle}>
                        지금 바로 시작해보세요
                    </h2>
                    <p className={styles.sectionDesc} style={{ marginBottom: '2.5rem' }}>
                        복잡한 구독 관리, 구독핑이 쉽게 만들어드릴게요.<br />
                        무료로 시작하고, 구독 비용을 절약해보세요.
                    </p>
      
                    <button 
                        className={`${styles.btn2} ${styles.btnPrimary}`}
                        onClick={() => setIsLoginModalOpen(true)}
                    >
                        무료로 시작하기 <ArrowRight size={16} />
                    </button>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.wrapper}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div className={styles.logoIconBox}>
                            <CreditCard size={20} color="#44403c" />
                        </div>
                    </div>
                    <p style={{ color: '#000' }}>
                        모든 구독을 한 곳에서, 똑똑하게 관리하세요
                    </p>
                </div>
            </footer>
            
            {isLoginModalOpen && (
                <LoginModal onClose={() => setIsLoginModalOpen(false)} />
            )}
        </div>
    );
};

export default PublicPage;
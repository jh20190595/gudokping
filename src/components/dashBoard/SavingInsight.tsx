import { memo } from 'react';
// import styles from './SavingInsight.module.css'; // CSS 모듈 사용 시 주석 해제

function SavingInsight() {

    // 정산하기 버튼 클릭 핸들러
    const handleKakaoPaySettle = () => {
        // 💡 발급받으신 카카오페이 정산하기 링크를 아래에 붙여넣으세요!
        const kakaoPayLink = "https://link.kakaopay.com/__/2srpZk1"; 
        
        // 새 창(또는 새 탭)으로 링크 열기
        window.open(kakaoPayLink, "_blank"); 
    };

    return (
        <div style={{ padding: '1.875rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                👨‍👩‍👧‍👦 이번 달 파티 정산
            </h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                파티원들에게 받아야 할 총금액<br/>
                <strong style={{ fontSize: '1.5rem', color: 'var(--border-shadow)' }}>12,750원</strong>
            </p>
            
            <button 
                onClick={handleKakaoPaySettle}
                style={{ 
                    width: '100%',
                    padding: '12px 0', 
                    backgroundColor: '#FEE500', /* 카카오톡 노란색 */
                    color: 'var(--border-shadow)000', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    fontSize: '1rem'
                }}
            >
                카카오페이로 정산 요청하기
            </button>
        </div>
    );
}

export default memo(SavingInsight);
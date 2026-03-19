export const PAYMENT_DETAIL_OPTIONS: Record<string, { value: string; label: string }[]> = {
    CREDIT_CARD: [
        { value: 'SHINHAN', label: '신한카드' },
        { value: 'HYUNDAI', label: '현대카드' },
        { value: 'SAMSUNG', label: '삼성카드' },
        { value: 'KB', label: '국민카드' },
        { value: 'LOTTE', label: '롯데카드' },
        { value: 'WOORI', label: '우리카드' },
        { value: 'GWANGJU', label: '광주은행' },
        { value: 'KAKAOBANK', label: '카카오뱅크' },
        { value: 'BC', label: '비씨카드' },
    ],
    E_WALLET: [
        { value: 'KAKAO', label: '카카오페이' },
        { value: 'NAVER', label: '네이버페이' },
        { value: 'PAYCO', label: '페이코' },
        { value: 'SAMSUNG_PAY', label: '삼성페이' },
        { value: 'APPLE_PAY', label: '애플페이' },
        { value: 'TOSS', label: '토스' },
        { value: 'NH_PAY', label: '농협(NH페이)' },
        { value: 'HANA_PAY', label: '하나Pay(외환)' },
        { value: 'SSG_PAY', label: 'SSGPAY' },
    ],
    ETC: [
        { value: 'MOBILE', label: '휴대폰결제' },
        { value: 'BANK', label: '계좌이체' },
        { value: 'OTHER', label: '기타' },
    ]
};
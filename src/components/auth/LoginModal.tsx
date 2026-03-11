import styles from './LoginModal.module.css';
import toast from "react-hot-toast";
import { signinWithKaKao } from "./authApi.tsx";
import { RiKakaoTalkFill } from 'react-icons/ri';
import { X } from 'lucide-react';

type Props = {
    onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
    const handleKakaoLogin = async () => {
        try {
            await signinWithKaKao();
        } catch (error) {
            console.log("로그인 실패 :", error);
            toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={20} color="#666" />
                </button>
                
                <h3 className={styles.title}>구독핑 시작하기</h3>
                <p className={styles.desc}>3초 만에 카카오로 간편하게 가입하세요!</p>

                <button className={styles.kakaoBtn} onClick={handleKakaoLogin}>
                    <RiKakaoTalkFill size={22} color='#371d1e' /> 
                    카카오 로그인
                </button>
            </div>
        </div>
    )
}
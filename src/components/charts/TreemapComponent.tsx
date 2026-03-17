import { Treemap, ResponsiveContainer } from "recharts";
import { useSubscriptions } from "../../hooks/useSubscriptions.tsx";
import styles from './TreemapComponent.module.css'
import { SUBSCRIPTION_SERVICES } from "../../constants/subscriptionData.tsx";


const COLORS: Record<string, string> = {
    'ott': "#fca5a5",
    'shopping': "#93c5fd",
    'ai': "#c4b5fd",
    'food': "#fdba74",
    'music': "#86efac"
};

export default function TreemapComponent() {

    const { data: subscriptions } = useSubscriptions('price');

    const filterData = subscriptions.map((item) => {  // recharts, Treemap 쓰기 위해선 { name : , size : } 로 가공하기
        return { name: item.service_name, size: item.price }
    });

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <Treemap
                data={filterData} // 트리맵에 사용할 데이터
                dataKey="size"
                content={<CustomTreeMap />} // CSS 내 맛대로 조정
                isAnimationActive={false}
            />
        </ResponsiveContainer>
    )
}


const CustomTreeMap = (props: any) => {
    const { x, y, width, height, name, value, index, depth } = props; // 자동으로 recharts에서 값을 넘겨준다.

    if (depth === 0) { // depth는 자신이 몇 번째 자식인지 나타냄 ex) 전체를 감싸는 부모 박스 = 0 리스트 박스 = 1
        return null;
    }

    const myCategory = SUBSCRIPTION_SERVICES.find(f => f.service_name === name)?.category?.toLowerCase() || "";
    const imgLogo = SUBSCRIPTION_SERVICES.find(f => f.service_name === name)?.logoUrl;

    const bgColor = COLORS[myCategory] || "#eee";

    const GAP = 20;

    const innerX = x + GAP / 2;
    const innerY = y + GAP / 2;

    const innerWidth = Math.max(0, width - GAP);  // 음수 안되게 막기
    const innerHeight = Math.max(0, height - GAP); // 음수 안되게 막기

    return (
        <g className={styles.treemapItem} > {/* group의 약자 div 태그의 svg 버전 */} {/* rect = 사각형 borderRadius 적요하고싶으면 rx, ry를 깎어라*/}
            <rect
                className={styles.treeBox}
                x={innerX}
                y={innerY}
                width={innerWidth}
                height={innerHeight}
                fill={bgColor}
                stroke="var(--border-shadow)"
                strokeWidth={2}
                rx={8}
            />
            {width > 60 && height > 60 && (
                <foreignObject x={innerX} y={innerY} width={innerWidth} height={innerHeight}>
                    <div className={styles.treeInnerContent}>
                        <div>
                            {imgLogo && (
                                <img className={styles.treeInnerImg} src={imgLogo} alt={name} />
                            )}
                        </div>
                        <div className={styles.treeInnerText}>
                            <span className={styles.treeInnerServiceName}>
                                {name}
                            </span>
                            <span className={styles.treeInnerPrice}>
                                ₩{value.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </foreignObject>
            )}
        </g>
    )
}
import { Treemap, ResponsiveContainer } from "recharts";
import { useSubscriptions } from '../../hooks/useSubscriptionsQuery.ts';
import styles from './TreemapComponent.module.css'
import { SUBSCRIPTION_SERVICES } from "../../constants/subscriptionData.ts";

const COLORS: Record<string, string> = {
    'ott': "#fca5a5",
    'shopping': "#93c5fd",
    'ai': "#c4b5fd",
    'food': "#fdba74",
    'music': "#86efac"
};

export default function TreemapComponent() {
    const { data: subscriptions } = useSubscriptions('price');

    const filterData = subscriptions.map((item) => {
        return { name: item.service_name, size: item.price }
    });

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <Treemap
                data={filterData}
                dataKey="size"
                content={<CustomTreeMap />}
                isAnimationActive={false}
            />
        </ResponsiveContainer>
    )
}

const CustomTreeMap = (props: any) => {
    const { x, y, width, height, name, value, depth } = props;

    if (depth === 0) return null;

    const myCategory = SUBSCRIPTION_SERVICES.find(f => f.service_name === name)?.category?.toLowerCase() || "";
    const imgLogo = SUBSCRIPTION_SERVICES.find(f => f.service_name === name)?.logoUrl;
    const bgColor = COLORS[myCategory] || "#eee";

    const screenWidth = window.innerWidth;
    const GAP = screenWidth <= 480 ? 4 : screenWidth <= 768 ? 8 : 16;

    const innerX = x + GAP / 2;
    const innerY = y + GAP / 2;
    const innerWidth = Math.max(0, width - GAP);
    const innerHeight = Math.max(0, height - GAP);


    const isLarge  = innerWidth > 110 && innerHeight > 110;
    const isMedium = innerWidth > 65  && innerHeight > 55;
    const isSmall  = innerWidth > 32  && innerHeight > 32;

    const imgSize   = Math.min(innerWidth * 0.4, innerHeight * 0.4, 48);
    const priceSize = Math.max(Math.min(innerWidth * 0.13, 14), 8);
    const nameSize  = Math.max(Math.min(innerWidth * 0.11, 13), 8);

    if (!isSmall) {
        return (
            <g className={styles.treemapItem}>
                <rect
                    x={innerX} y={innerY}
                    width={innerWidth} height={innerHeight}
                    fill={bgColor}
                    stroke="var(--border-shadow)" strokeWidth={1.5} rx={6}
                />
            </g>
        );
    }

    return (
        <g className={styles.treemapItem}>
            <rect
                x={innerX} y={innerY}
                width={innerWidth} height={innerHeight}
                fill={bgColor}
                stroke="var(--border-shadow)" strokeWidth={1.5} rx={6}
            />
            <foreignObject x={innerX} y={innerY} width={innerWidth} height={innerHeight}>
                <div className={styles.treeInnerContent}>

                    {imgLogo && (
                        <img
                            className={styles.treeInnerImg}
                            src={imgLogo}
                            alt={name}
                            style={{ width: imgSize, height: imgSize, objectFit : 'contain', borderRadius :'30%' }}
                        />
                    )}

                    {isMedium && (
                        <div className={styles.treeInnerText}>
                          
                            {isLarge && (
                                <span
                                    className={styles.treeInnerServiceName}
                                    style={{ fontSize: `${nameSize}px` }}
                                >
                                    {name}
                                </span>
                            )}
                            <span
                                className={styles.treeInnerPrice}
                                style={{ fontSize: `${priceSize}px` }}
                            >
                                ₩{value.toLocaleString()}
                            </span>
                        </div>
                    )}

                </div>
            </foreignObject>
        </g>
    )
}
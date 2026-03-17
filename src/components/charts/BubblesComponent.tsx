import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { useSubscriptions } from '../../hooks/useSubscriptions.tsx';
import { useSubscriptionSummary } from '../../hooks/useSubscriptionSummary.tsx';
import { SUBSCRIPTION_SERVICES } from '../../constants/subscriptionData.tsx';
import styles from './BubblesComponent.module.css'

const CustomImageLayer = ({ nodes }: any) => {
    return (
        <g style={{ pointerEvents: 'none' }}>
            <defs>
                <radialGradient id="sunlit-glow" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#fff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
                </radialGradient>

                {nodes.map((node: any) => {
                    if (node.depth === 0 || !node.data.logo) return null;

                    const imageSize = node.radius * 0.7;

                    return (
                        <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                            <rect
                                x={-imageSize / 2} // 중앙 정렬
                                y={-imageSize / 2}
                                width={imageSize}
                                height={imageSize}
                                rx={imageSize * 0.3} 
                                ry={imageSize * 0.3}
                            />
                        </clipPath>
                    );
                })}
            </defs>

            {nodes.map((node: any) => {
                if (node.depth === 0) return null;

                const imageSize = node.radius * 0.7;

                return (
                    <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                        <circle r={node.radius} fill="url(#sunlit-glow)" />

                        {node.data.logo && (
                            <image
                                href={node.data.logo}
                                x={-imageSize / 2}
                                y={-imageSize / 2}
                                width={imageSize}
                                height={imageSize}
                                clipPath={`url(#clip-${node.id})`}
                                opacity={0.9}
                            />
                        )}
                    </g>
                );
            })}
        </g>
    );
};

export default function BubblesComponent() {
    const { data: subscriptions = [] } = useSubscriptions();
    const { summary } = useSubscriptionSummary();
    const { totalMonthlycost = 0 } = summary || {};

    const customColors = ['#85E8C3', '#FF6B9B', '#FFEE8C', '#A8A4FF', '#FF9A76', '#fca5a5', '#93c5fd'];

    const filterData = {
        name: String(totalMonthlycost),
        children: subscriptions.map((item, index) => {
            const serviceLogo = SUBSCRIPTION_SERVICES.find(f => f.service_name === item.service_name)?.logoUrl;
            return {
                name: item.service_name,
                value: item.price,
                logo: serviceLogo,
                color: customColors[index % customColors.length]
            };
        })
    };

    return (
        <div style={{ width: '100%', height: '100%' }} className={styles.bubbleWrap}>
            <ResponsiveCirclePacking
                data={filterData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id="name"
                value="value"

                colors={(node: any) => node.depth === 0 ? 'transparent' : node.data.color}
                borderWidth={0}
                padding={8}

                enableLabels={false}
                animate={false}

                layers={['circles', CustomImageLayer]} // circles다 그리면 CustomLayer 씌우기

                tooltip={({ id, value }) => (
                    <div style={{
                        width: '100px',
                        padding: '10px 16px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        {id} : {value.toLocaleString()}원
                    </div>
                )}
            />
        </div>
    );
}



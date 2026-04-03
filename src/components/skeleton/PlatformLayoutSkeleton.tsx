import styles from "./PlatformLayoutSkeleton.module.css";

interface SkProps {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  className?: string;
}

const Sk = ({ width, height, circle, className = "" }: SkProps) => (
  <div
    className={`${styles.sk} ${circle ? styles.skCircle : ""} ${className}`}
    style={{ width, height }}
  />
);

const StatCardSkeleton = ({ color }: { color: string }) => (
  <div className={`${styles.statCard} ${styles[color]}`}>
    <Sk width={80} height={10} />
    <Sk width={100} height={18} />
  </div>
);

const PaymentItemSkeleton = () => (
  <div className={styles.paymentItem}>
    <Sk width={32} height={32} circle />
    <div className={styles.paymentInfo}>
      <Sk width={80} height={12} />
      <Sk width={36} height={10} />
    </div>
    <Sk width={50} height={12} />
  </div>
);

const BarRowSkeleton = ({ barWidth }: { barWidth: string }) => (
  <div className={styles.barRow}>
    <Sk width={48} height={11} />
    <Sk height={10} className={styles.barFill} style={{ width: barWidth } as React.CSSProperties} />
    <Sk width={72} height={11} />
  </div>
);

export default function DashboardSkeleton() {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <Sk width={36} height={36} circle />
          <Sk width={70} height={14} />
        </div>

        <Sk width={40} height={10} className={styles.navGroupLabel} />
        <Sk width={110} height={13} className={styles.navItem} />

        <Sk width={60} height={10} className={styles.navGroupLabel} />
        <Sk width={100} height={13} className={styles.navItem} />
        <Sk width={90} height={13} className={styles.navItem} />
        <Sk width={80} height={13} className={styles.navItem} />

        <Sk width={55} height={10} className={styles.navGroupLabel} />
        <Sk width={85} height={13} className={styles.navItem} />
        <Sk width={95} height={13} className={styles.navItem} />
        <Sk width={75} height={13} className={styles.navItem} />
        <Sk width={65} height={13} className={styles.navItem} />
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <Sk width={110} height={20} />
          <Sk width={90} height={32} className={styles.btnSk} />
        </div>

        {/* Stat cards */}
        <div className={styles.statGrid}>
          <StatCardSkeleton color="blue" />
          <StatCardSkeleton color="green" />
          <StatCardSkeleton color="yellow" />
          <StatCardSkeleton color="pink" />
        </div>

        {/* Bottom row */}
        <div className={styles.bottomGrid}>
          {/* Left panel */}
          <div className={styles.panel}>
            <div className={styles.tabs}>
              <Sk width={72} height={28} className={styles.tabBtn} />
              <Sk width={64} height={28} className={styles.tabBtn} />
            </div>

            <Sk width={140} height={12} className={styles.chartTitle} />

            <div className={styles.bars}>
              <BarRowSkeleton barWidth="85%" />
              <BarRowSkeleton barWidth="30%" />
              <BarRowSkeleton barWidth="92%" />
              <BarRowSkeleton barWidth="20%" />
              <BarRowSkeleton barWidth="8%" />
            </div>

            <div className={styles.noticeBox}>
              <div className={styles.noticeHeader}>
                <Sk width={18} height={18} circle />
                <Sk width={60} height={12} />
              </div>
              <Sk width={180} height={11} className={styles.noticeSubtitle} />
              <div className={styles.noticeBody}>
                <Sk width={160} height={11} />
                <Sk width={80} height={11} />
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className={styles.panel}>
            <div className={styles.paymentHeader}>
              <Sk width={16} height={16} circle />
              <Sk width={70} height={13} />
            </div>

            <div className={styles.paymentList}>
              {Array.from({ length: 5 }).map((_, i) => (
                <PaymentItemSkeleton key={i} />
              ))}
            </div>

            <div className={styles.pagination}>
              <Sk width={50} height={22} className={styles.pageBtn} />
              <Sk width={30} height={11} />
              <Sk width={50} height={22} className={styles.pageBtn} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
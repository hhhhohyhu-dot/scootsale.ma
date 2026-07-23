import styles from "./Admin.module.css";

export default function AdminDashboard() {
  const recentOrders = [
    { id: "#ORD-001", customer: "Ahmed B.", amount: "15,900 MAD", status: "Completed", date: "Today" },
    { id: "#ORD-002", customer: "Sarah M.", amount: "8,900 MAD", status: "Pending", date: "Yesterday" },
    { id: "#ORD-003", customer: "Youssef T.", amount: "21,000 MAD", status: "Completed", date: "2 days ago" },
  ];

  return (
    <div>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Revenue</div>
          <div className={styles.statValue}>145,800 MAD</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Orders</div>
          <div className={styles.statValue}>24</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active Customers</div>
          <div className={styles.statValue}>18</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Low Stock Items</div>
          <div className={styles.statValue}>2</div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent Orders</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={`${styles.statusBadge} ${order.status === 'Completed' ? styles.statusCompleted : styles.statusPending}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

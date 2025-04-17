// AdminDashboard.tsx
import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  ShoppingCart, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  Activity,
  Clock
} from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './AdminDashboard.module.scss';

const cx = classNames.bind(styles);


const AdminDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('week');

  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$12,845.30', 
      change: '+12.5%', 
      isPositive: true, 
      icon: <DollarSign size={20} /> 
    },
    { 
      title: 'Orders', 
      value: '254', 
      change: '+18.2%', 
      isPositive: true, 
      icon: <ShoppingCart size={20} /> 
    },
    { 
      title: 'New Users', 
      value: '128', 
      change: '-3.1%', 
      isPositive: false, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Book Sales', 
      value: '1,024', 
      change: '+8.4%', 
      isPositive: true, 
      icon: <BookOpen size={20} /> 
    }
  ];

  const recentOrders = [
    { id: '#ORD-5412', customer: 'Nguyen Van A', date: '17 Apr 2025', status: 'Completed', amount: '$68.50' },
    { id: '#ORD-5411', customer: 'Tran Thi B', date: '17 Apr 2025', status: 'Processing', amount: '$124.00' },
    { id: '#ORD-5410', customer: 'Le Van C', date: '16 Apr 2025', status: 'Completed', amount: '$42.25' },
    { id: '#ORD-5409', customer: 'Pham Thi D', date: '16 Apr 2025', status: 'Shipped', amount: '$85.75' },
    { id: '#ORD-5408', customer: 'Hoang Van E', date: '15 Apr 2025', status: 'Cancelled', amount: '$56.00' }
  ];

  const topSellingBooks = [
    { title: 'The Silent Echo', author: 'Nguyen Thi Minh', sales: 124, price: '$18.99' },
    { title: 'Beyond the Horizon', author: 'Tran Van Hoang', sales: 98, price: '$24.50' },
    { title: 'Midnight Whispers', author: 'Le Thanh Huong', sales: 86, price: '$19.99' },
    { title: 'The Lost Garden', author: 'Pham Quang Minh', sales: 75, price: '$21.25' }
  ];

  const recentActivities = [
    { action: 'New book added', details: '"The Mountain Path" by Tran Minh Tuan', time: '2 hours ago' },
    { action: 'Order fulfilled', details: 'Order #ORD-5407 has been shipped', time: '4 hours ago' },
    { action: 'New user registered', details: 'Nguyen Thi Quynh', time: '5 hours ago' },
    { action: 'Discount applied', details: '20% off on "Science Fiction" category', time: '6 hours ago' },
    { action: 'Inventory update', details: 'Restocked "Summer Dreams" - 25 copies', time: '8 hours ago' }
  ];

  return (
        <div className={cx('dashboard')}>
            <div className={cx('dashboard-header')}>
                <h1 className={cx('dashboard-title')}>Dashboard</h1>
                <div className={cx('time-filter')}>
                <button 
                    className={cx('filter-button', { active: timeFilter === 'day' })}
                    onClick={() => setTimeFilter('day')}
                >
                    Day
                </button>
                <button 
                    className={cx('filter-button', { active: timeFilter === 'week' })}
                    onClick={() => setTimeFilter('week')}
                >
                    Week
                </button>
                <button 
                    className={cx('filter-button', { active: timeFilter === 'month' })}
                    onClick={() => setTimeFilter('month')}
                >
                    Month
                </button>
                <button 
                    className={cx('filter-button', { active: timeFilter === 'year' })}
                    onClick={() => setTimeFilter('year')}
                >
                    Year
                </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className={cx('stats-grid')}>
                {stats.map((stat, index) => (
                <div key={index} className={cx('stat-card')}>
                    <div className={cx('stat-icon')}>
                    {stat.icon}
                    </div>
                    <div className={cx('stat-content')}>
                    <h3 className={cx('stat-title')}>{stat.title}</h3>
                    <p className={cx('stat-value')}>{stat.value}</p>
                    <div className={cx('stat-change', { positive: stat.isPositive, negative: !stat.isPositive })}>
                        {stat.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        <span>{stat.change}</span>
                        <span className={cx('period')}>vs last {timeFilter}</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className={cx('charts-section')}>
                <div className={cx('chart-card', 'sales-chart')}>
                <div className={cx('card-header')}>
                    <h2 className={cx('card-title')}>
                    <BarChart3 size={18} />
                    Sales Analytics
                    </h2>
                    <div className={cx('card-actions')}>
                    <select className={cx('chart-selector')}>
                        <option value="revenue">Revenue</option>
                        <option value="orders">Orders</option>
                        <option value="users">Users</option>
                    </select>
                    </div>
                </div>
                <div className={cx('chart-placeholder')}>
                    {/* Chart would be rendered here with a real chart library */}
                    <div className={cx('placeholder-chart')}>
                    <TrendingUp size={64} />
                    <p>Sales chart visualization would be displayed here</p>
                    </div>
                </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className={cx('two-columns')}>
                {/* Recent Orders */}
                <div className={cx('card', 'orders-card')}>
                <div className={cx('card-header')}>
                    <h2 className={cx('card-title')}>
                    <ShoppingCart size={18} />
                    Recent Orders
                    </h2>
                    <a href="#" className={cx('view-all')}>View All</a>
                </div>
                <div className={cx('card-content')}>
                    <table className={cx('orders-table')}>
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.date}</td>
                            <td>
                            <span className={cx('order-status', order.status.toLowerCase())}>{order.status}</span>
                            </td>
                            <td>{order.amount}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>

                {/* Top Selling Books */}
                <div className={cx('card', 'top-books-card')}>
                <div className={cx('card-header')}>
                    <h2 className={cx('card-title')}>
                    <BookOpen size={18} />
                    Top Selling Books
                    </h2>
                    <a href="#" className={cx('view-all')}>View All</a>
                </div>
                <div className={cx('card-content')}>
                    <ul className={cx('book-list')}>
                    {topSellingBooks.map((book, index) => (
                        <li key={index} className={cx('book-item')}>
                        <div className={cx('book-thumbnail')}>
                            <img src={`/api/placeholder/40/60`} alt={book.title} />
                        </div>
                        <div className={cx('book-details')}>
                            <h4 className={cx('book-title')}>{book.title}</h4>
                            <p className={cx('book-author')}>{book.author}</p>
                            <div className={cx('book-stats')}>
                            <span className={cx('book-sales')}>{book.sales} sales</span>
                            <span className={cx('book-price')}>{book.price}</span>
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className={cx('card', 'activities-card')}>
                <div className={cx('card-header')}>
                <h2 className={cx('card-title')}>
                    <Activity size={18} />
                    Recent Activities
                </h2>
                </div>
                <div className={cx('card-content')}>
                <ul className={cx('activity-list')}>
                    {recentActivities.map((activity, index) => (
                    <li key={index} className={cx('activity-item')}>
                        <div className={cx('activity-icon')}>
                        <Clock size={16} />
                        </div>
                        <div className={cx('activity-details')}>
                        <h4 className={cx('activity-action')}>{activity.action}</h4>
                        <p className={cx('activity-description')}>{activity.details}</p>
                        </div>
                        <div className={cx('activity-time')}>{activity.time}</div>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
  
  );
};

export default AdminDashboard;
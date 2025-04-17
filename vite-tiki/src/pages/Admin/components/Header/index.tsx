// src/layouts/AdminLayout/Header.tsx
import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.pageTitle}>
        <h1>Quản trị sách</h1>
      </div>
      <div className={styles.userSection}>
        <div className={styles.notifications}>
          <span>🔔</span>
        </div>
        <div className={styles.userInfo}>
          <span>👤 Admin</span>
          <div className={styles.userMenu}>
            <ul>
              <li>Hồ sơ</li>
              <li>Cài đặt</li>
              <li>Đăng xuất</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
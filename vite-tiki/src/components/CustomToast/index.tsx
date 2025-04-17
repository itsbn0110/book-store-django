import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './CustomToast.module.scss';
const cx = classNames.bind(styles);
const CustomToast : FC  = () => (
    <div>
        <h3 className={cx('toast-title', 'text-center')}>Thêm sản phẩm thành công</h3>
        <button className={cx('button', 'btn--primary', 'p-2', 'text-center')}>Xem giỏ hàng và thanh toán</button>
    </div>
);

export default CustomToast;

import { useCallback, useEffect, useRef } from 'react';
import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronRight, faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
interface NavBarProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

function NavBar({ isMenuOpen, toggleMenu }: NavBarProps) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                toggleMenu();
            }
        },
        [toggleMenu],
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
    return (
        isMenuOpen && (
            <div ref={menuRef} className={cx('wrapper')}>
                <div className={cx('nav-header')}>
                    <span className={cx('user')}>
                        <FontAwesomeIcon className={cx('user-icon')} icon={faUser} />
                    </span>

                    <div className={cx('login')}>
                        <p className="fs-4">Đăng nhập</p>

                        <p className="fs-5">Nhận nhiều ưu đãi hơn</p>
                    </div>

                    <span className={cx('icon-right')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                </div>

                <ul className={cx('category', 'border border-bottom-0')}>
                    <li className="py-3">
                        <a className="text-secondary-emphasis fs-4 d-flex align-items-center" href="/">
                            <FontAwesomeIcon className={cx('category-icon')} icon={faHome} />{' '}
                            <span className="">Trang chủ</span>
                        </a>
                    </li>
                    <li className="py-3">
                        <a className="text-secondary-emphasis fs-4 d-flex align-items-center " href="/">
                            <FontAwesomeIcon className={cx('category-icon')} icon={faList} />{' '}
                            <span className="ms-1">Danh sách ngành hàng</span>
                        </a>
                    </li>
                    <li className="py-3">
                        <a className="text-secondary-emphasis fs-4 d-flex align-items-center " href="/">
                            <FontAwesomeIcon className={cx('category-icon')} icon={faUser} />{' '}
                            <span className="ms-2">Quản lý tài khoản</span>
                        </a>
                    </li>
                    <li className="py-3">
                        <a className="text-secondary-emphasis fs-4 d-flex align-items-center " href="/">
                            <FontAwesomeIcon className={cx('category-icon')} icon={faBell} />{' '}
                            <span className="ms-1">Thông báo</span>
                        </a>
                    </li>
                </ul>

                <ul className={cx('category', 'border border-bottom-0')}>
                    <h3 className={cx('category-header')}>KHUYẾN MÃI HOT</h3>
                    <li className="py-2">
                        <a className="fs-4 text-body-emphasis" href="/">
                            Tiki Deal
                        </a>
                    </li>
                    <li className="py-2">
                        <a className="fs-4 text-body-emphasis" href="/">
                            Phiếu quà tặng
                        </a>
                    </li>
                    <li className="py-2">
                        <a className="fs-4 text-body-emphasis" href="/">
                            Ưu đãi cho chủ thẻ ngân hàng
                        </a>
                    </li>
                </ul>

                <ul className={cx('category', 'border border-bottom-0')}>
                    <h3 className={cx('category-header')}>HỖ TRỢ</h3>
                    <li className="py-2 text-body-emphasis fs-4">
                        HOTLINE:
                        <a className={cx('hotline-link', ' fw-bold text-success')} href="/">
                            {' '}
                            1900-6035{' '}
                        </a>
                        (1000đ/phút)
                    </li>

                    <li className="py-2 d-flex align-items-center justify-content-between">
                        <a className="fs-4 text-body-emphasis" href="/">
                            Hỗ trợ khách hàng
                        </a>
                        <span>
                            <FontAwesomeIcon className="text-secondary fs-5 " icon={faChevronRight} />
                        </span>
                    </li>
                </ul>
            </div>
        )
    );
}

export default memo(NavBar);

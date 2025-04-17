import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FC } from 'react';

const cx = classNames.bind(styles);

const Footer :FC = () => {
    return (
        <div className={cx('wrapper', 'd-xxl-block d-xl-block d-lg-block d-md-none d-none')}>
            <div className="custom-container-xxl">
                <div className={cx('section')}>
                    <div className="row g-4">
                        <div className="col-lg-2-4">
                            <div className={cx('footer-wrapper')}>
                                <h3 className={cx('title')}>Hỗ trợ khách hàng</h3>
                                <ul className={cx('list')}>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            <p>
                                                Hotline: <strong>1900-6035</strong>
                                                <br></br>
                                                (1000 đ/phút, 8-21h kể cả T7, CN)
                                            </p>
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Các câu hỏi thường gặp
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Gửi yêu cầu hỗ trợ
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Hướng dẫn đặt hàng
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Phương thức vận chuyển
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Chính sách đổi trả
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Hướng dẫn trả góp
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Chính sách hàng nhập khẩu
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Hỗ trợ khách hàng: hotro@tiki.vn
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Báo lỗi bảo mật: security@tiki.vn
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2-4">
                            <div className={cx('footer-wrapper')}>
                                <h3 className={cx('title')}>Về Tiki</h3>
                                <ul className={cx('list')}>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Giới thiệu Tiki
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Tiki Blog
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Tuyển dụng{' '}
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Chính sách bảo mật thanh toán
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Chính sách bảo mật thông tin cá nhân
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Chính sách giải quyết khiếu nại
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Điều khoản sử dụng{' '}
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Giới thiệu Tiki Xu
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Gói hội viên VIP
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Tiếp thị liên kết cùng Tiki
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Bán hàng doanh nghiệp
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Điều kiện vận chuyển
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2-4">
                            <div className={cx('footer-wrapper')}>
                                <h3 className={cx('title')}>Hợp tác và liên kết</h3>
                                <ul className={cx('list')}>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Quy chế hoạt động Sàn GDTMĐT
                                        </a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/" className={cx('link')}>
                                            Bán hàng cùng Tiki
                                        </a>
                                    </li>
                                    <h3 className={cx('title', 'mt-4')}>Chứng nhận bởi</h3>
                                    <div className={cx('certification')}>
                                        <img
                                            className={cx('certification-img')}
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                                            height="32"
                                            width="83"
                                            alt="bo-cong-thuong"
                                        />

                                        <img
                                            className={cx('certification-img')}
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                                            width="32"
                                            height="32"
                                            alt="bo-cong-thuong-2"
                                        />

                                        <img
                                            className={cx('certification-img')}
                                            src="https://images.dmca.com/Badges/dmca_protected_sml_120y.png?ID=388d758c-6722-4245-a2b0-1d2415e70127"
                                            alt="DMCA.com Protection Status"
                                            width="32"
                                            height="32"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2-4">
                            <div className={cx('footer-wrapper')}>
                                <h3 className={cx('title')}>Phương thức thanh toán</h3>
                                <p className={cx('payment')}></p>
                                <h3 className={cx('title', 'mt-4')}>Dịch vụ giao hàng</h3>
                            </div>
                        </div>

                        <div className="col-lg-2-4">
                            <div className={cx('footer-wrapper')}>
                                <h3 className={cx('title')}>Kết nối với chúng tôi</h3>
                                <div className={cx('social')}>
                                    <a href="/" className={cx('facebook')} aria-label="Facebook">
                                        <FaFacebook size={28} color="#3B5998" />
                                    </a>

                                    <a href="/" className={cx('youtube')}  aria-label="social">
                                        <FaYoutube size={28} color="red" />
                                    </a>

                                    <a href="/" className={cx('linkedin')}  aria-label="social">
                                        <FaLinkedin size={28} />
                                    </a>
                                </div>
                                <h3 className={cx('title', 'mt-5')}>Tải ứng dụng trên điện thoại</h3>
                                <div className={cx('mobile')}>
                                    <div className={cx('QR-logo')}>
                                        <img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
                                            width="80"
                                            height="80"
                                            alt="tiki-qr"
                                        />
                                    </div>

                                    <div className={cx('Apps')}>
                                        <img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                                            width="122"
                                            alt="tiki-app-store"
                                        />
                                        <img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                                            width="122"
                                            alt="tiki-google-play"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={cx('about-company')}>
                        <div className={cx('section')}>
                            <h3 className={cx('title')}>Công ty TNHH TIKI</h3>
                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <a href="/" className={cx('link')}>
                                        Địa chỉ trụ sở: Tòa nhà Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12,
                                        Quận 10, Thành phố Hồ Chí Minh
                                    </a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/" className={cx('link')}>
                                        Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư
                                        Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.{' '}
                                    </a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/" className={cx('link')}>
                                        Hotline: <span style={{ color: '#0B74E5' }}>1900-6035</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

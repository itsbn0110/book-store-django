// AuthModal.tsx
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { setUser } from '~/redux/userSlice'

import styles from './AuthModal.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      if (usernameInputRef.current) {
        usernameInputRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  if (!isOpen) return null;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }

      const data = await response.json();
      console.log('Đăng nhập thành công:', data);

      // Lưu thông tin user và accessToken vào Redux và localStorage
      const userData = {
        user: data.user,
        accessToken: data.access,
      };
      dispatch(setUser(userData));
      

      // Tắt modal sau khi đăng nhập thành công
      onClose();
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      alert('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  const handleSwitchMode = () => {
    setIsRegisterMode((prev) => !prev);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin đăng ký.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Đăng ký thất bại. Vui lòng thử lại.');
      }

      alert('Đăng ký thành công. Vui lòng đăng nhập.');
      setIsRegisterMode(false);
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      alert('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className={cx('modal-overlay')} onClick={onClose}>
      <div
        className={cx('modal-container')}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx('modal-close')} onClick={onClose}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>

        <div className={cx('modal-content')}>
          <div className={cx('modal-left')}>
            <div className={cx('modal-header')}>
              <h2 className={cx('modal-title')}>Xin chào,</h2>
              <p className={cx('modal-subtitle')}>
                {isRegisterMode ? 'Tạo tài khoản' : 'Đăng nhập hoặc Tạo tài khoản'}
              </p>
            </div>

            <form className={cx('modal-form')} onSubmit={isRegisterMode ? handleRegister : handleSubmit}>
              <div className={cx('form-group')}>
                <label htmlFor="username" className={cx('form-label')}>Tên đăng nhập</label>
                <input
                  type="text"
                  id="username"
                  className={cx('form-input')}
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Nhập tên đăng nhập"
                  ref={usernameInputRef}
                  required
                />
              </div>
              <div className={cx('form-group')}>
                <label htmlFor="password" className={cx('form-label')}>Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  className={cx('form-input')}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu"
                  ref={passwordInputRef}
                  required
                />
              </div>
              {isRegisterMode && (
                <div className={cx('form-group')}>
                  <label htmlFor="confirmPassword" className={cx('form-label')}>Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={cx('form-input')}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Nhập lại mật khẩu"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className={cx('submit-button')}
                disabled={isLoading || !username || !password}
              >
                {isLoading ? 'Đang xử lý...' : isRegisterMode ? 'Đăng Ký' : 'Tiếp Tục'}
              </button>
            </form>

            <div className={cx('switch-mode')}>
              <button
                type="button"
                className={cx('switch-button')}
                onClick={handleSwitchMode}
              >
                {isRegisterMode ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
              </button>
            </div>

            <div className={cx('separator')}>
              <span className={cx('separator-text')}>Hoặc tiếp tục bằng</span>
            </div>

            <div className={cx('social-login')}>
              <button type="button" className={cx('social-button', 'facebook')}>
                <div className={cx('social-icon')}>
                  <FaFacebook size={28} />
                </div>
              </button>
              <button type="button" className={cx('social-button', 'google')}>
                <div className={cx('social-icon')}>
                  <FaGoogle size={28} />
                </div>
              </button>
            </div>

            <div className={cx('terms')}>
              <p className={cx('terms-text')}>
                Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
                <a href="#" className={cx('terms-link')}>điều khoản sử dụng</a> và{' '}
                <a href="#" className={cx('terms-link')}>Chính sách bảo mật thông tin cá nhân</a> của Tiki
              </p>
            </div>
          </div>

          <div className={cx('modal-right')}>
            <div className={cx('illustration')}>
              <img src={images.tikiLogin || '/auth-illustration.png'} alt="Tiki Illustration" />
            </div>
            <div className={cx('shopping-info')}>
              <h3 className={cx('shopping-title')}>Mua sắm tại Tiki</h3>
              <p className={cx('shopping-subtitle')}>Siêu ưu đãi mỗi ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
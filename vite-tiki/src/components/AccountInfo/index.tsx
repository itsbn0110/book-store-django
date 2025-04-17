import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLock, faTrash, faKey } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import classNames from 'classnames/bind';
import { setUser } from '~/redux/userSlice';

import styles from './AccountInfo.module.scss';

const cx = classNames.bind(styles);

interface UserData {
  id: number;
  name: string;
  nickname: string | null;
  phone: string;
  email: string | null;
  birthdate: {
    day: number | null;
    month: number | null;
    year: number | null;
  };
  gender: 'male' | 'female' | 'other' | null;
  nationality: string | null;
  avatar: string |null;
}

const AccountInfo = () => {
  const dispatch = useDispatch();
  const {id} = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  console.log("userId: ", id);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${id}/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
        dispatch(setUser(data));
      } catch (err) {
        setError('Error fetching user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleUpdateProfile = async () => {
    // Implementation for updating profile
    alert('Profile update functionality will be implemented');
  };

  const handleChangePassword = async () => {
    // Implementation for password change
    alert('Password change functionality will be implemented');
  };

  const handleSetupPIN = async () => {
    // Implementation for PIN setup
    alert('PIN setup functionality will be implemented');
  };

  const handleDeleteAccount = async () => {
    // Implementation for account deletion
    alert('Account deletion functionality will be implemented');
  };

  const handleConnectSocial = (provider: string) => {
    // Implementation for social account connection
    alert(`Connect to ${provider} functionality will be implemented`);
  };

  if (loading) {
    return <div className={cx('loading')}>Loading user data...</div>;
  }

  if (error || !userData) {
    return <div className={cx('error')}>Error: {error || 'Unknown error'}</div>;
  }

//   const generateDateOptions = (type: 'day' | 'month' | 'year') => {
//     if (type === 'day') {
//       return Array.from({ length: 31 }, (_, i) => (
//         <option key={i + 1} value={i + 1}>
//           {i + 1}
//         </option>
//       ));
//     } else if (type === 'month') {
//       return Array.from({ length: 12 }, (_, i) => (
//         <option key={i + 1} value={i + 1}>
//           {i + 1}
//         </option>
//       ));
//     } else {
//       const currentYear = new Date().getFullYear();
//       return Array.from({ length: 100 }, (_, i) => (
//         <option key={currentYear - i} value={currentYear - i}>
//           {currentYear - i}
//         </option>
//       ));
//     }
//   };

  return (
    <div className={cx('account-info-container')}>
      <h1 className={cx('account-info-title')}>Thông tin tài khoản</h1>

      <div className={cx('account-info-content')}>
        <div className={cx('personal-info')}>
          <h2 className={cx('section-title')}>Thông tin cá nhân</h2>
          
          <div className={cx('avatar-section')}>
            <div className={cx('avatar')}>
              <img src={userData?.avatar || '/default-avatar.png'} alt="User avatar" />
            </div>
            <button className={cx('edit-avatar')}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>

          <div className={cx('input-group')}>
            <label>Họ & Tên</label>
            <input 
              type="text" 
              value={userData.name} 
              onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
            />
          </div>

          <div className={cx('input-group')}>
            <label>Nickname</label>
            <input 
              type="text" 
              value={userData.nickname || ''} 
              placeholder="Thêm nickname"
              onChange={(e) => setUserData({ ...userData, nickname: e.target.value })} 
            />
          </div>

          {/* <div className={cx('birth-date')}>
            <label>Ngày sinh</label>
            <div className={cx('date-selectors')}>
              <select 
                value={userData.birthdate.day || ''} 
                onChange={(e) => setUserData({ 
                  ...userData, 
                  birthdate: { 
                    ...userData.birthdate, 
                    day: Number(e.target.value) 
                  } 
                })}
              >
                <option value="">Ngày</option>
                {generateDateOptions('day')}
              </select>

              <select 
                value={userData.birthdate.month || ''} 
                onChange={(e) => setUserData({ 
                  ...userData, 
                  birthdate: { 
                    ...userData.birthdate, 
                    month: Number(e.target.value) 
                  } 
                })}
              >
                <option value="">Tháng</option>
                {generateDateOptions('month')}
              </select>

              <select 
                value={userData.birthdate.year || ''} 
                onChange={(e) => setUserData({ 
                  ...userData, 
                  birthdate: { 
                    ...userData.birthdate, 
                    year: Number(e.target.value) 
                  } 
                })}
              >
                <option value="">Năm</option>
                {generateDateOptions('year')}
              </select>
            </div>
          </div> */}

          <div className={cx('gender-group')}>
            <label>Giới tính</label>
            <div className={cx('gender-options')}>
              <label className={cx('radio-container')}>
                <input 
                  type="radio" 
                  name="gender" 
                  checked={userData.gender === 'male'} 
                  onChange={() => setUserData({ ...userData, gender: 'male' })} 
                />
                <span className={cx('radio-label')}>Nam</span>
              </label>
              
              <label className={cx('radio-container')}>
                <input 
                  type="radio" 
                  name="gender" 
                  checked={userData.gender === 'female'} 
                  onChange={() => setUserData({ ...userData, gender: 'female' })} 
                />
                <span className={cx('radio-label')}>Nữ</span>
              </label>
              
              <label className={cx('radio-container')}>
                <input 
                  type="radio" 
                  name="gender" 
                  checked={userData.gender === 'other'} 
                  onChange={() => setUserData({ ...userData, gender: 'other' })} 
                />
                <span className={cx('radio-label')}>Khác</span>
              </label>
            </div>
          </div>

          <div className={cx('input-group')}>
            <label>Quốc tịch</label>
            <select 
              value={userData.nationality || ''} 
              onChange={(e) => setUserData({ ...userData, nationality: e.target.value })}
            >
              <option value="">Chọn quốc tịch</option>
              <option value="vietnam">Việt Nam</option>
              <option value="usa">Hoa Kỳ</option>
              <option value="japan">Nhật Bản</option>
              <option value="korea">Hàn Quốc</option>
              <option value="china">Trung Quốc</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <button className={cx('save-button')} onClick={handleUpdateProfile}>
            Lưu thay đổi
          </button>
        </div>

        <div className={cx('contact-security')}>
          <div className={cx('contact-info')}>
            <h2 className={cx('section-title')}>Số điện thoại và Email</h2>
            
            <div className={cx('info-item')}>
              <div className={cx('item-label')}>
                <span className={cx('icon')}>📱</span>
                <span>Số điện thoại</span>
              </div>
              <div className={cx('item-value')}>
                <span>{userData.phone}</span>
                <button className={cx('update-button')} onClick={() => alert('Update phone')}>
                  Cập nhật
                </button>
              </div>
            </div>

            <div className={cx('info-item')}>
              <div className={cx('item-label')}>
                <span className={cx('icon')}>✉️</span>
                <span>Địa chỉ email</span>
              </div>
              <div className={cx('item-value')}>
                <span>{userData.email || 'Thêm địa chỉ email'}</span>
                <button className={cx('update-button')} onClick={() => alert('Update email')}>
                  Cập nhật
                </button>
              </div>
            </div>
          </div>

          <div className={cx('security')}>
            <h2 className={cx('section-title')}>Bảo mật</h2>
            
            <div className={cx('security-item')}>
              <div className={cx('item-label')}>
                <FontAwesomeIcon icon={faLock} className={cx('icon')} />
                <span>Đổi mật khẩu</span>
              </div>
              <button className={cx('update-button')} onClick={handleChangePassword}>
                Cập nhật
              </button>
            </div>

            <div className={cx('security-item')}>
              <div className={cx('item-label')}>
                <FontAwesomeIcon icon={faKey} className={cx('icon')} />
                <span>Thiết lập mã PIN</span>
              </div>
              <button className={cx('setup-button')} onClick={handleSetupPIN}>
                Thiết lập
              </button>
            </div>

            <div className={cx('security-item')}>
              <div className={cx('item-label')}>
                <FontAwesomeIcon icon={faTrash} className={cx('icon')} />
                <span>Yêu cầu xóa tài khoản</span>
              </div>
              <button className={cx('delete-button')} onClick={handleDeleteAccount}>
                Yêu cầu
              </button>
            </div>
          </div>

          <div className={cx('social-connections')}>
            <h2 className={cx('section-title')}>Liên kết mạng xã hội</h2>
            
            <div className={cx('social-item')}>
              <div className={cx('item-label')}>
                <FaFacebook className={cx('icon', 'facebook')} />
                <span>Facebook</span>
              </div>
              <button 
                className={cx('connect-button')} 
                onClick={() => handleConnectSocial('Facebook')}
              >
                Liên kết
              </button>
            </div>

            <div className={cx('social-item')}>
              <div className={cx('item-label')}>
                <FaGoogle className={cx('icon', 'google')} />
                <span>Google</span>
              </div>
              <button 
                className={cx('connect-button')} 
                onClick={() => handleConnectSocial('Google')}
              >
                Liên kết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
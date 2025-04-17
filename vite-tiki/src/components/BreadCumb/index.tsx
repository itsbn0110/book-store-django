import classNames from 'classnames/bind'
import styles from './BreadCumb.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, FC } from 'react'

const cx = classNames.bind(styles)

interface BreadCumbProps {
  name?: string
}

const BreadCumb: FC<BreadCumbProps> = ({ name = '' }) => {
  const [nameBreadCumb, setNameBreadCumb] = useState<string>('')

  useEffect(() => {
    const getNameBreadCumb = () => {
      switch (name) {
        case 'sach-tieng-anh':
          setNameBreadCumb('English Books')
          break
        case 'sach-truyen-tieng-viet':
          setNameBreadCumb('Sách Tiếng Việt')
          break
        case 'van-phong-pham':
          setNameBreadCumb('Văn Phòng Phẩm')
          break
        case 'qua-luu-niem':
          setNameBreadCumb('Quà Lưu Niệm')
          break
        default:
          setNameBreadCumb('')
          break
      }
    }
    getNameBreadCumb()
  }, [name])

  return (
    <div className={cx('wrapper')}>
      <div className="custom-container-xxl">
        <div className={cx('breadcumb', 'd-none d-md-flex d-lg-flex d-xl-flex d-xxl-flex')}>
          <a className={cx('breadcumb-item')} href="/">
            <span>Trang chủ</span>
          </a>
          <span className={cx('icon-next')}>
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#808089"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6.35355 5.64645C6.54882 5.84171 6.54882 6.15829 6.35355 6.35355L1.35355 11.3536C1.15829 11.5488 0.841709 11.5488 0.646447 11.3536C0.451184 11.1583 0.451184 10.8417 0.646447 10.6464L5.29289 6L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
              ></path>
            </svg>
          </span>
          <a className={cx('breadcumb-item')} href="/">
            <span>Nhà sách Tiki</span>
          </a>

          {nameBreadCumb && (
            <>
              <span className={cx('icon-next')}>
                <svg
                  width="6"
                  height="11"
                  viewBox="0 0 6 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#808089"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6.35355 5.64645C6.54882 5.84171 6.54882 6.15829 6.35355 6.35355L1.35355 11.3536C1.15829 11.5488 0.841709 11.5488 0.646447 11.3536C0.451184 11.1583 0.451184 10.8417 0.646447 10.6464L5.29289 6L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                  ></path>
                </svg>
              </span>
              <a className={cx('breadcumb-item')} href="/">
                <span>{nameBreadCumb}</span>
              </a>
            </>
          )}
        </div>
      </div>
      <div className={cx('breadcumb-mobile', 'd-flex d-md-none d-lg-none d-xl-none d-xxl-none')}>
        <div className={cx('category-mobile')}>
          <ul className={cx('category-list')}>
            <li className={cx('category-item')}>
              <a className={cx('category-link')} href="/">
                Phổ biến
              </a>
            </li>
            <li className={cx('category-item')}>
              <a className={cx('category-link')} href="/">
                Bán chạy
              </a>
            </li>
            <li className={cx('category-item')}>
              <a className={cx('category-link')} href="/">
                Hàng mới
              </a>
            </li>
            <li className={cx('category-item')}>
              <a className={cx('category-link')} href="/">
                Giá
                <FontAwesomeIcon className={cx('price-icon')} icon={faArrowTrendUp} />
              </a>
            </li>
          </ul>
          <div className={cx('filter')}>
            <span className={cx('filter-text')}>
              <FontAwesomeIcon className={cx('icon-filter')} icon={faFilter} />
              Lọc
            </span>
            <span className={cx('separate')}></span>
            <span className={cx('now')}>
              <img
                src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                alt="Giao siêu tốc 2H"
                style={{ height: '20px', width: '40px' }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreadCumb

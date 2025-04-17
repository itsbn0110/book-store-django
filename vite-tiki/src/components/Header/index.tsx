import { useContext, useState, useRef, useEffect, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faBars, faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import Fuse from 'fuse.js'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './Header.module.scss'
import { BookContext } from '~/App'
import images from '~/assets/images'
import NavBar from '~/components/NavBar'
import { RootState } from '~/redux/store'

const cx = classNames.bind(styles)

interface Book {
  id: number
  name: string
  price: number
  thumbnail_url: string
  rating_average: number
  quantity_sold?: { text: string }
  discount_rate: number
  badges_new?: { icon: string | null; text: string }[]
}

const Header: FC = () => {
  const books = useContext<Book[]>(BookContext)
  const [searchValue, setSearchValue] = useState<string>('')
  const [results, setResults] = useState<Book[]>(books)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity)

  const fuseOptions = {
    keys: ['name'],
    threshold: 0.3
  }

  const resultsRef = useRef<HTMLLIElement[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const fuse = new Fuse(books, fuseOptions)

  useEffect(() => {
    if (selectedIndex !== -1 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex].scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }

    const searchResults = fuse.search(searchValue).map(result => result.item)
    setResults(searchResults)
  }

  const handleHideResult = () => {
    setResults([])
    setIsVisible(false)
  }

  const handleFocus = () => {
    setShowOverlay(true)
    setResults(books)
    setIsVisible(true)
  }

  const handleCloseSearch = () => {
    setShowOverlay(false)
  }

  const handleClickSearchItem = () => {
    setIsVisible(false)
    setShowOverlay(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0))
    } else if (e.key === 'Enter' && selectedIndex !== -1 && results[selectedIndex]) {
      console.log('Selected item:', results[selectedIndex].name)
    }
  }

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState)
    setShowOverlay(prevState => !prevState)
  }, [])

  return (
    <div>
      {showOverlay && <div className="overlay show" onClick={handleCloseSearch}></div>}
      <div className={cx('wrapper', 'd-none d-lg-block d-md-block')}>
        <div className="custom-container-xxl container-xl">
          <div className={cx('inner')}>
            <div className={cx('logo')}>
              <Link to="/">
                <img className={cx('img-logo')} src={images.logo} alt="tiki" />
              </Link>
            </div>

            <Tippy
              visible={isVisible}
              offset={[0, 10]}
              placement="bottom-start"
              interactive
              appendTo={() => document.body}
              render={attrs => (
                <ul className={cx('search-popper')} tabIndex={-1} {...attrs}>
                  {results.map((product, index) => (
                    <li
                      className={cx('search-result', { active: selectedIndex === index })}
                      key={product.id}
                      ref={el => {
                        resultsRef.current[index] = el!;
                      }}
                    >
                      <Link to={`/bookdetail/${product.id}`} onClick={handleClickSearchItem}>
                        <img
                          width="35px"
                          className={cx('search-img')}
                          src={images.searchItem}
                          alt="tìm kiếm"
                        />
                        <div className={cx('keyword')}>{product.name}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              onClickOutside={handleHideResult}
            >
              <div className={cx('search', 'd-lg-flex d-md-flex d-xl-flex d-xxl-flex')}>
                <img src={images.search} alt="search" />
                <input
                  className={cx('search-input')}
                  onChange={handleChangeSearch}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  placeholder="Giao hàng nhanh 2H & đúng khung giờ"
                  value={searchValue}
                  ref={inputRef}
                />
                <button className={cx('search-btn')}>Tìm kiếm</button>
              </div>
            </Tippy>

            <div className={cx('actions', 'd-md-none d-lg-flex d-xl-flex d-xxl-flex')}>
              <div className={cx('actions-wrapper')}>
                <Link className={cx('actions-btn')} to="/">
                  <img src={images.home} alt="home" />
                  <span>Trang chủ</span>
                </Link>
                <Tippy
                  offset={[10, 0]}
                  placement="bottom-end"
                  interactive
                  render={attrs => (
                    <ul className={cx('account-popper')} tabIndex={-1} {...attrs}>
                      <li>
                        <Link className={cx('popper-link')} to="/account">
                          Thông tin tài khoản
                        </Link>
                      </li>
                      <li>
                        <Link className={cx('popper-link')} to="/account">
                          Đơn hàng của tôi
                        </Link>
                      </li>
                      <li>
                        <Link className={cx('popper-link')} to="/account">
                          Trung tâm hỗ trợ
                        </Link>
                      </li>
                      <li>
                        <Link className={cx('popper-link')} to="/account">
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  )}
                >
                  <div className={cx('actions-btn')}>
                    <img src={images.account} alt="home" />
                    <span>Tài khoản</span>
                  </div>
                </Tippy>
              </div>
              <span className={cx('separate-cart')}></span>
              <Link className={cx('cart-wrapper', 'd-block')} to="/checkout/cart">
                <div className="position-relative">
                  <img src={images.cart} alt="cart" />
                  <span className={cx('order-quantity')}>{totalQuantity}</span>
                </div>
              </Link>
            </div>

            <div className={cx('actions-tablet-mini', 'd-xl-none d-md-flex d-lg-none d-xxl-none')}>
              <Link className={cx('cart-wrapper-md', 'd-md-flex d-lg-none')} to="/checkout/cart">
                <span className="position-relative">
                  <img src={images.cart} alt="cart" />
                  <span className={cx('order-quantity')}>{totalQuantity}</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('container', ' d-lg-none d-md-none d-sm-flex')}>
        <div className={cx('inner-mobile')}>
          <div className={cx('icon')}>
            <span className={cx('icon-left')}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>

            <span className={cx('icon-bars')} onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </span>
            {isMenuOpen && <NavBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
          </div>

          <div className={cx('search-mobile')}>
            <span className={cx('search-btn-mobile')}>
              <FontAwesomeIcon className={cx('icon-search')} icon={faSearch} />
            </span>
            <input
              className={cx('input')}
              onChange={handleChangeSearch}
              value={searchValue}
              placeholder="Bạn đang tìm kiếm gì"
            />
          </div>

          <span className={cx('cart')}>
            <span className={cx('order-quantity')}>{totalQuantity}</span>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header

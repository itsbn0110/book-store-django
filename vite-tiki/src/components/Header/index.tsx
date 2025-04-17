// Header.tsx
import { useState, useRef, useEffect, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBars, faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '~/assets/images';
import NavBar from '~/components/NavBar';
import AuthModal from '~/components/AuthModal';
import { RootState } from '~/redux/store';
import { clearUser } from '~/redux/userSlice';
import { clearCart } from '~/redux/cartSlice';

const cx = classNames.bind(styles);

interface Author {
  id: number;
  name: string;
  bio: string;
}

interface Publisher {
  id: number;
  name: string;
  address: string;
}

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  author_objs: Author[];
  publisher_objs: Publisher[];
  category_objs: Category[];
  image: string;
  title: string;
  description: string;
  price: string;
  published_date: string;
}

// For search results display and compatibility with existing component
interface BookDisplay {
  id: number;
  name: string;
  price: number;
  thumbnail_url: string;
  rating_average: number;
  quantity_sold?: { text: string };
  discount_rate: number;
  badges_new?: { icon: string | null; text: string }[];
}

const Header: FC = () => {
  const [books, setBooks] = useState<BookDisplay[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [results, setResults] = useState<BookDisplay[]>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = !!user;

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    localStorage.removeItem('persist:root'); 
  };

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/books/');
        const data = await response.json();
        
       
        const transformedBooks = data.map((book: Book) => ({
          id: book.id,
          name: book.title,
          price: parseFloat(book.price),
          thumbnail_url: book.image,
          rating_average: 5, 
          discount_rate: 0, 
        }));
        setBooks(transformedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const fuseOptions = {
    keys: ['name'],
    threshold: 0.3,
  };

  const fuse = new Fuse(books, fuseOptions);

  const resultsRef = useRef<HTMLLIElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedIndex !== -1 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);

    if (!searchValue.trim()) {
      setResults([]);
      setIsVisible(false);
      return;
    }

    const searchResults = fuse.search(searchValue).map(result => result.item);
    setResults(searchResults);
    setIsVisible(true);
  };

  const handleHideResult = () => {
    setResults([]);
    setIsVisible(false);
  };

  const handleFocus = () => {
    setShowOverlay(true);
    setIsVisible(true);
  };

  const handleCloseSearch = () => {
    setShowOverlay(false);
  };

  const handleClickSearchItem = () => {
    setIsVisible(false);
    setShowOverlay(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex !== -1 && results[selectedIndex]) {
      console.log('Selected item:', results[selectedIndex].name);
    }
  };

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
    setShowOverlay(prevState => !prevState);
  }, []);

  const handleAccountClick = useCallback(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
    // If authenticated, implement your account navigation logic here
  }, [isAuthenticated]);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  if (loading) {
    return <div className={cx('loading')}>Loading...</div>;
  }

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
                popperOptions={{
                  modifiers: [
                    {
                      name: 'sameWidth',
                      enabled: true,
                      fn: ({ state }) => {
                        state.styles.popper.width = `${state.rects.reference.width}px`;
                      },
                      phase: 'beforeWrite',
                      requires: ['computeStyles'],
                    },
                  ],
                }}
                render={attrs => (
                  <ul className={cx('search-popper')} tabIndex={-1} {...attrs}>
                  {results.map((product, index) => (
                    <li
                      className={cx('search-result', { active: selectedIndex === index })}
                      key={product.id}
                      ref={el => {
                        if (el) resultsRef.current[index] = el;
                      }}
                    >
                      <Link to={`/mypagebookdetail/${product.id}`} onClick={handleClickSearchItem}>
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
                    isAuthenticated ? (
                      <ul className={cx('account-popper')} tabIndex={-1} {...attrs}>
                        <li>
                          <Link className={cx('popper-link')} to= {`/account/${user?.id}`}>
                            Thông tin tài khoản
                          </Link>
                        </li>
                        <li>
                          <Link className={cx('popper-link')} to="/account/orders">
                            Đơn hàng của tôi
                          </Link>
                        </li>
                        <li>
                          <Link className={cx('popper-link')} to="/support">
                            Trung tâm hỗ trợ
                          </Link>
                        </li>
                        <li className={cx('popper-link')}  onClick={handleLogout}>
                            Đăng xuất
                        </li>
                      </ul>
                    ) : null
                  )}
                >
                  <div className={cx('actions-btn')} onClick={handleAccountClick}>
                    <img src={images.account} alt="account" />
                    <span>
                      {isAuthenticated ? (
                        user?.username || 'Tài khoản'
                      ) : (
                        'Tài khoản'
                      )}
                    </span>
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
              <div className={cx('account-btn-md')} onClick={handleAccountClick}>
                <img src={images.account} alt="account" />
              </div>
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
          
          <span className={cx('account-mobile')} onClick={handleAccountClick}>
            <FontAwesomeIcon icon={['far', 'user']} />
          </span>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} />
    </div>
  );
};

export default Header;
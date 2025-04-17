// AdminLayout.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Book, 
  PlusCircle, 
  ListFilter, 
  UserRound, 
  Users, 
  Tag, 
  FileText, 
  ShoppingCart,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Search,
  Bell
} from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [booksSectionOpen, setBooksSectionOpen] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleBooksSection = () => {
    setBooksSectionOpen(!booksSectionOpen);
  };

  const isActive = (path: string) => {
    if (path === '/admin' && currentPath === '/admin') {
      return true;
    }
    if (path !== '/admin' && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className={cx('layout')}>
      {/* Sidebar - Mobile overlay */}
      <div className={cx('mobile-overlay', { 'open': isMenuOpen })}>
        <div className={cx('overlay-background')} onClick={() => setIsMenuOpen(false)}></div>
      </div>

      {/* Sidebar */}
      <div className={cx('sidebar', { 'open': isMenuOpen })}>
        <div className={cx('sidebar-header')}>
          <div className={cx('sidebar-logo')}>
            <Book size={24} />
            <span className={cx('sidebar-title')}>Book Admin</span>
          </div>
          <button className={cx('close-button')} onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className={cx('sidebar-nav')}>
          <ul className={cx('nav-list')}>
            <li>
              <Link 
                to="/admin" 
                className={cx('nav-item', { 'active': isActive('/admin') })}
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard size={18} className={cx('nav-icon')} />
                Dashboard
              </Link>
            </li>
            <li className={cx('nav-section')}>
              <div className={cx('nav-section-header')} onClick={toggleBooksSection}>
                <span>BOOKS</span>
                <ChevronDown size={14} style={{ transform: booksSectionOpen ? 'rotate(180deg)' : 'none' }} />
              </div>
              {booksSectionOpen && (
                <ul className={cx('nav-sublist')}>
                  <li>
                    <Link 
                      to="/admin/books" 
                      className={cx('nav-item', { 'active': isActive('/admin/books') && !isActive('/admin/books/add') })}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ListFilter size={18} className={cx('nav-icon')} />
                      Book List
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/books/add" 
                      className={cx('nav-item', { 'active': isActive('/admin/books/add') })}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <PlusCircle size={18} className={cx('nav-icon')} />
                      Add Book
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link 
                to="/admin/authors" 
                className={cx('nav-item', { 'active': isActive('/admin/authors') })}
                onClick={() => setIsMenuOpen(false)}
              >
                <UserRound size={18} className={cx('nav-icon')} />
                Authors
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/publishers" 
                className={cx('nav-item', { 'active': isActive('/admin/publishers') })}
                onClick={() => setIsMenuOpen(false)}
              >
                <Users size={18} className={cx('nav-icon')} />
                Publishers
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/categories" 
                className={cx('nav-item', { 'active': isActive('/admin/categories') })}
                onClick={() => setIsMenuOpen(false)}
              >
                <Tag size={18} className={cx('nav-icon')} />
                Categories & Genres
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/blog" 
                className={cx('nav-item', { 'active': isActive('/admin/blog') })}
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText size={18} className={cx('nav-icon')} />
                Blog Posts
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/orders" 
                className={cx('nav-item', { 'active': isActive('/admin/orders') })}
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={18} className={cx('nav-icon')} />
                Orders
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                className={cx('nav-item', 'logout')}
                onClick={() => setIsMenuOpen(false)}
              >
                <LogOut size={18} className={cx('nav-icon')} />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={cx('main-wrapper')}>
        {/* Header */}
        <header className={cx('header')}>
          <div className={cx('header-content')}>
            <button className={cx('menu-button')} onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className={cx('search-bar')}>
              <span className={cx('search-icon')}>
                <Search size={18} />
              </span>
              <input type="text" placeholder="Search..." className={cx('search-input')} />
            </div>
            <div className={cx('header-actions')}>
              <a href="#" className={cx('notification-button')}>
                <Bell size={20} />
              </a>
              <div className={cx('user-avatar')}>
                <img src="/api/placeholder/32/32" alt="User avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className={cx('main-content')}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
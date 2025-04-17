import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './HomeBook.module.scss'
import Header from '~/components/Header'
import ProductCard from '~/components/ProductCard'
import Footer from '~/components/Footer'
import StarRating from '~/components/StarRating'
import BreadCumb from '~/components/BreadCumb'
import { Link } from 'react-router-dom'
import * as productService from '~/services/productService'

const cx = classNames.bind(styles)

interface Book {
  id: number
  name: string
  price: number
  thumbnail_url: string
  rating_average: number
  quantity_sold?: {
    text: string
  }
  discount_rate: number
  badges_new?: Array<{
    icon: string | null
    text: string
  }>
}

interface Supplier {
  id: number
  name: string
}

interface HomeProps {
  books: Book[]
}

const Home: React.FC<HomeProps> = ({ books }) => {
  const [bookData, setCategoryBooks] = useState<Book[]>(books)
  const [checked, setChecked] = useState<number | null>(null)

  useEffect(() => {
    setCategoryBooks(books)
  }, [books])

  const chunkArray = <T,>(arr: T[], chunkSize: number): T[][] => {
    const chunkedArray: T[][] = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize))
    }
    return chunkedArray
  }

  const productListPC = chunkArray(bookData, 5)
  const productListTablet = chunkArray(bookData, 3)

  const suppliersMockData: Supplier[] = [
    { id: 53660, name: 'Nhà sách Fahasa' },
    { id: 281062, name: 'Bamboo Books' },
    { id: 127989, name: 'Time Books' },
    { id: 161219, name: 'Nhà sách trẻ online' },
    { id: 60209, name: 'VBooks' }
  ]

  const handleSelectedChange = async (supplierId: number) => {
    setChecked(supplierId)
    const result = await productService.supplier(supplierId)
    if (result && result.data) {
      setCategoryBooks(result.data)
    }
  }

  console.log(bookData);
  return (
    <div className={cx('wrapper')}>
      <Header />
      <BreadCumb />
      <div className="custom-container-xxl">
        <div className={cx('content')}>
          <div className="row">
            <div className="col-lg-2 d-none d-lg-block">
              <div className={cx('category')}>
                <div className={cx('category-product')}>
                  <h2 className={cx('title')}>Danh Mục Sản Phẩm</h2>
                  <ul className={cx('product-list')}>
                    <li className={cx('product')}>
                      <Link to="/category/sach-tieng-anh">English Books</Link>
                    </li>
                    <li className={cx('product')}>
                      <Link to="/category/sach-truyen-tieng-viet">Sách tiếng Việt</Link>
                    </li>
                    <li className={cx('product')}>
                      <Link to="/category/van-phong-pham">Văn phòng phẩm</Link>
                    </li>
                    <li className={cx('product')}>
                      <Link to="/category/qua-luu-niem">Quà lưu niệm</Link>
                    </li>
                  </ul>
                </div>
                <div className={cx('supplier')}>
                  <h2 className={cx('title')}>Nhà cung cấp</h2>
                  {suppliersMockData.map(supplier => (
                    <div className="form-check" key={supplier.id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={supplier.name}
                        id={supplier.id.toString()}
                        checked={checked === supplier.id}
                        onChange={() => handleSelectedChange(supplier.id)}
                      />
                      <label className="form-check-label" htmlFor={supplier.id.toString()}>
                        {supplier.name}
                      </label>
                    </div>
                  ))}
                  <span className={cx('more-btn')}>
                    Xem thêm
                    <FontAwesomeIcon className={cx('more-icon')} icon={faChevronDown} />
                  </span>
                </div>
                <div className={cx('rating')}>
                  <h2 className={cx('title')}>Đánh giá</h2>
                  <div className={cx('star')}>
                    <div className={cx('star-wrapper')}>
                      <StarRating rating={5} large />
                      <span>Từ 5 sao</span>
                    </div>
                    <div className={cx('star-wrapper')}>
                      <StarRating rating={4} large />
                      <span>Từ 4 sao</span>
                    </div>
                    <div className={cx('star-wrapper')}>
                      <StarRating rating={3} large />
                      <span>Từ 3 sao</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PC */}
            <div className="col-lg-10 d-md-none d-sm-none d-none d-lg-block">
              {productListPC.map((rowProduct, index) => (
                <div className="row g-3 mb-3" key={index}>
                  {rowProduct.map(result => (
                    <div className="col-lg-2-4" key={result.id}>
                      <div className={cx('product-card')}>
                        <ProductCard data={result} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Tablet */}
            <div className="col-md-12 d-none d-lg-none d-sm-none d-md-block">
              {productListTablet.map((rowProduct, index) => (
                <div className="row g-3 mb-3" key={index}>
                  {rowProduct.map(result => (
                    <div className="col-md-4" key={result.id}>
                      <div className={cx('product-card')}>
                        <ProductCard data={result} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Mobile */}
            <div className="col-sm-12 col-12 d-block d-sm-block d-md-none d-lg-none">
              <div className="row g-3 mb-3">
                {bookData.map(result => (
                  <div className="col-sm-6 col-6" key={result.id}>
                    <div className={cx('product-card')}>
                      <ProductCard data={result} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pagination */}
            <div className="custom-container-xxl">
              <ul className={cx('pagination', 'd-xxl-flex d-xl-flex d-lg-flex d-md-none d-none')}>
                {[1, 2, 3, 4, 5, 50].map(page => (
                  <li className={cx('pagination-item')} key={page}>
                    <a href="/" className={cx('pagination-item-link', { active: page === 1 })}>
                      {page}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

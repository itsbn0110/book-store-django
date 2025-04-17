import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '~/redux/cartSlice'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast, ToastContainer } from 'react-toastify'
import CustomToast from '~/components/CustomToast'
import 'react-toastify/dist/ReactToastify.css'
import {
  faCartShopping,
  faChevronLeft,
  faEllipsis,
  faMinus,
  faPlus,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

import styles from './MyPageBookDetail.module.scss'
import Header from '~/components/Header'
import images from '~/assets/images'
import { formatCurrency } from '~/utils'

import Footer from '~/components/Footer'
import StarRating from '~/components/StarRating'
import BreadCumb from '~/components/BreadCumb'

const cx = classNames.bind(styles)

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

interface BookDetail {
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

// This interface is for enhanced display data (combining your API data with placeholder values)
interface EnhancedBookDetail extends BookDetail {
  rating_average: number;
  review_text: string;
  all_time_quantity_sold: number;
  discount_rate: number;
  specifications: Array<{
    attributes: Array<{
      name: string;
      value: string;
    }>;
  }>;
  highlight?: {
    items: string[];
  };
}

const MyPageBookDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [bookDetail, setBookDetail] = useState<EnhancedBookDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`)
        const data = await response.json()
        
        // Convert string price to number and create enhanced data with placeholders
        const numericPrice = parseFloat(data.price) || 123
        
        // Create enhanced data with placeholders for missing fields
        const enhancedData: EnhancedBookDetail = {
          ...data,
          rating_average: 4.8,  // Random placeholder
          review_text: `${Math.floor(Math.random() * 2000) + 100} đánh giá`,
          all_time_quantity_sold: Math.floor(Math.random() * 5000) + 500,
          discount_rate: Math.floor(Math.random() * 30) + 5,
          specifications: [
            {
              attributes: [
                { name: 'Công ty phát hành', value: data.publisher_objs[0]?.name || 'Nhà xuất bản' },
                { name: 'Ngày xuất bản', value: data.published_date || '2024-01-01' },
                { name: 'Kích thước', value: '13x20.5cm' },
                { name: 'Dịch Giả', value: data.author_objs[0]?.name || 'Tác giả' },
                { name: 'Loại bìa', value: 'Bìa mềm' },
                { name: 'Số trang', value: `${Math.floor(Math.random() * 500) + 100}` },
                { name: 'Nhà xuất bản', value: data.publisher_objs[0]?.name || 'Nhà xuất bản' }
              ]
            }
          ],
          highlight: {
            items: [
              'Sách chất lượng từ nhà xuất bản uy tín',
              `Tác giả: ${data.author_objs[0]?.name || 'Tác giả'}`,
              `Thể loại: ${data.category_objs[0]?.name || 'Thể loại'}`
            ]
          }
        }
        
        setBookDetail(enhancedData)
        setPrice(numericPrice)
      } catch (error) {
        console.error('Error fetching book detail:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetail()
  }, [id])

  if (loading) {
    return <div className="text-center py-5">Đang tải...</div>
  }

  if (!bookDetail) {
    return <h2 className="text-center py-5">Không tìm thấy sách!</h2>
  }

  const updatePrice = () => {
    const initialPrice = parseFloat(bookDetail.price)
    setPrice(prevPrice => prevPrice + initialPrice)
    setQuantity(prevQuantity => prevQuantity + 1)
    setIsDisabled(false)
  }

  const minusPrice = () => {
    const initialPrice = parseFloat(bookDetail.price)
    setPrice(prevPrice => (prevPrice > initialPrice ? prevPrice - initialPrice : prevPrice))
    setQuantity(prevQuantity => {
      if (prevQuantity <= 1) return prevQuantity
      if (prevQuantity === 2) setIsDisabled(true)
      return prevQuantity - 1
    })
  }

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    const initialPrice = parseFloat(bookDetail.price)
    
    if (isNaN(value) || value <= 0) {
      setQuantity(1)
      setPrice(initialPrice)
      setIsDisabled(true)
      return
    }
    setQuantity(value)
    setPrice(initialPrice * value)
    setIsDisabled(value === 1)
  }

  const handleAddToCart = () => {
    if (!bookDetail) return
    
    const bookData = {
      id: bookDetail.id,
      price: parseFloat(bookDetail.price),
      thumbnail_url: bookDetail.image,
      quantity: quantity,
      name: bookDetail.title,
    }
    
    dispatch(addItem(bookData))
    toast.success(<CustomToast />)
  }

  return (
    <>
      <div className={cx('wrapper', 'd-xxl-block d-md-block d-lg-block d-xl-block d-none')}>
        <Header />
        <BreadCumb />

        <div className="custom-container-xxl">
          <div className={cx('main')}>
            <div className={cx('sidebar-wrapper')}>
              <div className={cx('sidebar')}>
                <div className={cx('image-wrapper')}>
                  <img className={cx('image')} src={bookDetail.image} alt="product" />
                  <div className={cx('slider')}>
                    <a href="#image">
                      <img className={cx('slider-img')} src={images.slider01} alt="hello" />
                    </a>
                    <a href="#image">
                      <img className={cx('slider-img')} src={images.slider02} alt="hello" />
                    </a>
                    <a href="#image">
                      <img className={cx('slider-img')} src={images.slider03} alt="hello" />
                    </a>
                    <a href="#image">
                      <img className={cx('slider-img')} src={images.slider04} alt="hello" />
                    </a>
                    <a href="#image">
                      <img className={cx('slider-img')} src={images.slider05} alt="hello" />
                    </a>
                    <a href="#image">
                      <img className={cx('slider-img')} src={images.slider06} alt="hello" />
                    </a>
                  </div>
                </div>

                <div className={cx('highlight')}>
                  {bookDetail.highlight && bookDetail.highlight.items && (
                    <div className={cx('highlight-title')}>Đặc điểm nổi bật</div>
                  )}
                  <div className={cx('highlight-list')}>
                    {bookDetail.highlight &&
                      bookDetail.highlight.items &&
                      bookDetail.highlight.items.map((hl, index) => (
                        <div className={cx('highlight-body')} key={index}>
                          <img
                            width="16"
                            height="16"
                            src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                            alt="blue-check"
                          />
                          <div className={cx('highlight-info')}>{hl}</div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className={cx('summorize')}>
                  <div className={cx('summorize-body')}>
                    <img
                      src="https://salt.tikicdn.com/ts/ta/d3/d4/1c/1d4ee6bf8bc9c5795529ac50a6b439dd.png"
                      alt="icon-left"
                      width="24"
                      height="24"
                    />
                    <div className={cx('summorize-text')}>
                      <span className={cx('more')}>Xem thêm</span>
                      <span className={cx('summorize-content')}> Tóm tắt nội dung sách</span>
                    </div>
                  </div>
                  <FontAwesomeIcon className={cx('summorize-icon')} icon={faChevronRight} />
                </div>
              </div>
            </div>
            <div className={cx('content')}>
              <div className={cx('info')}>
                <div className={cx('intro')}>
                  <div className={cx('author')}>
                    <span className={cx('author-label')}>Tác giả:</span>
                    <span className={cx('author-link')}>
                      <a href="/">
                        {bookDetail.author_objs && bookDetail.author_objs[0]?.name}
                      </a>
                    </span>
                  </div>
                  <h3 className={cx('title')}>{bookDetail.title}</h3>
                  <div className={cx('rating')}>
                    <div className={cx('rating-wrapper')}>
                      <span className={cx('rating-average')}>
                        {bookDetail.rating_average}
                      </span>
                      <span className={cx('star')}>
                        <StarRating rating={5} large />
                      </span>

                      <span className={cx('review-count')}>{bookDetail.review_text}</span>
                    </div>

                    <span className={cx('sold')}>
                      <span className={cx('separate')}></span>

                      <span className={cx('sold-text')}>
                        {bookDetail.all_time_quantity_sold <= 5000
                          ? `Đã bán ${bookDetail.all_time_quantity_sold}`
                          : 'Đã bán 5000+'}
                      </span>
                    </span>
                  </div>
                  <div className={cx('price')}>
                    <span className={cx('priceVND')}>
                      {formatCurrency(parseFloat(bookDetail.price))}
                      <sup>₫</sup>
                    </span>
                    <span className={cx('discount')}>-{bookDetail.discount_rate}%</span>
                  </div>
                </div>
              </div>
              <div className={cx('info-detail')}>
                <h4 className={cx('info-title')}> Thông tin chi tiết</h4>
                {bookDetail.specifications &&
                  bookDetail.specifications.map((item, specIndex) =>
                    item.attributes.map((attribute, attrIndex) => (
                      <div className={cx('detail')} key={`${specIndex}-${attrIndex}`}>
                        <span className={cx('detail-left')}>{attribute.name}</span>
                        <span className={cx('detail-right')}>{attribute.value}</span>
                      </div>
                    )),
                  )}
              </div>
              <div className={cx('description')}>
                <h4 className={cx('info-title')}> Mô tả sản phẩm</h4>
                <div className={cx('description-wrapper')}>
                  <div dangerouslySetInnerHTML={{ __html: bookDetail.description }} />
                </div>
              </div>
            </div>
            <div className={cx('pay-wrapper')}>
              <div className={cx('pay')}>
                <div className={cx('quantity-input')}>
                  <h4 className={cx('info-title')}> Số lượng </h4>
                  <div className={cx('group-input')}>
                    <button
                      className={cx('minus', {
                        isDisabled: isDisabled,
                      })}
                      onClick={minusPrice}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      className={cx('input')}
                      type="text"
                      value={quantity}
                      onChange={handleChangeQuantity}
                    />
                    <button className={cx('plus')} onClick={updatePrice}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                <div className={cx('price-container')}>
                  <h4 className={cx('info-title')}> Tạm tính </h4>

                  <span className={cx('price-pay')}>
                    {formatCurrency(price)}
                    <sup>₫</sup>
                  </span>
                </div>

                <div className={cx('group-button')}>
                  <button className={cx('button', 'btn--primary')}>Mua ngay</button>
                  <button
                    className={cx('button', 'btn--normal')}
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ
                  </button>
                  <button className={cx('button', 'btn--normal')}>Mua trước trả sau</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx('footer', ' d-xxl-block d-md-none d-lg-block d-xl-block')}>
          <Footer />
        </div>
      </div>

      <div className={cx('wrapper-mobile', 'd-xxl-none d-md-none d-lg-none d-xl-none d-block')}>
        <div className={cx('product-detail')}>
          <header className={cx('header-detail-mobile')}>
            <Link to="/">
              <span className={cx('icon-boundary')}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
            </Link>

            <div className={cx('icon-wrapper')}>
              <span className={cx('icon-boundary', 'me-4')}>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <span className={cx('icon-boundary')}>
                <FontAwesomeIcon icon={faEllipsis} />
              </span>
            </div>
          </header>
          <div className={cx('img-wrapper')}>
            <img className={cx('detail-img')} src={bookDetail.image} alt="product" />
          </div>
          <div className={cx('intro', 'p-4 bg-white')}>
            <div className="d-flex flex-column gap-1">
              <div className={cx('author')}>
                <span className={cx('author-label', 'm-0')}>Tác giả:</span>
                <span className={cx('author-link')}>
                  <a href="/">
                    {bookDetail.author_objs && bookDetail.author_objs[0]?.name}
                  </a>
                </span>
              </div>
              <h3 className={cx('title', 'fs-3 fw-normal')}>{bookDetail.title}</h3>
              <div className={cx('rating', 'fs-5 d-flex align-items-center')}>
                <div className={cx('rating-wrapper', 'fs-5')}>
                  <span className={cx('rating-average')}>{bookDetail.rating_average}</span>
                  <span className={cx('star', 'm-0')}>
                    <StarRating rating={5} large />
                  </span>

                  <span className={cx('review-count', 'fs-5')}>{bookDetail.review_text}</span>
                </div>

                <span className={cx('sold', 'fs-5')}>
                  <span className={cx('separate')}></span>

                  <span className={cx('sold-text')}>
                    {bookDetail.all_time_quantity_sold <= 5000
                      ? `Đã bán ${bookDetail.all_time_quantity_sold}`
                      : 'Đã bán 5000+'}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={cx('highlight', 'pb-3 bg-white')}>
            {bookDetail.highlight?.items?.length > 0 && (
              <div className={cx('highlight-title', 'fs-4')}>Đặc điểm nổi bật</div>
            )}
            <div className={cx('highlight-list')}>
              {bookDetail.highlight?.items?.map((hl, index) => (
                <div className={cx('highlight-body')} key={index}>
                  <img
                    width="16"
                    height="16"
                    src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                    alt="blue-check"
                  />
                  <div className={cx('highlight-info', 'fs-5')}>{hl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={cx('summorize', 'position-static bg-white pb-4')}>
            <div className={cx('summorize-body')}>
              <img
                src="https://salt.tikicdn.com/ts/ta/d3/d4/1c/1d4ee6bf8bc9c5795529ac50a6b439dd.png"
                alt="icon-left"
                width="24"
                height="24"
              />
              <div className={cx('summorize-text')}>
                <span className={cx('more')}>Xem thêm</span>
                <span className={cx('summorize-content')}> Tóm tắt nội dung sách</span>
              </div>
            </div>
            <FontAwesomeIcon className={cx('summorize-icon', 'fs-5')} icon={faChevronRight} />
          </div>

          <div className={cx('group-button', 'p-4 bg-white my-3')}>
            <button className={cx('button', 'btn--primary', 'fs-4')}>Mua ngay không cần đăng nhập</button>
            <button 
              className={cx('button', 'btn--normal', 'fs-4')}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        className={cx('toast-message')}
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default MyPageBookDetail
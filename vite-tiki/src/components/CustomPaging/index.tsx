import { FC } from 'react'
import Slider, { Settings } from 'react-slick'
import images from '~/assets/images'
import './CustomPaging.scss'

const CustomPaging: FC = () => {
  const settings: Settings = {
    customPaging: function (i: number) {
      return (
        <a href="/">
          <img src={images.slider01} alt={`Slide ${i + 1}`} />
        </a>
      )
    },
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  }

  return (
    <div className="slider-container" style={{ display: 'flex' }}>
      <Slider {...settings}>
        <div>
          <img src={images.slider01} alt="Slide 1" />
        </div>
        <div>
          <img src={images.slider02} alt="Slide 2" />
        </div>
        <div>
          <img src={images.slider03} alt="Slide 3" />
        </div>
        <div>
          <img src={images.slider04} alt="Slide 4" />
        </div>
        <div>
          <img src={images.slider05} alt="Slide 5" />
        </div>
        <div>
          <img src={images.slider06} alt="Slide 6" />
        </div>
        <div>
          <img src={images.slider07} alt="Slide 7" />
        </div>
        <div>
          <img src={images.slider08} alt="Slide 8" />
        </div>
        <div>
          <img src={images.slider09} alt="Slide 9" />
        </div>
        <div>
          <img src={images.slider10} alt="Slide 10" />
        </div>
      </Slider>
    </div>
  )
}

export default CustomPaging

interface Images {
  [key: string]: string;
}

const images: Images = {
  slider01: new URL('./slider1.png', import.meta.url).href,
  slider02: new URL('./slider2.png', import.meta.url).href,
  slider03: new URL('./slider3.png', import.meta.url).href,
  slider04: new URL('./slider4.png', import.meta.url).href,
  slider05: new URL('./slider5.png', import.meta.url).href,
  slider06: new URL('./slider6.png', import.meta.url).href,
  slider07: new URL('./slider7.png', import.meta.url).href,
  slider08: new URL('./slider8.png', import.meta.url).href,
  slider09: new URL('./slider9.png', import.meta.url).href,
  slider10: new URL('./slider10.png', import.meta.url).href,
  logo: new URL('./logo-tiki.png', import.meta.url).href,
  home: new URL('./home-icon.png', import.meta.url).href,
  account: new URL('./account-icon.png', import.meta.url).href,
  search: new URL('./search-icon.png', import.meta.url).href,
  cart: new URL('./cart-icon.png', import.meta.url).href,
  searchItem: new URL('./searchitem.png', import.meta.url).href,
  tikiLogin : new URL('./tiki_login.png', import.meta.url).href,
} 

export default images

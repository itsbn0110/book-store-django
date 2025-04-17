export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  authIcon?: Array<{
    icon: string;
    icon_width: number;
    icon_height: number;
  }>;
  badgesNew_v2?: {
    text: string;
  };
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

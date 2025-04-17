export interface ProductResponse {
  data: {
    id: number;
    name: string;
    price: number;
    thumbnail_url: string;
    rating_average: number;
    quantity_sold?: {
      text: string;
    };
    discount_rate: number;
    badges_new?: Array<{
      icon: string | null;
      text: string;
    }>;
  }[];
}

export interface BookDetailResponse {
  id: number;
  name: string;
  price: number;
  thumbnail_url: string;
  description: string;
  authors?: Array<{
    name: string;
  }>;
  rating_average: number;
  review_text?: string;
  all_time_quantity_sold: number;
  discount_rate: number;
  specifications?: Array<{
    attributes: Array<{
      name: string;
      value: string;
    }>;
  }>;
}


export interface Author {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Book {
  id?: number; 
  title: string;
  original_title?: string
  description?: string; 
  price: number;
  author: number | null;
  publisher: number | null;
  categories: number[];
  published_date?: string 
  image?: string 
}
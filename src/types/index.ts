export type ProductCategory = string;

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}
export type OrderStatus = 'PENDIENTE_PAGO' | 'PAGADO' | 'EN_PREPARACION' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  ingredients: string;
  origin: string;
  tasting_notes: string;
  price: number;
  weight_grams: number;
  category: ProductCategory;
  stock: number;
  is_featured: boolean;
  images: string[];
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  order_number: number;
  customer_name: string;
  customer_phone: string;
  address: string;
  city: string;
  district: string;
  reference?: string;
  payment_method: 'YAPE';
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name_snapshot: string;
  unit_price_snapshot: number;
  quantity: number;
  subtotal: number;
}

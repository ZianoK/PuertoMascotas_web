const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface Category {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  product_count: number;
}

export interface Product {
  id: number;
  code: string | null;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  cost: number;
  stock: number;
  category_id: number;
  image_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string | null;
  category: Category;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface OrderCreate {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  payment_method: string;
  notes?: string;
  items: OrderItem[];
}

export interface OrderItemWithProduct {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  product: Product;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  payment_method: string;
  status: string;
  notes: string | null;
  preference_id: string | null;
  mp_init_point: string | null;
  created_at: string;
  updated_at: string | null;
  items: OrderItemWithProduct[];
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Error desconocido" }));
    throw new Error(error.detail || `Error: ${response.status}`);
  }
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories/`, { cache: 'no-store' });
  return handleResponse<Category[]>(response);
}

export async function getProducts(categorySlug?: string, search?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (categorySlug) params.append("category_slug", categorySlug);
  if (search) params.append("search", search);

  const url = `${API_URL}/api/products/${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await fetch(url, { cache: 'no-store' });
  return handleResponse<Product[]>(response);
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${id}/`, { cache: 'no-store' });
  return handleResponse<Product>(response);
}

export interface StockCheckResult {
  product_id: number;
  available: boolean;
  stock: number;
  requested: number;
  name: string;
}

export async function checkStock(items: { product_id: number; quantity: number }[]): Promise<StockCheckResult[]> {
  const response = await fetch(`${API_URL}/api/products/check-stock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  return handleResponse<StockCheckResult[]>(response);
}

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/api/orders/`);
  return handleResponse<Order[]>(response);
}

export async function updateOrderStatus(id: number, status: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/orders/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return handleResponse<any>(response);
}

export async function createOrder(orderData: OrderCreate): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  return handleResponse<Order>(response);
}

export async function getOrder(id: number): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/${id}/`);
  return handleResponse<Order>(response);
}

// Banners API
export interface Banner {
  id: number;
  image_url: string;
  title: string | null;
  active: boolean;
  created_at: string;
}

export async function getBanners(): Promise<Banner[]> {
  const response = await fetch(`${API_URL}/api/banners/`);
  return handleResponse<Banner[]>(response);
}

export async function uploadBanner(file: File): Promise<Banner> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${API_URL}/admin/banners/`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<Banner>(response);
}

export async function deleteBanner(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/admin/banners/${id}/`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}

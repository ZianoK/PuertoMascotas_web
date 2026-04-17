const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Category {
  id: number;
  name: string;
  slug: string;
  active: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
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
  created_at: string;
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
  const response = await fetch(`${API_URL}/api/categories`);
  return handleResponse<Category[]>(response);
}

export async function getProducts(categorySlug?: string, search?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (categorySlug) params.append("category_slug", categorySlug);
  if (search) params.append("search", search);

  const url = `${API_URL}/api/products${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await fetch(url);
  return handleResponse<Product[]>(response);
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${id}`);
  return handleResponse<Product>(response);
}

export async function createOrder(orderData: OrderCreate): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  return handleResponse<Order>(response);
}

export async function getOrder(id: number): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/${id}`);
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
  const response = await fetch(`${API_URL}/api/banners`);
  return handleResponse<Banner[]>(response);
}

export async function uploadBanner(file: File): Promise<Banner> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${API_URL}/admin/banners`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<Banner>(response);
}

export async function deleteBanner(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/admin/banners/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}

// Admin Products API
export interface AdminProduct {
  id: number;
  name: string;
  price: number;
  original_price: number | null;
  stock: number;
  category: string;
}

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const response = await fetch(`${API_URL}/admin/products`);
  return handleResponse<AdminProduct[]>(response);
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}

export async function applyProductDiscount(id: number, newPrice: number): Promise<any> {
  const response = await fetch(`${API_URL}/admin/products/${id}/discount`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ new_price: newPrice }),
  });
  return handleResponse<any>(response);
}

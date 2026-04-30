const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      window.location.href = "/login";
    }
    throw new Error("Sesion expirada");
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Error desconocido" }));
    throw new Error(error.detail || `Error: ${response.status}`);
  }
  return response.json();
}

// ---- Auth ----

export async function adminLogin(email: string, password: string): Promise<{ access_token: string; name: string }> {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

// ---- Admin Products ----

export interface AdminProduct {
  id: number;
  code: string;
  name: string;
  price: number;
  original_price: number | null;
  stock: number;
  category: string;
}

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const response = await fetch(`${API_URL}/admin/products/`, { headers: authHeaders() });
  return handleResponse<AdminProduct[]>(response);
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/admin/products/${id}/`, { method: "DELETE", headers: authHeaders() });
  return handleResponse<void>(response);
}

export async function updateProductStock(id: number, stock: number): Promise<any> {
  const response = await fetch(`${API_URL}/admin/products/${id}/stock/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ stock }),
  });
  return handleResponse<any>(response);
}

export async function applyProductDiscount(id: number, newPrice: number): Promise<any> {
  const response = await fetch(`${API_URL}/admin/products/${id}/discount/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ new_price: newPrice }),
  });
  return handleResponse<any>(response);
}

export async function uploadCatalog(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${API_URL}/admin/products/upload`, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });
  return handleResponse<any>(response);
}

// ---- Banners ----

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
  const response = await fetch(`${API_URL}/admin/banners/`, { method: "POST", headers: authHeaders(), body: formData });
  return handleResponse<Banner>(response);
}

export async function deleteBanner(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/admin/banners/${id}/`, { method: "DELETE", headers: authHeaders() });
  return handleResponse<void>(response);
}

// ---- Orders ----

export interface Product {
  id: number;
  name: string;
  price: number;
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

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/api/orders/`, { headers: authHeaders() });
  return handleResponse<Order[]>(response);
}

export async function updateOrderStatus(id: number, status: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/orders/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ status }),
  });
  return handleResponse<any>(response);
}

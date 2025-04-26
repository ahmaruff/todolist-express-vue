// src/lib/http.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Fungsi helper HTTP
export async function http<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,  // Menggunakan opsi tambahan seperti method, body, dll.
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, // untuk menambahkan header lain jika diperlukan
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

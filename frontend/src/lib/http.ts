export async function http<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Unknown error');
    }
  
    return response.json();
  }
  
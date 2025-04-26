import { http } from "../../../lib/http";

export interface Todo {
  id: string;
  description: string;
  completedAt: null|string;
  createdAt: null|string;
}

interface FilterParams {
    search?: string;
    completed?: boolean;
    start_date?: string;
    end_date?: string;
}

export async function getTodos(filters: FilterParams = {}): Promise<Todo[]> {
    // Build query string from filters
    const queryParams = new URLSearchParams();

    if (filters.search) queryParams.append('search', filters.search);
    if (filters.completed !== undefined) queryParams.append('completed', String(filters.completed));
    if (filters.start_date) queryParams.append('start_date', filters.start_date);
    if (filters.end_date) queryParams.append('end_date', filters.end_date);

    const url = `/todos?${queryParams.toString()}`;
    const res = await http<{data: Todo[]}>(url, {
        method: 'GET'
    });

    return res.data;
}

export async function getTodo(id: string): Promise<Todo> {
    const res = await http<{data: Todo}>(`/todos/${id}`, {
        method: 'GET'
    });

    return res.data;
}

export async function completeTodo(id: string): Promise<Todo> {
    const res = await http<{data: Todo}>(`/todos/${id}/complete`, {
        method: 'PATCH'
    });

    return res.data;
}

export async function deleteTodo(id: string): Promise<null> {
    const res = await http<{data: null}>(`todos/${id}`, {
        method: 'DELETE'
    });

    return res.data;
}

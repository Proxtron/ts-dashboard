

export const apiClient = async <T = any>(url: string, options?: RequestInit): Promise<T>  => {
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const body = await response.json();
        return body;
    } catch(error) {
        throw error;
    }
}
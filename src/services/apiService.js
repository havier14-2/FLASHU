const API_BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `Error HTTP: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    }
    return null;
};

// --- AUTH ---
export const login = (credentials) => {
    return fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    }).then(handleResponse);
};

// --- PRODUCTOS ---
export const getProducts = (page = 0, size = 5, nombre = '', categoriaId = null, stockMenorA = null) => {
    const params = new URLSearchParams({ page, size, nombre });
    if (categoriaId) {
        params.append('categoriaId', categoriaId);
    }
    if (stockMenorA !== null) { // <-- LÓGICA AÑADIDA
        params.append('stockMenorA', stockMenorA);
    }
    return fetch(`${API_BASE_URL}/productos?${params.toString()}`, { cache: 'no-cache' }).then(handleResponse);
};

export const getProductById = (id) => fetch(`${API_BASE_URL}/productos/${id}`, { cache: 'no-cache' }).then(handleResponse);

export const createProduct = (productData, imageFile) => {
    const formData = new FormData();
    formData.append('producto', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    if (imageFile) {
        formData.append('imagen', imageFile);
    }
    return fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        body: formData,
    }).then(handleResponse);
};

export const updateProduct = (id, productData, imageFile) => {
    const formData = new FormData();
    formData.append('producto', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    if (imageFile) {
        formData.append('imagen', imageFile);
    }
    return fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'PUT',
        body: formData,
    }).then(handleResponse);
};

export const deactivateProduct = (id) => {
    return fetch(`${API_BASE_URL}/productos/${id}/desactivar`, {
        method: 'PATCH',
    }).then(handleResponse);
};

export const activateProduct = (id) => {
    return fetch(`${API_BASE_URL}/productos/${id}/activar`, {
        method: 'PATCH',
    }).then(handleResponse);
};

export const deleteProduct = (id) => {
    return fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'DELETE',
    }).then(handleResponse);
};

// --- CATEGORÍAS ---
export const getCategories = () => fetch(`${API_BASE_URL}/categorias`, { cache: 'no-cache' }).then(handleResponse);

// --- USUARIOS ---
export const getUsers = () => fetch(`${API_BASE_URL}/usuarios`, { cache: 'no-cache' }).then(handleResponse);

export const getUserById = (id) => {
    return fetch(`${API_BASE_URL}/usuarios/${id}`, { cache: 'no-cache' }).then(handleResponse);
};

export const createUser = (userData) => {
    return fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    }).then(handleResponse);
};

export const updateUser = (id, userData) => {
    return fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    }).then(handleResponse);
};

export const deleteUser = (id) => {
    return fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'DELETE',
    }).then(handleResponse);
};

export const toggleUserStatus = (id) => {
    return fetch(`${API_BASE_URL}/usuarios/${id}/toggle-estado`, {
        method: 'PATCH',
    }).then(handleResponse);
};
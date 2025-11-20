const API_BASE_URL = 'http://localhost:8080/api';

// --- AYUDANTE: OBTENER TOKEN ---
const getAuthHeaders = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        if (user.token) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            };
        }
    }
    return { 'Content-Type': 'application/json' };
};

// --- AYUDANTE: MANEJAR RESPUESTA ---
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.text();
        if (response.status === 401 || response.status === 403) {
            console.error("Sesión expirada o sin permisos");
        }
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

// --- USUARIOS ---
export const getUsers = () => {
    return fetch(`${API_BASE_URL}/usuarios`, {
        method: 'GET',
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const getUserById = (id) => {
    return fetch(`${API_BASE_URL}/usuarios/${id}`, {
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const createUser = (userData) => {
    return fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
    }).then(handleResponse);
};

export const updateUser = (id, userData) => {
    return fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
    }).then(handleResponse);
};

export const deleteUser = (id) => {
    return fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

export const toggleUserStatus = (id) => {
    return fetch(`${API_BASE_URL}/usuarios/${id}/toggle-estado`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

// --- PRODUCTOS ---
export const getProducts = (page = 0, size = 5, nombre = '', categoriaId = null, stockMenorA = null) => {
    const params = new URLSearchParams({ page, size, nombre });
    if (categoriaId) params.append('categoriaId', categoriaId);
    if (stockMenorA !== null) params.append('stockMenorA', stockMenorA);
    
    return fetch(`${API_BASE_URL}/productos?${params.toString()}`, { 
        headers: getAuthHeaders() 
    }).then(handleResponse);
};

export const getProductById = (id) => {
    return fetch(`${API_BASE_URL}/productos/${id}`, {
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const createProduct = (productData, imageFile) => {
    const headers = getAuthHeaders();
    delete headers['Content-Type']; 
    
    const formData = new FormData();
    formData.append('producto', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    if (imageFile) {
        formData.append('imagen', imageFile);
    }

    return fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: headers,
        body: formData,
    }).then(handleResponse);
};

export const updateProduct = (id, productData, imageFile) => {
    const headers = getAuthHeaders();
    delete headers['Content-Type'];

    const formData = new FormData();
    formData.append('producto', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    if (imageFile) {
        formData.append('imagen', imageFile);
    }

    return fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'PUT',
        headers: headers,
        body: formData,
    }).then(handleResponse);
};

export const deactivateProduct = (id) => fetch(`${API_BASE_URL}/productos/${id}/desactivar`, { method: 'PATCH', headers: getAuthHeaders() }).then(handleResponse);
export const activateProduct = (id) => fetch(`${API_BASE_URL}/productos/${id}/activar`, { method: 'PATCH', headers: getAuthHeaders() }).then(handleResponse);
export const deleteProduct = (id) => fetch(`${API_BASE_URL}/productos/${id}`, { method: 'DELETE', headers: getAuthHeaders() }).then(handleResponse);

// --- CATEGORÍAS Y REGIONES ---
export const getCategories = () => fetch(`${API_BASE_URL}/categorias`, { headers: getAuthHeaders() }).then(handleResponse);
export const getRegiones = () => fetch(`${API_BASE_URL}/regiones`).then(handleResponse);
export const getComunas = (regionId) => fetch(`${API_BASE_URL}/regiones/${regionId}/comunas`).then(handleResponse);

// --- VENTAS (ESTAS ERAN LAS QUE FALTABAN) ---
export const createVenta = (ventaData) => {
    return fetch(`${API_BASE_URL}/ventas`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ventaData),
    }).then(handleResponse);
};

export const getMyPurchases = () => {
    return fetch(`${API_BASE_URL}/ventas/mis-compras`, {
        method: 'GET',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};
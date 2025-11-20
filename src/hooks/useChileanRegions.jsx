import { useState, useEffect, useCallback } from 'react';
import { getRegiones, getComunas } from '../services/apiService'; // Importamos del servicio que ya tiene el token

export function useChileanRegions() {
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [loadingRegions, setLoadingRegions] = useState(true);
    const [loadingComunas, setLoadingComunas] = useState(false);

    // 1. Cargar Regiones desde TU Backend
    useEffect(() => {
        const fetchRegiones = async () => {
            try {
                const data = await getRegiones(); // Llama a localhost:8080/api/regiones
                setRegiones(data);
            } catch (error) {
                console.error("Error cargando regiones:", error);
            } finally {
                setLoadingRegions(false);
            }
        };
        fetchRegiones();
    }, []);

    // 2. Cargar Comunas desde TU Backend
    const fetchComunas = useCallback(async (regionId) => {
        if (!regionId) {
            setComunas([]);
            return;
        }
        setLoadingComunas(true);
        try {
            const data = await getComunas(regionId); // Llama a localhost:8080/api/regiones/{id}/comunas
            setComunas(data);
        } catch (error) {
            console.error("Error cargando comunas:", error);
            setComunas([]);
        } finally {
            setLoadingComunas(false);
        }
    }, []);

    return { regiones, comunas, loadingRegions, loadingComunas, fetchComunas };
}
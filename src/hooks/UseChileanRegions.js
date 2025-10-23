import { useState, useEffect, useCallback } from 'react';
import { getRegiones, getComunas } from '../services/apiService'; // <-- Usamos nuestro servicio

export function useChileanRegions() {
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [loadingRegions, setLoadingRegions] = useState(true);
    const [loadingComunas, setLoadingComunas] = useState(false);

    useEffect(() => {
        const fetchRegiones = async () => {
            try {
                const data = await getRegiones();
                setRegiones(data);
            } catch (error) {
                console.error("Error al cargar regiones desde nuestra API:", error);
            } finally {
                setLoadingRegions(false);
            }
        };
        fetchRegiones();
    }, []);

    const fetchComunas = useCallback(async (regionId) => {
        if (!regionId || regionId === "") {
            setComunas([]);
            return;
        }
        setLoadingComunas(true);
        try {
            const data = await getComunas(regionId);
            setComunas(data);
        } catch (error) {
            console.error("Error al cargar comunas desde nuestra API:", error);
            setComunas([]);
        } finally {
            setLoadingComunas(false);
        }
    }, []);

    return { regiones, comunas, loadingRegions, loadingComunas, fetchComunas };
}
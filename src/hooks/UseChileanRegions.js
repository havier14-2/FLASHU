import { useState, useEffect } from 'react';

const API_BASE = "https://apis.digital.gob.cl/dpa";

export function useChileanRegions() {
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [loadingRegions, setLoadingRegions] = useState(true);
    const [loadingComunas, setLoadingComunas] = useState(false);

    useEffect(() => {
        const fetchRegiones = async () => {
            try {
                const response = await fetch(`${API_BASE}/regiones`);
                if (!response.ok) throw new Error('Error al cargar regiones');
                const data = await response.json();
                setRegiones(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingRegions(false);
            }
        };
        fetchRegiones();
    }, []);

    const fetchComunas = async (regionCode) => {
        if (!regionCode || regionCode === "0") {
            setComunas([]);
            return;
        }
        setLoadingComunas(true);
        try {
            const response = await fetch(`${API_BASE}/regiones/${regionCode}/comunas`);
            if (!response.ok) throw new Error('Error al cargar comunas');
            const data = await response.json();
            setComunas(data);
        } catch (error) {
            console.error(error);
            setComunas([]);
        } finally {
            setLoadingComunas(false);
        }
    };

    return { regiones, comunas, loadingRegions, loadingComunas, fetchComunas };
}
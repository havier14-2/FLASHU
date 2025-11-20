package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.dto.ItemVentaDTO;
import com.Proyectop2.BackEndTienda.entities.Venta;
import java.util.List;

public interface VentaService {
    Venta generarVenta(String emailUsuario, List<ItemVentaDTO> items);
    List<Venta> obtenerVentasPorUsuario(String emailUsuario);
    List<Venta> obtenerTodasLasVentas(); // Para el admin dashboard
}
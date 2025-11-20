package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.dto.ItemVentaDTO;
import com.Proyectop2.BackEndTienda.entities.DetalleVenta;
import com.Proyectop2.BackEndTienda.entities.Producto;
import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.entities.Venta;
import com.Proyectop2.BackEndTienda.repositories.ProductoRepositories;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import com.Proyectop2.BackEndTienda.repositories.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class VentaServiceImpl implements VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private UsuarioRepositories usuarioRepository;

    @Autowired
    private ProductoRepositories productoRepository;

    @Override
    @Transactional // Importante: Si algo falla, revierte los cambios (como el stock)
    public Venta generarVenta(String emailUsuario, List<ItemVentaDTO> items) {
        
        // 1. Obtener usuario
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Venta venta = new Venta();
        venta.setUsuario(usuario);
        venta.setDetalles(new ArrayList<>());
        
        long totalVenta = 0;

        // 2. Procesar cada item del carrito
        for (ItemVentaDTO item : items) {
            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado ID: " + item.getProductoId()));

            // 3. Validar Stock
            if (producto.getStock() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            // 4. Reducir Stock
            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepository.save(producto);

            // 5. Crear Detalle
            DetalleVenta detalle = new DetalleVenta();
            detalle.setVenta(venta);
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            
            long subtotal = producto.getPrecio() * item.getCantidad();
            detalle.setSubtotal(subtotal);
            
            venta.getDetalles().add(detalle);
            totalVenta += subtotal;
        }

        venta.setTotal(totalVenta);

        // 6. Guardar Venta (por cascada guarda los detalles)
        return ventaRepository.save(venta);
    }

    @Override
    public List<Venta> obtenerVentasPorUsuario(String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return ventaRepository.findByUsuarioIdOrderByFechaDesc(usuario.getId());
    }

    @Override
    public List<Venta> obtenerTodasLasVentas() {
        return ventaRepository.findAll();
    }
}
package com.Proyectop2.BackEndTienda.controllers;

import com.Proyectop2.BackEndTienda.entities.DetalleVenta;
import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.entities.Venta;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import com.Proyectop2.BackEndTienda.repositories.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "http://localhost:5173")
public class VentaController {

    @Autowired
    private VentaRepository ventaRepository;
    
    @Autowired
    private UsuarioRepositories usuarioRepository;

    // 1. GUARDAR VENTA (Calculando IVA)
    @PostMapping
    public ResponseEntity<?> crearVenta(@RequestBody Map<String, Object> ventaData) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = usuarioRepository.findByEmail(auth.getName()).orElseThrow();

        Venta venta = new Venta();
        venta.setUsuario(usuario);
        
        // Cálculos de dinero
        Long total = Long.valueOf(ventaData.get("total").toString());
        long neto = Math.round(total / 1.19); // Cálculo inverso del IVA (Chile 19%)
        long iva = total - neto;

        venta.setTotal(total);
        venta.setMontoNeto(neto);
        venta.setMontoIva(iva);
        
        venta.setCantidadItems(Integer.parseInt(ventaData.get("cantidadItems").toString()));
        venta.setEstado("Emitida");

        // Procesar detalles (productos)
        List<Map<String, Object>> detallesMap = (List<Map<String, Object>>) ventaData.get("detalles");
        if (detallesMap != null) {
            for (Map<String, Object> det : detallesMap) {
                DetalleVenta detalle = new DetalleVenta();
                // Aquí deberías buscar el producto por ID real, por simplicidad lo asignamos así:
                // En un caso real, harías productoRepo.findById(...)
                // detalle.setProducto(...) 
                detalle.setCantidad((Integer) det.get("cantidad"));
                detalle.setVenta(venta);
                venta.getDetalles().add(detalle);
            }
        }

        return ResponseEntity.ok(ventaRepository.save(venta));
    }

    // 2. VER MIS COMPRAS (Cliente)
    @GetMapping("/mis-compras")
    public ResponseEntity<List<Venta>> misCompras() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = usuarioRepository.findByEmail(auth.getName()).orElseThrow();
        return ResponseEntity.ok(ventaRepository.findByUsuarioIdOrderByFechaDesc(usuario.getId()));
    }

    // 3. VER TODAS LAS VENTAS (Solo Admin)
    @GetMapping("/admin/todas")
    public ResponseEntity<List<Venta>> listarTodasLasVentas() {
        // Podríamos agregar @PreAuthorize("hasRole('ROLE_super-admin')") si la config lo permite
        return ResponseEntity.ok(ventaRepository.findAll());
    }
}
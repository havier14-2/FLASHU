package com.Proyectop2.BackEndTienda.controllers;

import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.entities.Venta;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import com.Proyectop2.BackEndTienda.repositories.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    // 1. GUARDAR VENTA (POST)
    @PostMapping
    public ResponseEntity<?> crearVenta(@RequestBody Map<String, Object> ventaData) {
        // Obtenemos el usuario logueado desde el Token
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();

        Venta venta = new Venta();
        venta.setUsuario(usuario);
        venta.setTotal(Long.valueOf(ventaData.get("total").toString()));
        venta.setCantidadItems((Integer) ventaData.get("cantidadItems"));
        venta.setEstado("Pagado");

        return ResponseEntity.ok(ventaRepository.save(venta));
    }

    // 2. VER MIS COMPRAS (GET)
    @GetMapping("/mis-compras")
    public ResponseEntity<List<Venta>> misCompras() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();

        // Buscamos solo las ventas de este usuario
        return ResponseEntity.ok(ventaRepository.findByUsuarioId(usuario.getId()));
    }
}
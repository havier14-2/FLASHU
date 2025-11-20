package com.Proyectop2.BackEndTienda.controllers;

import com.Proyectop2.BackEndTienda.dto.AuthResponse;
import com.Proyectop2.BackEndTienda.dto.LoginRequest;
import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import com.Proyectop2.BackEndTienda.security.JwtUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Autenticación")
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Permite conexión con React
public class AuthController {

    private final AuthenticationManager authManager;
    private final UsuarioRepositories usuarioRepo;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(AuthenticationManager authManager, UsuarioRepositories usuarioRepo, JwtUtils jwtUtils) {
        this.authManager = authManager;
        this.usuarioRepo = usuarioRepo;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        // 1. Autenticar usuario y contraseña (Si falla, lanza error 403/401)
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getContrasena())
        );

        // 2. Buscar los datos completos del usuario en la BD
        Usuario usuario = usuarioRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 3. Generar el Token
        String token = jwtUtils.generateToken(usuario.getEmail());

        // 4. Devolver el Token Y el ROL (Esto es lo que te faltaba)
        return ResponseEntity.ok(new AuthResponse(
                token,
                usuario.getNombre(),
                usuario.getRol(), // <--- Importante: Aquí va "super-admin" o "cliente"
                usuario.getEmail()
        ));
    }
}
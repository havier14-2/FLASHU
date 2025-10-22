package com.Proyectop2.BackEndTienda.controllers;

import com.Proyectop2.BackEndTienda.dto.LoginRequest;
import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.services.UsuarioServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Tag(name = "Autenticación", description = "Endpoint para el inicio de sesión de administradores.")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioServices usuarioService;

    @Operation(summary = "Iniciar sesión como administrador",
               description = "Valida las credenciales y, si son correctas y el rol es 'super-admin', devuelve los datos del usuario.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login exitoso",
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "401", description = "Credenciales inválidas o rol no autorizado",
                     content = @Content)
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.login(loginRequest.getEmail(), loginRequest.getContrasena());

        if (usuarioOpt.isPresent()) {
            return ResponseEntity.ok(usuarioOpt.get());
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas o rol no autorizado");
        }
    }
}
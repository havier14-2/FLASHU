package com.Proyectop2.BackEndTienda.controllers;

import com.Proyectop2.BackEndTienda.dto.UsuarioDTO;
import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.services.UsuarioServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Usuarios", description = "API para la gestión de usuarios.")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioRestController {

    @Autowired
    private UsuarioServices usuarioService;

    @Operation(summary = "Obtener todos los usuarios")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios retornada")
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.getAllUsuarios());
    }

    // --- ESTE ES EL MÉTODO QUE FALTABA ---
    @Operation(summary = "Obtener un usuario por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado", content = @Content(schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id)
                .map(ResponseEntity::ok) // Si lo encuentra, devuelve 200 OK con el usuario
                .orElse(ResponseEntity.notFound().build()); // Si no, devuelve 404 Not Found
    }
    // ------------------------------------

    @Operation(summary = "Crear un nuevo usuario")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario creado exitosamente", content = @Content(schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content)
    })
    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO) {
        // Mapeo de DTO a Entidad
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setContrasena(usuarioDTO.getContrasena());
        usuario.setRol(usuarioDTO.getRol());
        usuario.setEstado("activo");
        usuario.setRegion(usuarioDTO.getRegion());
        usuario.setComuna(usuarioDTO.getComuna());
        return ResponseEntity.ok(usuarioService.createUsuario(usuario));
    }

    @Operation(summary = "Actualizar un usuario existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario actualizado exitosamente", content = @Content(schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @Valid @RequestBody UsuarioDTO usuarioDTO) {
        // Mapeo de DTO a Entidad
        Usuario usuarioDetails = new Usuario();
        usuarioDetails.setNombre(usuarioDTO.getNombre());
        usuarioDetails.setEmail(usuarioDTO.getEmail());
        usuarioDetails.setRol(usuarioDTO.getRol());
        usuarioDetails.setRegion(usuarioDTO.getRegion());
        usuarioDetails.setComuna(usuarioDTO.getComuna());
        
        if (usuarioDTO.getContrasena() != null && !usuarioDTO.getContrasena().isEmpty()) {
            usuarioDetails.setContrasena(usuarioDTO.getContrasena());
        }
        return ResponseEntity.ok(usuarioService.updateUsuario(id, usuarioDetails));
    }

    @Operation(summary = "Activar o desactivar un usuario")
    @ApiResponse(responseCode = "200", description = "Estado del usuario cambiado")
    @PatchMapping("/{id}/toggle-estado")
    public ResponseEntity<Usuario> toggleEstadoUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.toggleEstadoUsuario(id));
    }

    @Operation(summary = "Eliminar un usuario permanentemente")
    @ApiResponse(responseCode = "204", description = "Usuario eliminado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
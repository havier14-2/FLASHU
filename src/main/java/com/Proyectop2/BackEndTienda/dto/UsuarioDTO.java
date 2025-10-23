package com.Proyectop2.BackEndTienda.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioDTO {

    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El formato del email es inválido")
    private String email;

    @NotBlank(message = "El rol no puede estar vacío")
    private String rol;
    
    @Size(min = 10, message = "La contraseña debe tener al menos 10 caracteres")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$", message = "La contraseña debe contener al menos un número y un carácter especial")
    private String contrasena;

    // --- CAMPOS AÑADIDOS ---
    private String region;
    private String comuna;
    // -----------------------
}
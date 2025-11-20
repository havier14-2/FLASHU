package com.Proyectop2.BackEndTienda.config;

import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepositories usuarioRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            
            // 1. CREAR SUPER ADMIN (Si no existe)
            if (usuarioRepo.findByEmail("admin@flashu.cl").isEmpty()) {
                Usuario admin = new Usuario();
                admin.setNombre("Administrador Principal");
                admin.setEmail("admin@flashu.cl");
                admin.setContrasena(passwordEncoder.encode("admin123")); // Contraseña: admin123
                admin.setRol("super-admin");
                admin.setEstado("activo");
                admin.setRegion("13"); // Región Metropolitana (ejemplo)
                admin.setComuna("13101"); // Santiago (ejemplo)
                usuarioRepo.save(admin);
                System.out.println("✅ Usuario ADMIN creado: admin@flashu.cl / admin123");
            }

            // 2. CREAR CLIENTE (Si no existe)
            if (usuarioRepo.findByEmail("cliente@flashu.cl").isEmpty()) {
                Usuario cliente = new Usuario();
                cliente.setNombre("Cliente Feliz");
                cliente.setEmail("cliente@flashu.cl");
                cliente.setContrasena(passwordEncoder.encode("cliente123")); // Contraseña: cliente123
                cliente.setRol("cliente"); // Rol diferente
                cliente.setEstado("activo");
                cliente.setRegion("05"); // Valparaíso (ejemplo)
                cliente.setComuna("05101"); // Valparaíso (ejemplo)
                usuarioRepo.save(cliente);
                System.out.println("✅ Usuario CLIENTE creado: cliente@flashu.cl / cliente123");
            }
        };
    }
}
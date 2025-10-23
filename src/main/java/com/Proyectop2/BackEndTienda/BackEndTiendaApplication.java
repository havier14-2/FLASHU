package com.Proyectop2.BackEndTienda;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackEndTiendaApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackEndTiendaApplication.class, args);
    }

    // --- HERRAMIENTA TEMPORAL PARA GENERAR CONTRASEÑA ---
    @Bean
    public CommandLineRunner commandLineRunner(PasswordEncoder passwordEncoder) {
        return args -> {
            String rawPassword = "ProfeVivi123!"; // <-- LA NUEVA CONTRASEÑA SEGURA
            String encodedPassword = passwordEncoder.encode(rawPassword);
            System.out.println("\n====================================================================");
            System.out.println("COPIA LA SIGUIENTE CONTRASEÑA ENCRIPTADA PARA 'ProfeVivi123!':");
            System.out.println(encodedPassword);
            System.out.println("====================================================================\n");
        };
    }
}
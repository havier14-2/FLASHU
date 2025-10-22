package com.Proyectop2.BackEndTienda.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Habilitamos y aplicamos la configuración de CORS que definimos abajo
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // 2. Deshabilitamos CSRF (necesario para APIs REST)
            .csrf(csrf -> csrf.disable())
            // 3. Configuramos las reglas de autorización
            .authorizeHttpRequests(authorize -> authorize
                // 4. Permitimos el acceso a CUALQUIER ruta sin autenticación
                .anyRequest().permitAll()
            );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 5. Bean para configurar CORS de forma centralizada
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permitimos el origen de tu frontend
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        // Permitimos todos los métodos HTTP que usaremos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        // Permitimos las cabeceras comunes
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        // Exponemos cabeceras si las necesitaras en el futuro
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplicamos esta configuración a todas las rutas de la aplicación
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
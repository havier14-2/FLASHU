package com.Proyectop2.BackEndTienda.config;

import com.Proyectop2.BackEndTienda.entities.Producto;
import com.Proyectop2.BackEndTienda.repositories.ProductoRepositories;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;
import java.util.Random;

@Configuration
public class ImageSeeder {

    @Bean
    CommandLineRunner asignarImagenesFaltantes(ProductoRepositories productoRepo) {
        return args -> {
            // Lista de las imágenes que pusiste en la carpeta 'uploads'
            List<String> imagenesDisponibles = List.of("tech1.jpg", "tech2.jpg", "tech3.jpg", "tech4.jpg");
            
            List<Producto> productos = productoRepo.findAll();
            Random random = new Random();
            int cont = 0;

            for (Producto prod : productos) {
                // Solo asignamos si NO tiene imagen
                if (prod.getImagen() == null || prod.getImagen().isEmpty()) {
                    String imagenAleatoria = imagenesDisponibles.get(random.nextInt(imagenesDisponibles.size()));
                    prod.setImagen(imagenAleatoria);
                    productoRepo.save(prod);
                    cont++;
                }
            }
            
            if (cont > 0) {
                System.out.println("✅ SEEDER: Se asignaron imágenes automáticamente a " + cont + " productos.");
            }
        };
    }
}
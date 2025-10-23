package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.entities.Comuna;
import com.Proyectop2.BackEndTienda.entities.Region;
import com.Proyectop2.BackEndTienda.repositories.RegionRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class DataLoaderService implements CommandLineRunner {

    @Autowired
    private RegionRepository regionRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo cargar si la base de datos está vacía
        if (regionRepository.count() == 0) {
            ObjectMapper mapper = new ObjectMapper();
            TypeReference<List<Map<String, Object>>> typeReference = new TypeReference<>() {};
            InputStream inputStream = new ClassPathResource("regiones_comunas.json").getInputStream();
            
            List<Map<String, Object>> regionData = mapper.readValue(inputStream, typeReference);
            
            for (Map<String, Object> data : regionData) {
                Region region = new Region();
                region.setNombre((String) data.get("region"));
                
                List<String> comunaNames = (List<String>) data.get("comunas");
                List<Comuna> comunasList = new ArrayList<>();
                
                for (String comunaName : comunaNames) {
                    Comuna comuna = new Comuna();
                    comuna.setNombre(comunaName);
                    comuna.setRegion(region);
                    comunasList.add(comuna);
                }
                
                region.setComunas(comunasList);
                regionRepository.save(region);
            }
            System.out.println("Regiones y comunas cargadas en la base de datos.");
        }
    }
}
package com.Proyectop2.BackEndTienda.controllers;

import com.Proyectop2.BackEndTienda.entities.Comuna;
import com.Proyectop2.BackEndTienda.entities.Region;
import com.Proyectop2.BackEndTienda.repositories.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET})
@RestController
@RequestMapping("/api")
public class RegionComunaController {

    @Autowired
    private RegionRepository regionRepository;

    @GetMapping("/regiones")
    public ResponseEntity<List<Region>> getRegiones() {
        return ResponseEntity.ok(regionRepository.findAll());
    }

    @GetMapping("/regiones/{regionId}/comunas")
    public ResponseEntity<List<Comuna>> getComunasPorRegion(@PathVariable Long regionId) {
        return regionRepository.findById(regionId)
                .map(region -> ResponseEntity.ok(region.getComunas()))
                .orElse(ResponseEntity.ok(Collections.emptyList()));
    }
}
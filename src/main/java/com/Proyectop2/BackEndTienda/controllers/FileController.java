package com.Proyectop2.BackEndTienda.controllers;

import com.Proyectop2.BackEndTienda.services.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Tag(name = "Archivos", description = "Endpoint para acceder a los archivos subidos.")
@RestController
@RequestMapping("/api")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @Operation(summary = "Obtener un archivo por su nombre",
               description = "Permite acceder a los archivos subidos (ej. imágenes de productos) para ser mostrados en el frontend.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Archivo encontrado y devuelto"),
        @ApiResponse(responseCode = "404", description = "Archivo no encontrado")
    })
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(
            @Parameter(description = "Nombre del archivo a obtener (incluyendo extensión)") @PathVariable String filename,
            HttpServletRequest request) {
        
        Resource resource = fileStorageService.loadFileAsResource(filename);
        String contentType = "application/octet-stream"; // Fallback
        
        try {
            String detectedContentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            if (detectedContentType != null) {
                contentType = detectedContentType;
            }
        } catch (IOException ex) {
            // Log warning or ignore, fallback is already set
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
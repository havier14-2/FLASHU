package com.Proyectop2.BackEndTienda.controllers;

import com.Proyectop2.BackEndTienda.entities.Producto;
import com.Proyectop2.BackEndTienda.services.FileStorageService;
import com.Proyectop2.BackEndTienda.services.ProductoServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Tag(name = "Productos", description = "API para la gestión de productos.")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/productos")
public class ProductoRestControllers {

    @Autowired
    private ProductoServices productoServices;
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private ObjectMapper objectMapper;

    @Operation(summary = "Obtener lista paginada de productos", description = "...")
    @GetMapping
    public ResponseEntity<Page<Producto>> listarProductos(
            @RequestParam(defaultValue = "") String nombre,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) Integer stockMenorA, // <-- PARÁMETRO AÑADIDO
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Producto> productos = productoServices.listarTodas(nombre, categoriaId, stockMenorA, pageable);
        return ResponseEntity.ok(productos);
    }

    @Operation(summary = "Obtener un producto por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productoServices.obtenerId(id));
    }
    
    @Operation(summary = "Crear un nuevo producto con imagen opcional")
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Producto> crearProducto(
            @Parameter(description = "Objeto Producto en formato JSON") @RequestPart("producto") @Valid String productoStr,
            @Parameter(description = "Archivo de imagen para el producto") @RequestPart(value = "imagen", required = false) MultipartFile imagenFile) throws IOException {
        
        Producto producto = objectMapper.readValue(productoStr, Producto.class);
        if (imagenFile != null && !imagenFile.isEmpty()) {
            String fileName = fileStorageService.storeFile(imagenFile);
            producto.setImagen(fileName);
        }
        Producto nuevoProducto = productoServices.crear(producto);
        return ResponseEntity.ok(nuevoProducto);
    }

    @Operation(summary = "Actualizar un producto existente con imagen opcional")
    @PutMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Long id,
            @RequestPart("producto") @Valid String productoStr,
            @RequestPart(value = "imagen", required = false) MultipartFile imagenFile) throws IOException {
        
        Producto productoExistente = productoServices.obtenerId(id);
        Producto datosNuevos = objectMapper.readValue(productoStr, Producto.class);

        productoExistente.setNombre(datosNuevos.getNombre());
        productoExistente.setDescripcion(datosNuevos.getDescripcion());
        productoExistente.setPrecio(datosNuevos.getPrecio());
        productoExistente.setStock(datosNuevos.getStock());
        productoExistente.setCategoria(datosNuevos.getCategoria());
        productoExistente.setActivo(datosNuevos.getActivo());

        if (imagenFile != null && !imagenFile.isEmpty()) {
            String fileName = fileStorageService.storeFile(imagenFile);
            productoExistente.setImagen(fileName);
        }

        Producto productoGuardado = productoServices.guardar(productoExistente);
        return ResponseEntity.ok(productoGuardado);
    }

    @Operation(summary = "Eliminar un producto permanentemente por su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Desactivar un producto (cambia su estado a 'inactivo')")
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Producto> desactivar(@PathVariable Long id) {
        return ResponseEntity.ok(productoServices.desactivar(id));
    }

    @Operation(summary = "Activar un producto (cambia su estado a 'activo')")
    @PatchMapping("/{id}/activar")
    public ResponseEntity<Producto> activar(@PathVariable Long id) {
        return ResponseEntity.ok(productoServices.activar(id));
    }
}
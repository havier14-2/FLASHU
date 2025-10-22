package com.Proyectop2.BackEndTienda.repositories;

import com.Proyectop2.BackEndTienda.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepositories extends JpaRepository<Categoria, Long> {
}
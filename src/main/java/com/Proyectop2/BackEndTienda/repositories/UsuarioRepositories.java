package com.Proyectop2.BackEndTienda.repositories;

import com.Proyectop2.BackEndTienda.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepositories extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
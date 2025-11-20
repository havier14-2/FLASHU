package com.Proyectop2.BackEndTienda.security;

import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepositories usuarioRepo;

    public CustomUserDetailsService(UsuarioRepositories usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));

        // Convertimos el rol String a una Authority de Spring
        // IMPORTANTE: Spring Security espera que los roles empiecen con "ROLE_"
        String roleName = "ROLE_" + usuario.getRol(); 
        
        return new User(
                usuario.getEmail(), 
                usuario.getContrasena(), 
                true, true, true, true, 
                List.of(new SimpleGrantedAuthority(roleName))
        );
    }
}
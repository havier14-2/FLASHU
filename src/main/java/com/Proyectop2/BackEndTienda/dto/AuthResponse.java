package com.Proyectop2.BackEndTienda.dto;

import com.Proyectop2.BackEndTienda.entities.Usuario;

public record AuthResponse(String token, String nombre, String rol, String email) {}
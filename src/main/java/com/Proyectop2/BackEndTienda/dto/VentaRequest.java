package com.Proyectop2.BackEndTienda.dto;

import lombok.Data;
import java.util.List;

@Data
public class VentaRequest {
    private List<ItemVentaDTO> items;
}
-- Desactiva la revisión de llaves foráneas para permitir un borrado limpio
SET FOREIGN_KEY_CHECKS = 0;

-- Asegúrate de estar usando la base de datos correcta
USE basesita;

-- Vacía las tablas para empezar de cero
TRUNCATE TABLE producto;
TRUNCATE TABLE categoria;
TRUNCATE TABLE usuarios;

-- Inserta el nuevo usuario administrador con el hash proporcionado
-- Usuario: admin@flashu.cl | Contraseña: admin123
INSERT INTO usuarios (nombre, email, contrasena, rol, estado, fecha_creacion) VALUES
('profevivi', 'profevivi@flashu.cl', '$2a$10$5Dz4enitgDm8JrtQjqOIJuSOZ7NowHF.L/Dt4oq8oaGuLAQm7veb.', 'super-admin', 'activo', NOW());

-- Crea las nuevas categorías
INSERT INTO categoria (id, nombre) VALUES
(1, 'Tecnología'),
(2, 'Deportes'),
(3, 'Variedad'),
(4, 'Hogar'),
(5, 'Cuidado Personal');

-- Crea 15 productos virales aleatorios
INSERT INTO producto (nombre, descripcion, precio, stock, activo, categoria_id, imagen) VALUES
('Mini Proyector Portátil HD', 'Proyector de bolsillo para ver series en cualquier pared.', 49990, 50, true, 1, NULL),
('Teclado Mecánico RGB 60%', 'Compacto, ruidoso y lleno de luces. Ideal para gamers.', 65000, 30, true, 1, NULL),
('Aro de Luz LED con Trípode', 'Perfecto para TikToks, Reels y selfies con iluminación profesional.', 19990, 100, true, 1, NULL),
('Audífonos Inalámbricos Gamer X-Pro', 'Baja latencia y sonido envolvente para una inmersión total.', 39990, 40, true, 1, NULL),
('Cargador Inalámbrico 3-en-1', 'Carga tu celular, reloj y audífonos al mismo tiempo.', 24990, 80, true, 1, NULL),
('Botella de Agua Motivacional 2L', 'Con frases y marcadores de hora para que no olvides hidratarte.', 12990, 200, true, 2, NULL),
('Bandas de Resistencia de Tela', 'Set de 3 bandas para ejercicios de pierna y glúteos.', 9990, 150, true, 2, NULL),
('Cuerda para Saltar con Contador', 'Quema calorías y lleva el registro de tus saltos automáticamente.', 14990, 70, true, 2, NULL),
('Pistola de Masaje Muscular Pro', 'Alivia la tensión y acelera la recuperación después de entrenar.', 29990, 45, true, 2, NULL),
('Rueda Abdominal con Soporte', 'El gadget definitivo para conseguir un six-pack.', 17990, 60, true, 2, NULL),
('Dispensador de Agua Automático para Gato', 'Fuente de agua que incentiva a tu mascota a beber más.', 15990, 120, true, 3, NULL),
('Lámpara de Puesta de Sol (Sunset Lamp)', 'Proyecta una luz cálida y relajante con efecto atardecer.', 11990, 300, true, 3, NULL),
('Humidificador Efecto Llama', 'Crea un ambiente acogedor con vapor que parece una llama.', 18990, 90, true, 3, NULL),
('Mini Licuadora Portátil USB', 'Prepara tus batidos en cualquier lugar. Se carga como un celular.', 22990, 110, true, 3, NULL),
('Organizador de Maquillaje Giratorio 360°', 'Ten todo tu maquillaje a mano con este organizador viral.', 16990, 130, true, 3, NULL),
('Aspiradora Robot Inteligente', 'Barre y trapea tus pisos mientras descansas.', 149990, 25, true, 4, NULL),
('Set de Contenedores Herméticos (10 piezas)', 'Organiza tu despensa y mantén tus alimentos frescos.', 25990, 80, true, 4, NULL),
('Dispensador de Jabón Automático', 'Sin contacto, más higiénico para tu baño o cocina.', 14990, 150, true, 4, NULL),
('Luz Nocturna LED con Sensor de Movimiento', 'Se enciende sola en la oscuridad cuando detecta movimiento.', 9990, 200, true, 4, NULL),
('Estante de Ducha Adhesivo (sin taladro)', 'Organiza tus productos de baño sin dañar las paredes.', 12990, 100, true, 4, NULL),
('Rodillo Facial de Jade y Gua Sha', 'Set para masajes faciales que reducen la hinchazón.', 11990, 180, true, 5, NULL),
('Limpiador Facial Ultrasónico', 'Exfolia y elimina puntos negros con vibración sónica.', 21990, 70, true, 5, NULL),
('Espejo de Maquillaje con Luz LED', 'Espejo con aumento y luz regulable para un maquillaje perfecto.', 19990, 90, true, 5, NULL),
('Masajeador Capilar de Silicona', 'Estimula el cuero cabelludo y ayuda a una limpieza profunda.', 7990, 250, true, 5, NULL),
('Set de Manicura Profesional 18 piezas', 'Estuche completo para el cuidado de uñas en casa.', 13990, 120, true, 5, NULL);

-- Reactiva la revisión de llaves foráneas
SET FOREIGN_KEY_CHECKS = 1;
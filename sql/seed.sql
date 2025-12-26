-- Seed Data for Products
INSERT INTO products (name, slug, description, price, stock, category, origin, images, is_featured) VALUES
('Barra Piura 70%', 'barra-piura-70', 'Chocolate oscuro con notas frutales y cítricas, típico del cacao blanco de Piura.', 25.00, 100, 'bar', 'Piura', ARRAY['https://picsum.photos/seed/piura/400/400'], true),
('Barra Cusco 80%', 'barra-cusco-80', 'Intenso y floral, elaborado con cacao chuncho de la convención.', 28.00, 50, 'bar', 'Cusco', ARRAY['https://picsum.photos/seed/cusco/400/400'], true),
('Pack Degustación', 'pack-degustacion', 'Una selección de 4 mini barras de diferentes orígenes del Perú.', 45.00, 20, 'pack', 'Perú', ARRAY['https://picsum.photos/seed/pack/400/400'], true),
('Bombones Rellenos', 'bombones-aguaymanto', 'Caja de 6 bombones con relleno de ganache de aguaymanto.', 30.00, 15, 'gift', 'Lima', ARRAY['https://picsum.photos/seed/bombones/400/400'], false);

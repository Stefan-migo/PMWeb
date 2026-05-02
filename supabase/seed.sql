-- ============================================
-- PajaroMacaWeb — Seed Data
-- ============================================

-- Tattoo Styles
INSERT INTO tattoo_styles (name, slug, sort_order) VALUES
  ('Blackwork', 'blackwork', 1),
  ('Tradicional', 'tradicional', 2),
  ('Neo-tradicional', 'neo-tradicional', 3),
  ('Realismo', 'realismo', 4),
  ('Dotwork', 'dotwork', 5),
  ('Geométrico', 'geometrico', 6),
  ('Linework', 'linework', 7),
  ('Acuarela', 'acuarela', 8);

-- Art Categories
INSERT INTO art_categories (name, slug, sort_order) VALUES
  ('Pintura', 'pintura', 1),
  ('Ilustración', 'ilustracion', 2),
  ('Digital', 'digital', 3),
  ('Escultura', 'escultura', 4),
  ('Dibujo', 'dibujo', 5);

-- Aftercare Sections
INSERT INTO aftercare_sections (title, slug, content, icon_name, sort_order) VALUES
  ('Primeras 24 horas', 'primeras-24-horas',
   'Mantén el vendaje puesto durante las primeras 2-4 horas después de hacerte el tatuaje. Después, lava suavemente con agua tibia y jabón antibacterial sin perfume. Seca dando palmaditas con una toalla limpia.\n\nAplica una capa fina de crema hidratante o producto específico para tatuajes 2-3 veces al día.',
   'clock', 1),
  ('Días 2-14', 'dias-2-14',
   'Lava el tatuaje 2 veces al día con jabón antibacterial. No frotes fuerte, solo da suaves palmaditas.\n\nAplica crema hidratante después de cada lavado. El tatuaje puede empezar a pelarse — ¡no lo arranques!\n\nEvita: piscinas, sol directo, ropa ajustada, baños largos.',
   'calendar', 2),
  ('Cuidado a Largo Plazo', 'cuidado-largo-plazo',
   'Una vez cicatrizado (2-4 semanas), aplica bloqueador solar cuando expongas el tatuaje al sol para mantener los colores vibrantes. Mantén la piel hidratada.',
   'shield', 3),
  ('Señales de Infección', 'senales-infeccion',
   'Consulta a un médico si experimentas: fiebre, enrojecimiento excesivo que se expande, hinchazón severa, pus, o dolor que empeora en lugar de mejorar.\n\nTu salud es lo primero.',
   'alert-triangle', 4);

-- About Sections
INSERT INTO about_sections (section_type, title, content, sort_order) VALUES
  ('artist_bio', 'Mi Historia',
   'Soy artista visual con una trayectoria dedicada a la exploración de formas y colores que conectan lo contemporáneo con lo tradicional. Mi trabajo ha sido exhibido en galerías y espacios culturales de Chile y Latinoamérica.',
   1),
  ('tattoo_bio', 'Tatuadora',
   'Mi pasión por el arte me llevó a especializarme en diseños personalizados de tatuajes. Cada tatuaje es una colaboración única entre el cliente y yo, creando piezas que cuentan historias en la piel.',
   2);

-- Sample Exhibitions
INSERT INTO exhibitions (title, slug, description, venue, location, start_date, end_date, is_current) VALUES
  ('Conexiones Contemporáneas', 'conexiones-contemporaneas', 'Exposición colectiva de arte contemporáneo chileno.', 'Galería Fundación', 'Santiago', '2026-03-01', '2026-06-30', true),
  ('Formas del Silencio', 'formas-del-silencio', 'Muestra individual de pintura y dibujo.', 'Centro Cultural La Moneda', 'Santiago', '2025-08-01', '2025-10-30', false),
  ('Nuevas Narrativas', 'nuevas-narrativas', 'Exposición colectiva de artistas emergentes.', 'Galería Animal', 'Santiago', '2025-03-01', '2025-05-30', false);

-- Sample Artworks
INSERT INTO artworks (title, slug, description, image_path, medium, year, is_featured, sort_order) VALUES
  ('Serenidad', 'serenidad', 'Óleo sobre lienzo que explora la calma del paisaje interior.', '/placeholder-art-1.jpg', 'Óleo sobre lienzo', 2025, true, 1),
  ('Raíces', 'raices', 'Ilustración digital sobre conexiones familiares y origen.', '/placeholder-art-2.jpg', 'Ilustración digital', 2025, true, 2),
  ('Fluir', 'fluir', 'Acuarela que captura el movimiento del agua.', '/placeholder-art-3.jpg', 'Acuarela', 2024, false, 3),
  ('Estructuras', 'estructuras', 'Dibujo en carbón sobre papel de formato grande.', '/placeholder-art-4.jpg', 'Carbón sobre papel', 2024, false, 4),
  ('Luz Interior', 'luz-interior', 'Serie de pinturas sobre la introspección.', '/placeholder-art-5.jpg', 'Mixta sobre tela', 2024, false, 5);
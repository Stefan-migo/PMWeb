"use client";

import Image from "next/image";
import { ArrowRight, Instagram, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/app/_components/shared/Reveal";
import "./TatuajesPageV2.css";

const tattooNavLinks = [
  { href: "#portafolio", label: "Portafolio" },
  { href: "#cotizar", label: "Cotizar" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#cuidados", label: "Cuidados" },
  { href: "#disenos-disponibles", label: "Diseños disponibles" },
  { href: "/", label: "Más" },
];

const heroCtas = tattooNavLinks.filter((link) => link.href.startsWith("#"));

const heroImages = [
  { src: "/design/tattoo/Layer 1.png", alt: "Tatuaje de un corazón rodeado de flores" },
  { src: "/design/tattoo/Layer 2.png", alt: "Tatuaje botánico sobre el hombro" },
  { src: "/design/tattoo/Layer 3.png", alt: "Tatuaje de una sirena con cola de pez" },
  { src: "/design/tattoo/Layer 4.png", alt: "Tatuaje de un ave en vuelo" },
  { src: "/design/tattoo/Layer 5.png", alt: "Tatuaje botánico de línea fina" },
  { src: "/design/tattoo/Layer 6.png", alt: "Tatuaje floral en ambas piernas" },
  { src: "/design/tattoo/Layer 7.png", alt: "Tatuaje de una ballena entre olas" },
  { src: "/design/tattoo/Layer 8.png", alt: "Tatuaje de una figura con felino" },
];

const portfolioImages = heroImages.slice(0, 4);

const availableDesigns = [
  { image: heroImages[4], label: "Botánico", detail: "Disponible para reservar" },
  { image: heroImages[6], label: "Fauna marina", detail: "Pieza única" },
  { image: heroImages[7], label: "Figurativo", detail: "Disponible para reservar" },
];

export function TatuajesPageV2() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setReducedMotion(mediaQuery.matches);

    handleScroll();
    handleMotionPreference();
    window.addEventListener("scroll", handleScroll, { passive: true });
    mediaQuery.addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveImage((image) => (image + 1) % heroImages.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="tatuajes-page-v2 min-h-screen bg-[var(--tattoo-bg)] text-[var(--tattoo-text)]">
      <nav className={`tatuajes-page-v2__nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Navegación principal">
        <div className="tatuajes-page-v2__nav-inner">
          <button
            type="button"
            className="tatuajes-page-v2__menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="tatuajes-page-v2-menu"
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>

          <div id="tatuajes-page-v2-menu" className={`tatuajes-page-v2__links ${mobileOpen ? "is-open" : ""}`}>
            {tattooNavLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <section
          id="inicio"
          className="tatuajes-page-v2__hero"
          aria-label="Carrusel de imágenes de tatuajes"
        >
          <div className="tatuajes-page-v2__hero-image" aria-live="polite">
            <Image
              key={heroImages[activeImage].src}
              src={heroImages[activeImage].src}
              alt={heroImages[activeImage].alt}
              fill
              priority
              sizes="100vw"
              className="tatuajes-page-v2__image"
            />
          </div>
          <a
            className="tatuajes-page-v2__hero-cta"
            href={heroCtas[activeImage % heroCtas.length].href}
            aria-label={`Ir a ${heroCtas[activeImage % heroCtas.length].label}`}
          >
            {heroCtas[activeImage % heroCtas.length].label}
            <span aria-hidden="true">→</span>
          </a>
          <div className="tatuajes-page-v2__progress" aria-label="Seleccionar imagen del hero">
            {heroImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={index === activeImage ? "is-active" : ""}
                onClick={() => setActiveImage(index)}
                aria-label={`Mostrar imagen ${index + 1}`}
                aria-current={index === activeImage ? "true" : undefined}
              />
            ))}
          </div>
        </section>

        <section id="portafolio" className="tatuajes-page-v2__section tatuajes-page-v2__portfolio">
          <div className="tatuajes-page-v2__container">
            <Reveal direction="up">
              <div className="tatuajes-page-v2__section-heading">
                <div>
                  <p className="tatuajes-page-v2__eyebrow">Trabajo reciente</p>
                  <h2>Portafolio</h2>
                  <p>Diseños pensados para acompañarte por mucho tiempo.</p>
                </div>
                <a className="tatuajes-page-v2__text-link" href="/tatuajes/portafolio">
                  Ver portafolio completo <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </Reveal>
            <div className="tatuajes-page-v2__portfolio-grid">
              {portfolioImages.map((image, index) => (
                <Reveal key={image.src} delay={index * 0.07} direction={index % 2 ? "up" : "left"}>
                  <a className="tatuajes-page-v2__image-card" href="/tatuajes/portafolio" aria-label={`Ver portafolio: ${image.alt}`}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 50vw, 25vw" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="disenos-disponibles" className="tatuajes-page-v2__section tatuajes-page-v2__designs">
          <div className="tatuajes-page-v2__container">
            <Reveal direction="right">
              <div className="tatuajes-page-v2__section-heading">
                <div>
                  <p className="tatuajes-page-v2__eyebrow">Piezas para elegir</p>
                  <h2>Diseños disponibles</h2>
                  <p>Explora ideas listas para llevar a tu piel o adaptar contigo.</p>
                </div>
                <a className="tatuajes-page-v2__text-link" href="#disenos-disponibles">
                  Ver todos los diseños <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </Reveal>
            <div className="tatuajes-page-v2__design-grid">
              {availableDesigns.map((design, index) => (
                <Reveal key={design.label} delay={index * 0.09} direction="up">
                  <a className="tatuajes-page-v2__design-card" href="#disenos-disponibles">
                    <div className="tatuajes-page-v2__design-image">
                      <Image src={design.image.src} alt={design.image.alt} fill sizes="(max-width: 767px) 100vw, 33vw" />
                    </div>
                    <div className="tatuajes-page-v2__design-copy">
                      <div>
                        <h3>{design.label}</h3>
                        <p>{design.detail}</p>
                      </div>
                      <ArrowRight aria-hidden="true" />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre-mi" className="tatuajes-page-v2__section tatuajes-page-v2__about">
          <div className="tatuajes-page-v2__container tatuajes-page-v2__about-grid">
            <Reveal direction="left">
              <div>
                <p className="tatuajes-page-v2__eyebrow">Sobre mí</p>
                <h2>Una colaboración en la piel</h2>
              </div>
            </Reveal>
            <Reveal delay={0.12} direction="right">
              <div className="tatuajes-page-v2__about-copy">
                <p>Soy tatuadora y artista visual. Creo diseños personalizados que convierten historias, símbolos e intuiciones en piezas únicas.</p>
                <p>Cada sesión comienza escuchando tu idea. Juntos definimos el lenguaje visual, la ubicación y el tamaño para que el resultado se sienta verdaderamente tuyo.</p>
                <div className="tatuajes-page-v2__meta">
                  <span>Villarrica, Chile</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="cotizar" className="tatuajes-page-v2__section tatuajes-page-v2__quote">
          <div className="tatuajes-page-v2__container">
            <Reveal direction="up">
              <div className="tatuajes-page-v2__quote-panel">
                <div>
                  <p className="tatuajes-page-v2__eyebrow">Tu idea, el primer paso</p>
                  <h2>¿Cómo cotizar?</h2>
                  <p>Cuéntame qué tienes en mente, dónde te gustaría llevarlo y el tamaño aproximado. Con esa información puedo orientarte sobre el diseño, el valor y la disponibilidad.</p>
                </div>
                <a className="tatuajes-page-v2__button" href="/tatuajes/cotizar">
                  Solicitar cotización <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="cuidados" className="tatuajes-page-v2__section tatuajes-page-v2__care">
          <div className="tatuajes-page-v2__container tatuajes-page-v2__care-grid">
            <Reveal direction="left">
              <div>
                <p className="tatuajes-page-v2__eyebrow">Después de la sesión</p>
                <h2>Cuida tu tatuaje desde el primer día</h2>
              </div>
            </Reveal>
            <Reveal delay={0.12} direction="right">
              <div className="tatuajes-page-v2__care-copy">
                <p>Lava suavemente, hidrata con una capa fina y evita sol, piscinas y fricción durante la cicatrización. La guía completa te acompaña paso a paso.</p>
                <a className="tatuajes-page-v2__text-link" href="/tatuajes/cuidados">
                  Leer guía de cuidados <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="tatuajes-page-v2__footer">
          <Reveal direction="up">
            <div className="tatuajes-page-v2__footer-inner">
              <div>
                <p className="tatuajes-page-v2__footer-brand">TATUAJES</p>
                <p>Diseño personalizado en Villarrica, Chile.</p>
              </div>
              <a className="tatuajes-page-v2__button" href="/tatuajes/cotizar">
                Hablemos de tu idea <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </footer>
      </main>

      <a
        className="tatuajes-page-v2__instagram"
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visítame en Instagram"
      >
        <Instagram aria-hidden="true" focusable="false" />
      </a>
    </div>
  );
}

export default TatuajesPageV2;

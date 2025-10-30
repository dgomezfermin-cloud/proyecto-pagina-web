const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault(); // Previene la navegación inmediata del enlace
    
    // Encuentra el UL del menú desplegable asociado
    const dropdownMenu = toggle.nextElementSibling;

    // Encuentra el LI que contiene el menú completo
    const container = toggle.closest('.dropdown-container');

    // Alternar la clase 'active' para abrir/cerrar el menú
    container.classList.toggle('active');

    // Aquí deberías añadir una lógica más avanzada para un sidebar
    // que quizás use 'max-height' en lugar de 'display' para animaciones.
    // Para una adaptación inicial y funcional:
    if (container.classList.contains('active')) {
      // Si se abre, haz que el menú desplegable sea visible
      // Nota: El CSS del modelo de sidebar maneja esto a través de la clase 'active'.
    } else {
      // Si se cierra
    }
  });
});

// AVISO IMPORTANTE:
// El modelo de diseño de la barra lateral también tiene scripts adicionales
// para abrir/cerrar la barra lateral completa (clase 'sidebar' y 'sidebar-toggler').
// Asegúrate de incluir el script que maneja el 'sidebar-toggler' del modelo original
// para que la funcionalidad de colapsar/expandir funcione.
/*
  theme-toggle.js
  Mejorada: ahora crea el botón y el <link id="theme-style"> si faltan,
  añade control de accesibilidad y logging para facilitar depuración.
*/

function isDarkHref(href) {
    return typeof href === 'string' && href.indexOf('darkStyle.css') !== -1;
}

function toggleTheme() {
    const themeStyle = document.getElementById('theme-style');
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeStyle || !themeToggle) {
        console.warn('theme-style edo theme-toggle ez da aurkitu. HTML/CSS errebisatu.');
        return;
    }

    const currentTheme = themeStyle.getAttribute('href') || '';
    if (isDarkHref(currentTheme)) {
        themeStyle.setAttribute('href', 'css/lightStyle.css');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-pressed', 'true');
        localStorage.setItem('theme', 'light');
    } else {
        themeStyle.setAttribute('href', 'css/darkStyle.css');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-pressed', 'false');
        localStorage.setItem('theme', 'dark');
    }
}

function ensureThemeLink() {
    let themeStyle = document.getElementById('theme-style');
    if (!themeStyle) {
        themeStyle = document.createElement('link');
        themeStyle.id = 'theme-style';
        themeStyle.rel = 'stylesheet';
        themeStyle.href = 'css/darkStyle.css';
        document.head.appendChild(themeStyle);
        console.info('<link id="theme-style"> sortu da, defektuz darkStyle.css du.');
    }
    return themeStyle;
}

function ensureThemeToggle() {
    let themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.type = 'button';
        themeToggle.className = 'btn btn-primary theme-toggle';
        themeToggle.title = 'itxura aldatzeko';
        themeToggle.setAttribute('aria-label', 'Cambiar tema');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
        document.body.appendChild(themeToggle);
        console.info('#theme-toggle botoia sortu da.');
    }
    return themeToggle;
}

document.addEventListener('DOMContentLoaded', function() {
    // Aseguramos que exista el enlace que controla el tema y el botón
    const themeStyle = ensureThemeLink();
    const themeToggle = ensureThemeToggle();

    // Usar el tema guardado si existe
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeStyle.setAttribute('href', 'css/darkStyle.css');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.setAttribute('aria-pressed', 'true');
    }

    // Añadimos el evento de click de forma segura
    themeToggle.addEventListener('click', function(e) {
        // Evitar envío de formularios por accidente
        e.preventDefault();
        toggleTheme();
    });
    // Soporte de teclado (Enter / Space) para accesibilidad
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Efectos adicionales para las tarjetas (manejo defensivo)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
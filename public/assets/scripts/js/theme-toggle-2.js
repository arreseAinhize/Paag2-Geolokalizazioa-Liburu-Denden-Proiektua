/*
  theme-toggle.js - CORREGIDO
*/

function isDarkHref(href) {
    return typeof href === 'string' && href.indexOf('darkStyle.css') !== -1;
}

function toggleTheme() {
    const navbar = document.getElementById('main-navbar');
    const favicon = document.getElementById('favicon');
    const themeStyle = document.getElementById('theme-style');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeStyle || !themeToggle) {
        console.warn('theme-style edo theme-toggle ez da aurkitu. HTML/CSS errebisatu.');
        return;
    }

    const currentTheme = themeStyle.getAttribute('href') || '';
    if (isDarkHref(currentTheme)) {
        // Cambiar a tema CLARO
        themeStyle.setAttribute('href', '../assets/styles/css/lightStyle.css');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-pressed', 'false');
        
        // Cambiar navbar a light para tema claro
        if (navbar) {
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-light');
        }
        
        // Cambiar favicon a light para tema claro
        if (favicon) {
            favicon.setAttribute('href', '../assets/img/Logo-Zuria.png');
        }
        
        localStorage.setItem('theme', 'light');
    } else {
        // Cambiar a tema OSCURO
        themeStyle.setAttribute('href', '../assets/styles/css/darkStyle.css');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-pressed', 'true');
        
        // Cambiar navbar a dark para tema oscuro
        if (navbar) {
            navbar.classList.remove('navbar-light');
            navbar.classList.add('navbar-dark');
        }
        
        // Cambiar favicon a dark para tema oscuro
        if (favicon) {
            favicon.setAttribute('href', '../assets/img/Logo-removebg.png');
        }
        
        localStorage.setItem('theme', 'dark');
    }
}

function ensureThemeLink() {
    let themeStyle = document.getElementById('theme-style');
    if (!themeStyle) {
        themeStyle = document.createElement('link');
        themeStyle.id = 'theme-style';
        themeStyle.rel = 'stylesheet';
        themeStyle.href = '../assets/styles/css/darkStyle.css'; // Tema por defecto
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
    const navbar = document.getElementById('main-navbar'); // DEFINIR navbar aquí
    const favicon = document.getElementById('favicon'); // DEFINIR favicon aquí


    // Usar el tema guardado si existe
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        themeStyle.setAttribute('href', '../assets/styles/css/lightStyle.css');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-pressed', 'false');
        
        // Configurar navbar para tema claro
        if (navbar) {
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-light');
        }
        
        // Configurar favicon para tema claro
        if (favicon) {
            favicon.setAttribute('href', '../assets/img/Logo-Zuria.png');
        }
    } else {
        // Tema oscuro por defecto
        themeStyle.setAttribute('href', '../assets/styles/css/darkStyle.css');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-pressed', 'true');
        
        // Configurar navbar para tema oscuro
        if (navbar) {
            navbar.classList.remove('navbar-light');
            navbar.classList.add('navbar-dark');
        }
        
        // Configurar favicon para tema oscuro
        if (favicon) {
            favicon.setAttribute('href', '../assets/img/Logo-removebg.png');
        }
    }

    // Añadimos el evento de click de forma segura
    themeToggle.addEventListener('click', function(e) {
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
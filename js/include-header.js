// Función para incluir el header en todas las páginas
function includeHeader() {
    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    
    // Cargar el contenido del header
    fetch('components/header.html')
        .then(response => response.text())
        .then(html => {
            headerContainer.innerHTML = html;
            document.body.insertBefore(headerContainer, document.body.firstChild);
            
            // Inicializar los menús después de cargar el header
            initializeMobileMenu();
            initializeDesktopMenu();
        })
        .catch(error => {
            console.error('Error al cargar el header:', error);
        });
}

// Función para abrir el menú móvil
function openMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenu) mobileMenu.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Función para alternar submenús móviles
function toggleSubmenu(e) {
    e.stopPropagation();
    const parent = this.closest('.mobile-submenu');
    if (parent) {
        parent.classList.toggle('active');
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = parent.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        }
    }
}

// Inicializar el menú móvil
function initializeMobileMenu() {
    // Selectores
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const submenuToggles = document.querySelectorAll('.toggle-submenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a:not(.toggle-submenu)');
    const mobileSubmenuHeaders = document.querySelectorAll('.mobile-submenu-header');
    
    // Ocultar menú de escritorio en móviles
    const desktopMenu = document.querySelector('.desktop-menu');
    const desktopOverlay = document.querySelector('.desktop-menu-overlay');
    
    if (window.innerWidth <= 1024) {
        if (desktopMenu) desktopMenu.style.display = 'none';
        if (desktopOverlay) desktopOverlay.style.display = 'none';
    }

    // Alternar menú al hacer clic en el botón de hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth <= 1024) {
                openMobileMenu();
            } else {
                openDesktopMenu();
            }
        });
    }

    // Cerrar menú al hacer clic en el botón de cerrar
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }

    // Cerrar menú al hacer clic fuera del menú
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Inicializar submenús
    submenuToggles.forEach(toggle => {
        // Eliminar cualquier event listener existente
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // Agregar el nuevo event listener
        newToggle.addEventListener('click', toggleSubmenu);
    });

    // Cerrar menú al hacer clic en un enlace del menú
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Manejar clic en los encabezados de submenú móvil
    mobileSubmenuHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            if (!e.target.closest('.toggle-submenu')) {
                const submenu = header.closest('.mobile-submenu');
                const link = header.querySelector('a');
                if (link && link.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                if (submenu) {
                    submenu.classList.toggle('active');
                    const icon = header.querySelector('.toggle-submenu i');
                    if (icon) {
                        icon.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                    }
                }
            }
        });
    });

    // Cerrar menú al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMobileMenu();
            // Mostrar menú de escritorio si está oculto
            const desktopMenu = document.querySelector('.desktop-menu');
            const desktopOverlay = document.querySelector('.desktop-menu-overlay');
            if (desktopMenu) desktopMenu.style.display = '';
            if (desktopOverlay) desktopOverlay.style.display = '';
        } else {
            closeDesktopMenu();
            // Ocultar menú de escritorio en móviles
            const desktopMenu = document.querySelector('.desktop-menu');
            const desktopOverlay = document.querySelector('.desktop-menu-overlay');
            if (desktopMenu) desktopMenu.style.display = 'none';
            if (desktopOverlay) desktopOverlay.style.display = 'none';
        }
    });
}

// Función para abrir el menú de escritorio
function openDesktopMenu() {
    const desktopMenu = document.querySelector('.desktop-menu');
    const desktopOverlay = document.querySelector('.desktop-menu-overlay');
    
    if (desktopMenu) desktopMenu.classList.add('active');
    if (desktopOverlay) desktopOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el menú de escritorio
function closeDesktopMenu() {
    const desktopMenu = document.querySelector('.desktop-menu');
    const desktopOverlay = document.querySelector('.desktop-menu-overlay');
    
    if (desktopMenu) desktopMenu.classList.remove('active');
    if (desktopOverlay) desktopOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Función para alternar submenús del menú de escritorio
function toggleDesktopSubmenu(e) {
    e.stopPropagation();
    const parent = this.closest('.desktop-has-submenu');
    if (parent) {
        parent.classList.toggle('active');
    }
}

// Inicializar el menú de escritorio
function initializeDesktopMenu() {
    // Selectores
    const desktopMenuToggle = document.querySelector('.desktop-menu-toggle');
    const closeDesktopMenuBtn = document.querySelector('.close-desktop-menu');
    const desktopOverlay = document.querySelector('.desktop-menu-overlay');
    const desktopMenu = document.querySelector('.desktop-menu');
    const desktopSubmenuToggles = document.querySelectorAll('.toggle-desktop-submenu');
    const desktopSubmenuHeaders = document.querySelectorAll('.desktop-submenu-header');
    const desktopLinks = document.querySelectorAll('.desktop-nav a');

    // Función para cerrar todos los submenús
    function closeAllSubmenus() {
        document.querySelectorAll('.desktop-has-submenu').forEach(item => {
            item.classList.remove('active');
        });
    }

    // Alternar menú al hacer clic en el botón de hamburguesa de escritorio
    if (desktopMenuToggle) {
        desktopMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openDesktopMenu();
            closeAllSubmenus(); // Cerrar submenús al abrir el menú
        });
    }

    // Cerrar menú al hacer clic en el botón de cerrar
    if (closeDesktopMenuBtn) {
        closeDesktopMenuBtn.addEventListener('click', closeDesktopMenu);
    }

    // Cerrar menú al hacer clic fuera del menú
    if (desktopOverlay) {
        desktopOverlay.addEventListener('click', closeDesktopMenu);
    }

    // Prevenir que los clics dentro del menú cierren el menú
    if (desktopMenu) {
        desktopMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Manejar clic en los botones de submenú
    desktopSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submenuItem = this.closest('.desktop-has-submenu');
            const isActive = submenuItem.classList.contains('active');
            
            // Cerrar todos los submenús primero
            closeAllSubmenus();
            
            // Si el submenú no estaba activo, lo abrimos
            if (!isActive) {
                submenuItem.classList.add('active');
            }
        });
    });

    // Manejar clic en los encabezados de submenú
    desktopSubmenuHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // Si el clic fue en un enlace dentro del encabezado, manejarlo
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                e.preventDefault();
                e.stopPropagation();
                
                const submenuItem = this.closest('.desktop-has-submenu');
                const isActive = submenuItem.classList.contains('active');
                
                // Alternar el submenú
                closeAllSubmenus();
                if (!isActive) {
                    submenuItem.classList.add('active');
                }
            }
        });
    });

    // Manejar clic en los enlaces del menú
    desktopLinks.forEach(link => {
        // Solo manejar enlaces que no son para alternar submenús
        if (!link.classList.contains('toggle-desktop-submenu')) {
            link.addEventListener('click', function(e) {
                // Si el enlace está en un submenú, no hacer nada especial
                if (this.closest('.desktop-submenu')) {
                    // Cerrar el menú después de un breve retraso para permitir la navegación
                    setTimeout(closeDesktopMenu, 300);
                    return;
                }
                
                // Si es un enlace del menú principal sin submenú, cerrar el menú
                if (!this.closest('.desktop-has-submenu')) {
                    closeDesktopMenu();
                } else {
                    // Si es el encabezado de un submenú, prevenir el comportamiento por defecto
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && desktopMenu && desktopMenu.classList.contains('active')) {
            closeDesktopMenu();
        }
    });
}

// Incluir el header cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', includeHeader);

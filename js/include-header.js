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
            
            // Inicializar el menú móvil después de cargar el header
            initializeMobileMenu();
        })
        .catch(error => {
            console.error('Error al cargar el header:', error);
        });
}

// Inicializar el menú móvil
function initializeMobileMenu() {
    // Selectores
    const menuToggle = document.querySelector('.menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    const navLinks = document.querySelectorAll('.sidebar-nav a:not(.submenu-toggle)');

    // Función para abrir el menú
    function openMenu() {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
    }

    // Función para cerrar el menú
    function closeMenu() {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    // Función para alternar submenú
    function toggleSubmenu(e) {
        e.preventDefault();
        e.stopPropagation();
        const submenu = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        // Cerrar otros submenús abiertos
        document.querySelectorAll('.submenu').forEach(item => {
            if (item !== submenu && item.classList.contains('active')) {
                item.classList.remove('active');
                const otherIcon = item.previousElementSibling?.querySelector('i');
                if (otherIcon) {
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            }
        });

        // Alternar el submenú actual
        if (submenu) {
            submenu.classList.toggle('active');
            if (icon) {
                icon.classList.toggle('fa-chevron-up');
                icon.classList.toggle('fa-chevron-down');
            }
        }
    }

    // Alternar menú al hacer clic en el botón de hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Cerrar menú al hacer clic en el botón de cerrar
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeMenu);
    }

    // Cerrar menú al hacer clic fuera del menú
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMenu);
    }

    // Inicializar submenús
    submenuToggles.forEach(toggle => {
        // Eliminar cualquier event listener existente
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // Agregar el nuevo event listener
        newToggle.addEventListener('click', toggleSubmenu);
        
        // Asegurar que el ícono tenga las clases correctas
        const icon = newToggle.querySelector('i');
        if (icon && !icon.classList.contains('fa-chevron-down')) {
            icon.classList.add('fa-chevron-down');
        }
    });

    // Cerrar menú al hacer clic en un enlace del menú
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
}

// Incluir el header cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', includeHeader);

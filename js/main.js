document.addEventListener('DOMContentLoaded', function() {
    // Añadir sombra al header al hacer scroll
    const header = document.querySelector('.sticky-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Funcionalidad del Acordeón Mejorada
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    // Asegurar que todos los acordeones estén cerrados al cargar
    accordionButtons.forEach(button => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('.accordion-icon');
        
        // Inicializar icono si no existe
        if (!icon) {
            const newIcon = document.createElement('span');
            newIcon.className = 'accordion-icon';
            newIcon.innerHTML = '▼';
            button.appendChild(newIcon);
        }
        
        // Cerrar todos los acordeones al cargar (excepto el primero si se desea)
        content.classList.remove('active');
        content.style.maxHeight = null;
    });
    
    // Opcional: Abrir el primer acordeón por defecto (descomentar si es necesario)
    // if (accordionButtons.length > 0) {
    //     const firstButton = accordionButtons[0];
    //     const firstContent = firstButton.nextElementSibling;
    //     firstButton.classList.add('active');
    //     firstContent.classList.add('active');
    //     firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    //     
    //     // Asegurar que el icono esté rotado
    //     const icon = firstButton.querySelector('.accordion-icon');
    //     if (icon) icon.classList.add('active');
    // }
    
    // Manejar clics en los botones del acordeón
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            
            // Cerrar todos los demás acordeones
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('active');
                    const otherContent = otherButton.nextElementSibling;
                    const otherIcon = otherButton.querySelector('.accordion-icon');
                    otherContent.classList.remove('active');
                    otherContent.style.maxHeight = null;
                    if (otherIcon) otherIcon.classList.remove('active');
                }
            });
            
            // Alternar el acordeón actual
            this.classList.toggle('active');
            
            if (content.classList.toggle('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.classList.add('active');
            } else {
                content.style.maxHeight = null;
                if (icon) icon.classList.remove('active');
            }
            
            // Prevenir el comportamiento por defecto de los botones
            return false;
        });
    });

    // Efecto Parallax para la sección de Principios
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        // Precargar la imagen
        const img = new Image();
        // Usar ruta relativa para compatibilidad
        img.src = 'img/hero-legado.jpg';
        
        // Asegurarse de que la imagen se cargue antes de aplicar el efecto
        img.onload = function() {
            // Aplicar el efecto parallax al hacer scroll
            let ticking = false;
            
            function updateParallax() {
                const scrollPosition = window.pageYOffset;
                const elementPosition = parallaxBg.getBoundingClientRect().top + window.pageYOffset;
                const distance = (scrollPosition + window.innerHeight) - elementPosition;
                
                if (distance > 0) {
                    const yPos = -(distance * 0.2);
                    parallaxBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
                
                ticking = false;
            }
            
            function onScroll() {
                if (!ticking) {
                    window.requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            }
            
            // Usar requestAnimationFrame para mejor rendimiento
            window.addEventListener('scroll', onScroll, { passive: true });
            
            // Manejar el redimensionamiento
            function handleResize() {
                if (window.innerWidth <= 768) {
                    parallaxBg.style.backgroundAttachment = 'scroll';
                    parallaxBg.style.transform = 'translate3d(0, 0, 0)';
                    window.removeEventListener('scroll', onScroll);
                } else {
                    parallaxBg.style.backgroundAttachment = 'fixed';
                    window.addEventListener('scroll', onScroll, { passive: true });
                    updateParallax();
                }
            }
            
            // Inicializar
            handleResize();
            window.addEventListener('resize', handleResize);
            
            // Forzar una actualización inicial
            updateParallax();
        };
    }
});

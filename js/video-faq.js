// Función para inicializar el acordeón de preguntas frecuentes
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    // Función para cerrar todos los acordeones excepto el que se está abriendo
    function closeOtherAccordions(currentButton) {
        accordionButtons.forEach(button => {
            if (button !== currentButton) {
                const content = button.nextElementSibling;
                button.classList.remove('active');
                content.classList.remove('active');
                const icon = button.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Agregar evento de clic a cada botón del acordeón
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Cerrar todos los demás acordeones
            closeOtherAccordions(this);
            
            // Alternar el acordeón actual
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            } else {
                this.classList.remove('active');
                content.classList.remove('active');
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Función para cerrar todos los acordeones
    function closeAllAccordions() {
        accordionItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Agregar evento de clic a cada encabezado del acordeón
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los acordeones primero
            closeAllAccordions();
            
            // Si el acordeón clickeado no estaba activo, lo abrimos
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Abrir el primer acordeón por defecto
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
});

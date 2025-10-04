// Script para incluir el footer en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    // Crear contenedor del footer
    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';
    
    // Insertar el contenedor antes del cierre del body
    document.body.appendChild(footerContainer);
    
    // Cargar el contenido del footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(html => {
            footerContainer.innerHTML = html;
            console.log('Footer cargado correctamente');
        })
        .catch(error => {
            console.error('Error al cargar el footer:', error);
            footerContainer.innerHTML = '<p>Error al cargar el pie de página.</p>';
        });
});

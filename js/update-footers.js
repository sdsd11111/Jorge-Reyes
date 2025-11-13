// Script para actualizar los footers en todas las páginas
const fs = require('fs');
const path = require('path');

// Directorio donde están los archivos HTML
const pagesDir = path.join(__dirname, '..');

// Lista de páginas a actualizar (excluyendo index.html que ya está actualizado)
const pagesToUpdate = [
    'academia-y-salud.html',
    'contacto.html',
    'legado-y-obras.html',
    'plan-para-loja.html',
    'quienes-somos.html'
];

// Plantilla del footer que queremos incluir
const footerTemplate = `
    <!-- Footer se cargará dinámicamente aquí -->
    <div id="footer-container">
        <!-- El contenido del footer se cargará aquí -->
    </div>
`;

// Scripts que deben estar al final del body
const scriptsToAdd = `
    <!-- Incluir los scripts necesarios -->
    <script src="js/include-header.js"></script>
    <script src="js/include-footer.js"></script>
    <script src="js/main.js"></script>
`;

// Función para actualizar un archivo
function updateFile(fileName) {
    const filePath = path.join(pagesDir, fileName);
    
    try {
        // Leer el contenido actual del archivo
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Eliminar el footer existente (si existe)
        content = content.replace(/<footer[\s\S]*?<\/footer>/, '');
        content = content.replace(/<div id="footer-container">[\s\S]*?<\/div>/, '');
        
        // Insertar el nuevo footer dinámico antes del cierre de </body>
        content = content.replace(
            '</body>', 
            `    ${footerTemplate.trim()}\n    ${scriptsToAdd.trim()}\n</body>`
        );
        
        // Guardar los cambios
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${fileName} actualizado correctamente`);
    } catch (error) {
        console.error(`❌ Error al actualizar ${fileName}:`, error.message);
    }
}

// Actualizar todas las páginas
console.log('🚀 Actualizando footers en todas las páginas...');
pagesToUpdate.forEach(updateFile);
console.log('✨ Proceso completado');

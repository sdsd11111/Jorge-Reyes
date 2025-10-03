// Script para actualizar los headers en todas las páginas
const fs = require('fs');
const path = require('path');

// Directorio donde están los archivos HTML
const pagesDir = path.join(__dirname, '..');

// Lista de páginas a actualizar (excluyendo index.html que ya está bien)
const pagesToUpdate = [
    'academia-y-salud.html',
    'contacto.html',
    'legado-y-obras.html',
    'plan-para-loja.html',
    'quienes-somos.html'
];

// Plantilla del header que queremos incluir
const headerTemplate = `
    <!-- El header se cargará dinámicamente aquí -->
    <div id="header-container">
        <!-- El contenido del header se cargará aquí -->
    </div>
`;

// Función para actualizar un archivo
function updateFile(fileName) {
    const filePath = path.join(pagesDir, fileName);
    
    try {
        // Leer el contenido actual del archivo
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Eliminar el header estático existente (si existe)
        content = content.replace(/<header[\s\S]*?<\/header>/, '');
        
        // Insertar el nuevo header dinámico justo después de la etiqueta <body>
        content = content.replace(
            /<body[^>]*>\s*/, 
            match => `${match}\n${headerTemplate}`
        );
        
        // Asegurarse de que los scripts necesarios estén presentes antes del cierre de </body>
        if (!content.includes('include-header.js')) {
            content = content.replace(
                /<\/body>/, 
                '    <script src="js/include-header.js"></script>\n    <script src="js/main.js"></script>\n</body>'
            );
        }
        
        // Guardar los cambios
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${fileName} actualizado correctamente`);
    } catch (error) {
        console.error(`❌ Error al actualizar ${fileName}:`, error.message);
    }
}

// Actualizar todas las páginas
console.log('🚀 Actualizando headers en todas las páginas...');
pagesToUpdate.forEach(updateFile);
console.log('✨ Proceso completado');

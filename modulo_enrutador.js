const fs = require('fs');
const path = require('path');
const moduloHora = require('./modulo_hora');
const moduloDiasFaltantes = require('./modulo_dias_faltantes');

module.exports = {
    enrutar: function(url, res) {
        let pagina;

        if (url === '/Hora') {
            pagina = 'Hora.html';

            const filePath = path.join(__dirname, 'public', pagina);

            fs.readFile(filePath, function(err, contenido) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('404 - Página no encontrada');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(contenido);
                }
            });
        } else if (url.startsWith('/Fecha/')) {
            const fechaObjetivo = url.substring(7); 
            const diasFaltantes = moduloDiasFaltantes.calcularDiasFaltantes(fechaObjetivo);
            pagina = 'Fecha.html';
            const filePath = path.join(__dirname, 'public', pagina);
            fs.readFile(filePath, function(err, contenido) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('404 - Página no encontrada');
                } else {
                    const paginaHTML = contenido.toString().replace('{fecha}', diasFaltantes);
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(paginaHTML);
                }
            });
        }
            const filePath = path.join(__dirname, 'public', pagina);

            fs.readFile(filePath, function(err, contenido) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('404 - Página no encontrada');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(contenido);
                }
            });
        }
    };
    

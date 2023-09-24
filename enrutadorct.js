const fs = require('fs');
const path = require('path');
module.exports = {
  enrutar: function (url, res) {
    let pagina;

    if (url === '/Calculadora') {
      pagina = 'calculadora.html';
    } else if (url === '/Procesador') {
      pagina = 'procesador.html';
    } else {
      pagina = 'index.html';
    }

    const filePath = path.join(__dirname, 'public', pagina);

    fs.readFile(filePath, function (err, contenido) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 - Página no encontrada');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(contenido);
      }
    });
  },
};

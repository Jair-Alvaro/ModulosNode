// enrutador.js
const fs = require('fs');

function cargarPagina(url, res) {
  const pagina = `./public${url}.html`;
  fs.readFile(pagina, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Página no encontrada');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

module.exports = {
  cargarPagina,
};

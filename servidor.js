const http = require('http');
const url = require('url');
const moduloHora = require('./modulo_hora');
const moduloDiasFaltantes = require('./modulo_dias_faltantes');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;

  if (pathName === '/Hora') {
    const hora = moduloHora.obtenerHora();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hora Actual:</h1><p>${hora}</p>`);
  } else if (pathName === '/Hora/Formato1') {
    const horaFormateada = moduloHora.formatearHora1();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hora Formato 1:</h1><p>${horaFormateada}</p>`);
  } else if (pathName === '/Hora/Formato2') {
    const horaFormateada = moduloHora.formatearHora2();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hora Formato 2:</h1><p>${horaFormateada}</p>`);
  } else if (pathName === '/Fecha') {
    const fechaParam = parsedUrl.query.fecha;
    if (!fechaParam) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Por favor, proporciona una fecha en la URL, por ejemplo: /Fecha?fecha=2023-12-31');
    } else {
      const fechaObjetivo = new Date(fechaParam);
      fechaObjetivo.setDate(fechaObjetivo.getDate() + 1);
      const diasFaltantes = moduloDiasFaltantes.calcularDiasFaltantes(fechaObjetivo);

      fs.readFile('./public/Fecha.html', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error al cargar la página Fecha.html');
        } else {
          const fechaFormateada = `${fechaObjetivo.getDate()}/${fechaObjetivo.getMonth() + 1}/${fechaObjetivo.getFullYear()}`;
          const fechaHtmlActualizado = data
            .replace('{diasFaltantes}', diasFaltantes)
            .replace('{fechaObjetivo}', fechaFormateada);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fechaHtmlActualizado);
        }
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
  }
});

server.listen(8080, () => {
  console.log('Servidor en http://localhost:8080/');
});

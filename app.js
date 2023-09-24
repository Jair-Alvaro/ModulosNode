const http = require('http');
const url = require('url');
const moduloCalculadora = require('./modulo_calculadora');
const moduloProcesador = require('./modulo_procesador');
const enrutador = require('./enrutadorct');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;

  if (pathName === '/Operaciones' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const num1 = parseFloat(formData.get('num1'));
      const num2 = parseFloat(formData.get('num2'));
      const operacion = formData.get('operacion');

      let resultado;
      if (operacion === 'sumar') {
        resultado = moduloCalculadora.sumar(num1, num2);
      } else if (operacion === 'restar') {
        resultado = moduloCalculadora.restar(num1, num2);
      } else if (operacion === 'multiplicar') {
        resultado = moduloCalculadora.multiplicar(num1, num2);
      } else if (operacion === 'dividir') {
        resultado = moduloCalculadora.dividir(num1, num2);
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Resultado:</h1><p>${resultado}</p>`);
    });
  } else if (pathName === '/Texto' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const texto = formData.get('texto');
      const operacion = formData.get('operacion');
      let resultado;
      switch (operacion) {
        case 'dividirPalabra':
          resultado = moduloProcesador.dividirPalabra(texto).join(', ');
          break;
        case 'extraerCadena':
          resultado = moduloProcesador.extraerCadena(texto);
          break;
        case 'eliminarEspacios':
          resultado = moduloProcesador.eliminarEspacios(texto);
          break;
        case 'capitalizar':
          resultado = moduloProcesador.capitalizar(texto);
          break;
        case 'convertirMinusculas':
          resultado = moduloProcesador.convertirMinusculas(texto);
          break;
        case 'convertirMayusculas':
          resultado = moduloProcesador.convertirMayusculas(texto);
          break;
        case 'contarCaracteres':
          resultado = moduloProcesador.contarCaracteres(texto);
          break;
        default:
          resultado = 'Operación no válida';
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Resultado:</h1><p>${resultado}</p>`);
    });
  } else {
    enrutador.enrutar(pathName, res);
  }
});
server.listen(8080, () => {
  console.log('Servidor en http://localhost:8080/');
});

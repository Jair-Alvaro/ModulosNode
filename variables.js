var http = require('http'),
    fs = require('fs')
var parametros = [],
    valores = []
http.createServer( function(req, res){
    fs.readFile('./public/form.html', function(err, html){
        var html_string = html.toString();
        if (req.url.indexOf('?') > 0) {
            var url_data = req.url.split('?');
            if (url_data.length > 1) { // Verificar si hay al menos dos partes después de dividir por '?'
                arreglo_parametros = url_data[1].split('&');
            } else {
                // Manejar el caso en el que no haya parámetros en la URL
                arreglo_parametros = [];
            }
        } else {
            arreglo_parametros = [];
        }
        
        for(var i=0; i<arreglo_parametros.length; i++){
            var parametro = arreglo_parametros[i];
            var param_data = parametro.split('=');
            parametros[i] = param_data[0];
            valores[i] = param_data[1];
        }
        for(var i = 0; i<parametros.length;i++){
            html_string = html_string.replace('{'+parametros[i]+'}', valores[i]);
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(html_string);
        res.end();
        
    });
}).listen(8080);

console.log('Servidor en http://localhost:8080/');


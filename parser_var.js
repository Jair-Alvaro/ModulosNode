function parse_vars(req) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const parametros = [...url.searchParams.keys()];
    const valores = [...url.searchParams.values()];
    return { parametros, valores };
}
module.exports.parse_vars = parse_vars;

module.exports.batman = {
    identidad: 'Bruce Wayne',
    poder: 'Dinero'
};
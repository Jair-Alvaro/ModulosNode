function calcularDiasFaltantes(fechaObjetivo) {
    const fechaActual = new Date();
    const diferenciaMs = fechaObjetivo - fechaActual;
    const diasFaltantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    return diasFaltantes;
  }
  
  module.exports = {
    calcularDiasFaltantes,
  };
  
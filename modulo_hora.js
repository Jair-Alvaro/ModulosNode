function obtenerHora() {
    const fechaActual = new Date();
    return fechaActual.toLocaleTimeString();
  }
  
  function formatearHora1() {
    const fechaActual = new Date();
    const horas = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaActual.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }
  
  function formatearHora2() {
    const fechaActual = new Date();
    const horas = fechaActual.getHours() % 12 || 12;
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const amPm = fechaActual.getHours() >= 12 ? 'PM' : 'AM';
    return `${horas}:${minutos} ${amPm}`;
  }
  
  module.exports = {
    obtenerHora,
    formatearHora1,
    formatearHora2,
  };
  
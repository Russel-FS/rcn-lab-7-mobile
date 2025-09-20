export const generarId = () =>{
     const random = Math.random().toString(36).substring(2),
    fecha = Date.now().toString(36);
    return random + fecha;
};

export const formatearFecha = (fecha: number | Date) => new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
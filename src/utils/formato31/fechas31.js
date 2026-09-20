// =====================================================
// FUNCIONES DE FECHAS - FORMATO 3.1
// =====================================================
//
// Reglas del Formato 3.1:
//
// Fecha de solicitud
//        ↓
// + 2 días hábiles
//        ↓
// Fecha de entrega
//        ↓
// + 1 día hábil
//        ↓
// Fecha de liberación
//
// Sábados y domingos NO se consideran días hábiles.
// =====================================================


// =====================================================
// VERIFICAR SI UNA FECHA ES DÍA HÁBIL
// =====================================================

export function esDiaHabil(fecha) {

    const diaSemana = fecha.getDay();
  
    // 0 = domingo
    // 6 = sábado
  
    return (
      diaSemana !== 0 &&
      diaSemana !== 6
    );
  }
  
  
  // =====================================================
  // AGREGAR DÍAS HÁBILES
  // =====================================================
  
  export function agregarDiasHabiles(
    fechaInicial,
    cantidadDias
  ) {
  
    if (!fechaInicial) {
      return "";
    }
  
  
    // ---------------------------------------------------
    // Crear una copia de la fecha
    // ---------------------------------------------------
  
    const fecha = new Date(
      `${fechaInicial}T00:00:00`
    );
  
  
    // Validar fecha
  
    if (Number.isNaN(fecha.getTime())) {
      return "";
    }
  
  
    let diasAgregados = 0;
  
  
    // ---------------------------------------------------
    // Avanzar día por día
    // ---------------------------------------------------
  
    while (
      diasAgregados < cantidadDias
    ) {
  
      fecha.setDate(
        fecha.getDate() + 1
      );
  
  
      if (
        esDiaHabil(fecha)
      ) {
  
        diasAgregados++;
  
      }
  
    }
  
  
    // ---------------------------------------------------
    // Convertir nuevamente a YYYY-MM-DD
    // ---------------------------------------------------
  
    const año =
      fecha.getFullYear();
  
    const mes =
      String(
        fecha.getMonth() + 1
      ).padStart(2, "0");
  
    const dia =
      String(
        fecha.getDate()
      ).padStart(2, "0");
  
  
    return `${año}-${mes}-${dia}`;
  }
  
  
  // =====================================================
  // FECHA DE ENTREGA
  // =====================================================
  //
  // Fecha de entrega =
  // Fecha de solicitud + 2 días hábiles
  // =====================================================
  
  export function calcularFechaEntrega(
    fechaSolicitud
  ) {
  
    return agregarDiasHabiles(
      fechaSolicitud,
      2
    );
  
  }
  
  
  // =====================================================
  // FECHA DE LIBERACIÓN
  // =====================================================
  //
  // Fecha de liberación =
  // Fecha de entrega + 1 día hábil
  // =====================================================
  
  export function calcularFechaLiberacion(
    fechaEntrega
  ) {
  
    return agregarDiasHabiles(
      fechaEntrega,
      1
    );
  
  }
  
  
  // =====================================================
  // CALCULAR TODAS LAS FECHAS
  // =====================================================
  //
  // Esta función será útil posteriormente para
  // generar el Excel.
  // =====================================================
  
  export function calcularFechasFormato31(
    fechaSolicitud
  ) {
  
    if (!fechaSolicitud) {
  
      return {
        fechaSolicitud: "",
        fechaEntrega: "",
        fechaLiberacion: "",
      };
  
    }
  
  
    const fechaEntrega =
      calcularFechaEntrega(
        fechaSolicitud
      );
  
  
    const fechaLiberacion =
      calcularFechaLiberacion(
        fechaEntrega
      );
  
  
    return {
  
      fechaSolicitud,
  
      fechaEntrega,
  
      fechaLiberacion,
  
    };
  
  }
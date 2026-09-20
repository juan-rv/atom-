import ExcelJS from "exceljs";

import {
  obtenerNombreInstrumento,
} from "./instrumentos";

const NOMBRE_PLANTILLA =
  "/AT-GT-P01-F06.xlsx";

const NOMBRE_HOJA =
  "AT-GT-P01-F06";

const FILA_INICIO_MEDICIONES = 5;

const FILAS_MEDICION_ORIGINALES = 3;

const FILA_INICIO_SECCIONES = 8;

const OBSERVACION =
  "All measurement instruments were verified before use with gauge blocks.";

const MERGES_SECCIONES = [
  "A8:M8",
  "A9:M9",
  "A10:M10",
  "A11:M11",
  "A12:F12",
  "G12:M12",
  "A13:F13",
  "G13:M13",
  "A14:M14",
  "A15:M15",
  "A18:M18",
  "A19:M20",
];

function analizarCelda(referencia) {
  const resultado =
    referencia.match(
      /^([A-Z]+)(\d+)$/
    );

  if (!resultado) {
    throw new Error(
      `Referencia de celda inválida: ${referencia}`
    );
  }

  return {
    columna: resultado[1],
    fila: Number(resultado[2]),
  };
}

function desplazarCelda(
  referencia,
  diferencia
) {
  const {
    columna,
    fila,
  } = analizarCelda(
    referencia
  );

  return `${columna}${fila + diferencia}`;
}

function desplazarRango(
  rango,
  diferencia
) {
  const partes =
    rango.split(":");

  if (
    partes.length !== 2
  ) {
    return rango;
  }

  return (
    `${desplazarCelda(
      partes[0],
      diferencia
    )}:` +
    `${desplazarCelda(
      partes[1],
      diferencia
    )}`
  );
}

function copiarEstiloFila(
  worksheet,
  filaOrigen,
  filaDestino
) {
  const origen =
    worksheet.getRow(
      filaOrigen
    );

  const destino =
    worksheet.getRow(
      filaDestino
    );

  destino.height =
    origen.height;

  destino.hidden =
    origen.hidden;

  for (
    let columna = 1;
    columna <= 13;
    columna++
  ) {
    const celdaOrigen =
      origen.getCell(
        columna
      );

    const celdaDestino =
      destino.getCell(
        columna
      );

    if (
      celdaOrigen.hasStyle
    ) {
      celdaDestino.style =
        celdaOrigen.style;
    }

    celdaDestino.numFmt =
      celdaOrigen.numFmt;

    if (
      celdaOrigen.font
    ) {
      celdaDestino.font =
        celdaOrigen.font;
    }

    if (
      celdaOrigen.fill
    ) {
      celdaDestino.fill =
        celdaOrigen.fill;
    }

    if (
      celdaOrigen.border
    ) {
      celdaDestino.border =
        celdaOrigen.border;
    }

    if (
      celdaOrigen.alignment
    ) {
      celdaDestino.alignment =
        celdaOrigen.alignment;
    }

    if (
      celdaOrigen.protection
    ) {
      celdaDestino.protection =
        celdaOrigen.protection;
    }
  }
}

function descombinarSecciones(
  worksheet
) {
  MERGES_SECCIONES.forEach(
    (merge) => {
      try {
        worksheet.unMergeCells(
          merge
        );
      } catch (error) {
        console.warn(
          `No fue posible descombinar ${merge}`,
          error
        );
      }
    }
  );
}

function combinarSecciones(
  worksheet,
  diferencia
) {
  MERGES_SECCIONES.forEach(
    (merge) => {
      const nuevoMerge =
        desplazarRango(
          merge,
          diferencia
        );

      try {
        worksheet.mergeCells(
          nuevoMerge
        );
      } catch (error) {
        console.warn(
          `No fue posible combinar ${nuevoMerge}`,
          error
        );
      }
    }
  );
}

function guardarAlturasSecciones(
  worksheet
) {
  const alturas = {};

  for (
    let fila =
      FILA_INICIO_SECCIONES;
    fila <= 20;
    fila++
  ) {
    alturas[fila] =
      worksheet.getRow(
        fila
      ).height;
  }

  return alturas;
}

function restaurarAlturasSecciones(
  worksheet,
  alturas,
  diferencia
) {
  Object.entries(
    alturas
  ).forEach(
    (
      [
        filaOriginal,
        altura,
      ]
    ) => {
      const filaNueva =
        Number(
          filaOriginal
        ) +
        diferencia;

      if (
        altura !==
        undefined
      ) {
        worksheet.getRow(
          filaNueva
        ).height =
          altura;
      }
    }
  );
}

function ajustarFilasMedicion(
  worksheet,
  cantidadMediciones
) {
  const diferencia =
    cantidadMediciones -
    FILAS_MEDICION_ORIGINALES;

  const alturas =
    guardarAlturasSecciones(
      worksheet
    );

  if (
    diferencia > 0
  ) {
    const filasNuevas =
      [];

    for (
      let i = 0;
      i < diferencia;
      i++
    ) {
      filasNuevas.push(
        []
      );
    }

    worksheet.spliceRows(
      FILA_INICIO_SECCIONES,
      0,
      ...filasNuevas
    );

    for (
      let i = 0;
      i < diferencia;
      i++
    ) {
      const filaNueva =
        FILA_INICIO_SECCIONES +
        i;

      copiarEstiloFila(
        worksheet,
        7,
        filaNueva
      );
    }
  }

  if (
    diferencia < 0
  ) {
    const cantidadEliminar =
      Math.abs(
        diferencia
      );

    const primeraFilaEliminar =
      FILA_INICIO_MEDICIONES +
      cantidadMediciones;

    worksheet.spliceRows(
      primeraFilaEliminar,
      cantidadEliminar
    );
  }

  restaurarAlturasSecciones(
    worksheet,
    alturas,
    diferencia
  );

  return diferencia;
}

function colocarDatosGenerales(
  worksheet,
  datosGenerales
) {
  if (
    datosGenerales.fecha
  ) {
    const partes =
      datosGenerales.fecha.split(
        "-"
      );

    const fecha =
      new Date(
        Number(
          partes[0]
        ),
        Number(
          partes[1]
        ) - 1,
        Number(
          partes[2]
        )
      );

    worksheet.getCell(
      "B2"
    ).value =
      fecha;

    worksheet.getCell(
      "B2"
    ).numFmt =
      "dd/mm/yyyy";
  }

  worksheet.getCell(
    "G2"
  ).value =
    datosGenerales.op ||
    "";

  worksheet.getCell(
    "J2"
  ).value =
    datosGenerales.ocPo ||
    "";

  worksheet.getCell(
    "B3"
  ).value =
    datosGenerales.componente ||
    "";

  worksheet.getCell(
    "I3"
  ).value =
    datosGenerales.pn ||
    "";

  worksheet.getCell(
    "L3"
  ).value =
    datosGenerales.sn ||
    "";
}

function traducirParametroExcel(
  parametro
) {
  const texto =
    String(
      parametro || ""
    )
      .trim()
      .toLowerCase();

 const traducciones = {
  diametro:
    "Diameter",

  "diámetro":
    "Diameter",

  longitud:
    "Length",

  "longitud e":
    "Length E",

  largo:
    "Length",

  ancho:
    "Width",

  alto:
    "Height",

  profundidad:
    "Depth",

  concentricidad:
    "Concentricity",

  rugosidad:
    "Roughness",

  "rugosidad ra":
    "Roughness Ra",

  "rugosidad rz":
    "Roughness Rz",

  planitud:
    "Flatness",

  perpendicularidad:
    "Perpendicularity",

  paralelismo:
    "Parallelism",

  angularidad:
    "Angularity",

  posicion:
    "Position",

  "posición":
    "Position",

  redondez:
    "Roundness",

  cilindricidad:
    "Cylindricity",

  rectitud:
    "Straightness",

  "longitud l":
    "Length L",

  "longitud i":
    "Length I",
};

  return (
    traducciones[
      texto
    ] ||
    parametro ||
    ""
  );
}

function traducirInstrumentoExcel(
  instrumento
) {
  const textoOriginal =
    String(
      instrumento || ""
    ).trim();

  if (
    !textoOriginal
  ) {
    return "";
  }

  /*
   * Los instrumentos pueden llegar como:
   *
   * Calibrador 0-150 mm; AT-MI-P02-IT06
   *
   * Se traduce solamente el nombre
   * y se conserva el código.
   */

  const partes =
    textoOriginal
      .split(";")
      .map(
        (parte) =>
          parte.trim()
      );

  const traducciones = {
    "calibrador 0-150 mm":
      "Caliper 0-150 mm",

    "calibrador 0 - 150 mm":
      "Caliper 0-150 mm",

    "calibrador 0-300 mm":
      "Caliper 0-300 mm",

    "calibrador 0 - 300 mm":
      "Caliper 0-300 mm",

    "juego de bloques patrón 87 piezas":
      "Gauge Block Set 87 Pieces",

    "juego de bloques patron 87 piezas":
      "Gauge Block Set 87 Pieces",

    "juego de bloques patrón":
      "Gauge Block Set",

    "juego de bloques patron":
      "Gauge Block Set",

    "micrómetro 0-25 mm":
      "Micrometer 0-25 mm",

    "micrometro 0-25 mm":
      "Micrometer 0-25 mm",

    "micrómetro 25-50 mm":
      "Micrometer 25-50 mm",

    "micrometro 25-50 mm":
      "Micrometer 25-50 mm",

    "micrómetro 50-75 mm":
      "Micrometer 50-75 mm",

    "micrometro 50-75 mm":
      "Micrometer 50-75 mm",

    "micrómetro 75-100 mm":
      "Micrometer 75-100 mm",

    "micrometro 75-100 mm":
      "Micrometer 75-100 mm",

    "reloj comparador":
      "Dial Indicator",

    "comparador de carátula":
      "Dial Indicator",

    "comparador de caratula":
      "Dial Indicator",

    altímetro:
      "Height Gauge",

    altimetro:
      "Height Gauge",

    rugosímetro:
      "Roughness Tester",

    rugosimetro:
      "Roughness Tester",
  };

  return partes
    .map(
      (parte) => {
        const clave =
          parte.toLowerCase();

        return (
          traducciones[
            clave
          ] ||
          parte
        );
      }
    )
    .join("; ");
}

function traducirListadoInstrumentosExcel(
  instrumentos
) {
  if (
    !Array.isArray(
      instrumentos
    )
  ) {
    return [];
  }

  return instrumentos.map(
    (
      instrumento
    ) =>
      traducirInstrumentoExcel(
        instrumento
      )
  );
}

function colocarMediciones(
  worksheet,
  mediciones
) {
  mediciones.forEach(
    (
      medicion,
      index
    ) => {
      const fila =
        FILA_INICIO_MEDICIONES +
        index;

      worksheet.getCell(
        `A${fila}`
      ).value =
        medicion.letra ||
        "";

      worksheet.getCell(
        `B${fila}`
      ).value =
        traducirParametroExcel(
          medicion.parametro
        );

      worksheet.getCell(
        `C${fila}`
      ).value =
        medicion.instrumento
          ? traducirInstrumentoExcel(
              obtenerNombreInstrumento(
                medicion.instrumento
              )
            )
          : "";

      worksheet.getCell(
        `D${fila}`
      ).value =
        medicion.unidad ||
        "";

      const lecturas =
        Array.isArray(
          medicion.medicionesAutomaticas
        )
          ? medicion.medicionesAutomaticas
          : [];

      for (
        let i = 0;
        i < 5;
        i++
      ) {
        const columna =
          String.fromCharCode(
            69 + i
          );

        const valor =
          lecturas[i];

        const celda =
          worksheet.getCell(
            `${columna}${fila}`
          );

        if (
          valor === "" ||
          valor === null ||
          valor === undefined
        ) {
          celda.value =
            null;
        } else {
          celda.value =
            Number(
              valor
            );
        }

        celda.numFmt =
          "0.00";
      }

      const media =
        worksheet.getCell(
          `J${fila}`
        );

      if (
        medicion.media === "" ||
        medicion.media === null ||
        medicion.media === undefined
      ) {
        media.value =
          null;
      } else {
        media.value =
          Number(
            medicion.media
          );
      }

      media.numFmt =
        "0.00";

      const original =
        worksheet.getCell(
          `K${fila}`
        );

      if (
        medicion.medidaOriginal === "" ||
        medicion.medidaOriginal === null ||
        medicion.medidaOriginal === undefined
      ) {
        original.value =
          null;
      } else {
        original.value =
          Number(
            medicion.medidaOriginal
          );
      }

      original.numFmt =
        "0.00";

      const desviacion =
        worksheet.getCell(
          `L${fila}`
        );

      if (
        medicion.desviacion === "" ||
        medicion.desviacion === null ||
        medicion.desviacion === undefined
      ) {
        desviacion.value =
          null;
      } else {
        desviacion.value =
          Number(
            medicion.desviacion
          );
      }

      desviacion.numFmt =
        "0.00";

      worksheet.getCell(
        `M${fila}`
      ).value =
        medicion.tolerancia ||
        "±0,10";
    }
  );
}

function colocarSeccionesFinales(
  worksheet,
  mediciones,
  instrumentosUtilizados
) {
  const diferencia =
    mediciones.length -
    FILAS_MEDICION_ORIGINALES;

  const filaObservaciones =
    FILA_INICIO_SECCIONES +
    diferencia;

  const encabezadoObservaciones =
    worksheet.getCell(
      `A${filaObservaciones}`
    );

  encabezadoObservaciones.value =
    "OBSERVATIONS ATOM Tech S.A.S";

  encabezadoObservaciones.font = {
    ...encabezadoObservaciones.font,

    color: {
      argb:
        "FFFFFFFF",
    },
  };

  worksheet.getCell(
    `A${filaObservaciones + 1}`
  ).value =
    OBSERVACION;

  worksheet.getCell(
    `A${filaObservaciones + 2}`
  ).value =
    "MEASUREMENT INSTRUMENTS USED";

  const instrumentosTraducidos =
    traducirListadoInstrumentosExcel(
      instrumentosUtilizados
    );

  worksheet.getCell(
    `A${filaObservaciones + 3}`
  ).value =
    instrumentosTraducidos.join(
      "; "
    );
}

function configurarImpresion(
  worksheet,
  cantidadMediciones
) {
  const diferencia =
    cantidadMediciones -
    FILAS_MEDICION_ORIGINALES;

  const filaFinal =
    20 +
    diferencia;

  worksheet.pageSetup.printArea =
    `A1:M${filaFinal}`;

  worksheet.pageSetup.orientation =
    "landscape";

  worksheet.pageSetup.paperSize =
    9;

  worksheet.pageSetup.fitToPage =
    true;

  worksheet.pageSetup.fitToWidth =
    1;

  worksheet.pageSetup.fitToHeight =
    0;

  worksheet.pageSetup.margins = {
    left: 0.25,
    right: 0.25,
    top: 0.5,
    bottom: 0.5,
    header: 0.2,
    footer: 0.2,
  };
}

export async function prepararExcel({
  datosGenerales,
  mediciones,
  instrumentosUtilizados,
}) {
  if (
    !Array.isArray(
      mediciones
    ) ||
    mediciones.length === 0
  ) {
    throw new Error(
      "Agrega al menos una medida antes de generar el Excel."
    );
  }

  const response =
    await fetch(
      NOMBRE_PLANTILLA
    );

  if (
    !response.ok
  ) {
    throw new Error(
      "No se encontró la plantilla AT-GT-P01-F06.xlsx en la carpeta public."
    );
  }

  const arrayBuffer =
    await response.arrayBuffer();

  const workbook =
    new ExcelJS.Workbook();

  await workbook.xlsx.load(
    arrayBuffer
  );

  const worksheet =
    workbook.getWorksheet(
      NOMBRE_HOJA
    );

  if (
    !worksheet
  ) {
    throw new Error(
      `No se encontró la hoja "${NOMBRE_HOJA}" en la plantilla.`
    );
  }

  descombinarSecciones(
    worksheet
  );

  ajustarFilasMedicion(
    worksheet,
    mediciones.length
  );

  const diferencia =
    mediciones.length -
    FILAS_MEDICION_ORIGINALES;

  combinarSecciones(
    worksheet,
    diferencia
  );

  colocarDatosGenerales(
    worksheet,
    datosGenerales
  );

  colocarMediciones(
    worksheet,
    mediciones
  );

  colocarSeccionesFinales(
    worksheet,
    mediciones,
    instrumentosUtilizados
  );

  configurarImpresion(
    worksheet,
    mediciones.length
  );

  return {
    workbook,
    worksheet,
  };
}

export async function generarExcel({
  datosGenerales,
  mediciones,
  instrumentosUtilizados,
}) {
  if (
    !Array.isArray(
      mediciones
    ) ||
    mediciones.length === 0
  ) {
    throw new Error(
      "Agrega al menos una medida antes de generar el Excel."
    );
  }

  const response =
    await fetch(
      NOMBRE_PLANTILLA
    );

  if (
    !response.ok
  ) {
    throw new Error(
      "No se encontró la plantilla AT-GT-P01-F06.xlsx en la carpeta public."
    );
  }

  const arrayBuffer =
    await response.arrayBuffer();

  const workbook =
    new ExcelJS.Workbook();

  await workbook.xlsx.load(
    arrayBuffer
  );

  const worksheet =
    workbook.getWorksheet(
      NOMBRE_HOJA
    );

  if (
    !worksheet
  ) {
    throw new Error(
      `No se encontró la hoja "${NOMBRE_HOJA}" en la plantilla.`
    );
  }

  descombinarSecciones(
    worksheet
  );

  const diferencia =
    ajustarFilasMedicion(
      worksheet,
      mediciones.length
    );

  combinarSecciones(
    worksheet,
    diferencia
  );

  colocarDatosGenerales(
    worksheet,
    datosGenerales
  );

  colocarMediciones(
    worksheet,
    mediciones
  );

  colocarSeccionesFinales(
    worksheet,
    mediciones,
    instrumentosUtilizados
  );

  configurarImpresion(
    worksheet,
    mediciones.length
  );

  const buffer =
    await workbook.xlsx.writeBuffer();

  const blob =
    new Blob(
      [buffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const enlace =
    document.createElement(
      "a"
    );

  enlace.href =
    url;

  const pn =
    datosGenerales?.pn
      ? String(
          datosGenerales.pn
        ).trim()
      : "";

  enlace.download =
    pn
      ? `METROLOGIA_${pn}.xlsx`
      : "METROLOGIA.xlsx";

  document.body.appendChild(
    enlace
  );

  enlace.click();

  enlace.remove();

  window.URL.revokeObjectURL(
    url
  );
}
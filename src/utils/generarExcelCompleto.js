import ExcelJS from "exceljs";

const HOJA_31 = "certificado 3.1";
const HOJA_INGENIERIA = "Ingenieria de proceso";
const HOJA_METROLOGIA = "AT-GT-P01-F06";

const TIPO_EXCEL =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

/* ============================================================
   UTILIDADES
============================================================ */

function clonarObjeto(obj) {
  if (obj === undefined || obj === null) {
    return obj;
  }

  if (typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => clonarObjeto(item));
  }

  const resultado = {};

  Object.keys(obj).forEach((key) => {
    try {
      resultado[key] = clonarObjeto(obj[key]);
    } catch {
      // Ignorar propiedades internas no clonables.
    }
  });

  return resultado;
}

/* ============================================================
   COPIAR CELDA
============================================================ */

function copiarCelda(origen, destino) {
  if (!origen || !destino) {
    return;
  }

  try {
    destino.value = origen.value;
  } catch {
    // Algunas propiedades pueden ser de solo lectura.
  }

  try {
    if (origen.style) {
      destino.style = clonarObjeto(origen.style);
    }
  } catch {
    // No detener el proceso si ExcelJS no permite alguna parte
    // del estilo.
  }

  try {
    if (origen.numFmt) {
      destino.numFmt = origen.numFmt;
    }
  } catch {
    // Ignorar.
  }

  try {
    if (origen.note) {
      destino.note = clonarObjeto(origen.note);
    }
  } catch {
    // Ignorar.
  }

  /*
   * IMPORTANTE:
   *
   * NO copiar hyperlink.
   *
   * ExcelJS puede exponer hyperlink como propiedad de solo lectura
   * al cargar un archivo existente.
   */
}

/* ============================================================
   COPIAR FILAS Y COLUMNAS
============================================================ */

function copiarFilasYColumnas(origen, destino) {
  const maxColumnas = origen.columnCount || 0;
  const maxFilas = origen.rowCount || 0;

  /* ---------- COLUMNAS ---------- */

  for (let c = 1; c <= maxColumnas; c++) {
    const columnaOrigen = origen.getColumn(c);
    const columnaDestino = destino.getColumn(c);

    try {
      if (columnaOrigen.width !== undefined) {
        columnaDestino.width = columnaOrigen.width;
      }
    } catch {
      // Ignorar.
    }

    try {
      if (columnaOrigen.hidden !== undefined) {
        columnaDestino.hidden = columnaOrigen.hidden;
      }
    } catch {
      // Ignorar.
    }

    try {
      if (columnaOrigen.outlineLevel !== undefined) {
        columnaDestino.outlineLevel = columnaOrigen.outlineLevel;
      }
    } catch {
      // Ignorar.
    }
  }

  /* ---------- FILAS ---------- */

  for (let r = 1; r <= maxFilas; r++) {
    const filaOrigen = origen.getRow(r);
    const filaDestino = destino.getRow(r);

    try {
      if (filaOrigen.height !== undefined) {
        filaDestino.height = filaOrigen.height;
      }
    } catch {
      // Ignorar.
    }

    try {
      if (filaOrigen.hidden !== undefined) {
        filaDestino.hidden = filaOrigen.hidden;
      }
    } catch {
      // Ignorar.
    }

    try {
      if (filaOrigen.outlineLevel !== undefined) {
        filaDestino.outlineLevel = filaOrigen.outlineLevel;
      }
    } catch {
      // Ignorar.
    }

    for (let c = 1; c <= maxColumnas; c++) {
      const celdaOrigen = filaOrigen.getCell(c);
      const celdaDestino = filaDestino.getCell(c);

      copiarCelda(celdaOrigen, celdaDestino);
    }
  }
}

/* ============================================================
   COPIAR COMBINACIONES
============================================================ */

function copiarCombinaciones(origen, destino) {
  let combinaciones = [];

  try {
    if (origen.model?.merges) {
      combinaciones = origen.model.merges;
    }
  } catch {
    // Ignorar.
  }

  if (
    (!combinaciones || combinaciones.length === 0) &&
    origen.mergedCells
  ) {
    combinaciones = origen.mergedCells;
  }

  if (
    (!combinaciones || combinaciones.length === 0) &&
    origen._merges
  ) {
    combinaciones = Object.keys(origen._merges);
  }

  if (!Array.isArray(combinaciones)) {
    return;
  }

  combinaciones.forEach((rango) => {
    try {
      if (typeof rango === "string") {
        destino.mergeCells(rango);
      }
    } catch {
      // Ignorar combinaciones que ya existan o no sean válidas.
    }
  });
}

/* ============================================================
   CONFIGURACIÓN DE IMPRESIÓN
============================================================ */

function copiarConfiguracionImpresion(origen, destino) {
  /*
   * No copiamos directamente:
   *
   * - views
   * - properties
   * - state
   * - position
   *
   * porque ExcelJS puede exponer algunas de estas propiedades
   * como readonly al cargar archivos existentes.
   *
   * La estructura visual de las hojas ya queda conservada por
   * filas, columnas, celdas y combinaciones.
   */
}

/* ============================================================
   COPIAR IMÁGENES
============================================================ */

function copiarImagenes(origen, destino, workbookOrigen, workbookDestino) {
  let imagenes = [];

  try {
    imagenes = origen.getImages();
  } catch {
    imagenes = [];
  }

  if (!imagenes || imagenes.length === 0) {
    return;
  }

  imagenes.forEach((imagen) => {
    try {
      const imageId = imagen.imageId;

      let medio = null;

      try {
        medio = workbookOrigen.model?.media?.[imageId];
      } catch {
        medio = null;
      }

      if (!medio) {
        return;
      }

      let nuevoImageId = null;

      /*
       * ExcelJS puede trabajar con buffer o base64 dependiendo
       * de cómo se haya cargado el archivo.
       */

      if (medio.buffer) {
        nuevoImageId = workbookDestino.addImage({
          buffer: medio.buffer,
          extension: medio.extension,
        });
      } else if (medio.base64) {
        nuevoImageId = workbookDestino.addImage({
          base64: medio.base64,
          extension: medio.extension,
        });
      }

      if (nuevoImageId === null || nuevoImageId === undefined) {
        return;
      }

      if (imagen.range) {
        destino.addImage(nuevoImageId, imagen.range);
      }
    } catch (error) {
      console.warn(
        "No fue posible copiar una imagen:",
        error
      );
    }
  });
}

/* ============================================================
   COPIAR HOJA
============================================================ */

function copiarHoja(workbookOrigen, nombreHoja, workbookDestino) {
  const origen = workbookOrigen.getWorksheet(nombreHoja);

  if (!origen) {
    throw new Error(
      `No se encontró la hoja "${nombreHoja}" en el workbook de origen.`
    );
  }

  /*
   * Si por alguna razón ya existe una hoja con ese nombre,
   * la eliminamos antes de crearla.
   */
  const existente = workbookDestino.getWorksheet(nombreHoja);

  if (existente) {
    workbookDestino.removeWorksheet(existente.id);
  }

  const destino = workbookDestino.addWorksheet(nombreHoja);

  copiarFilasYColumnas(origen, destino);
  copiarCombinaciones(origen, destino);
  copiarConfiguracionImpresion(origen, destino);
  copiarImagenes(
    origen,
    destino,
    workbookOrigen,
    workbookDestino
  );

  return destino;
}

/* ============================================================
   GENERADOR COMPLETO
============================================================ */

export async function generarExcelCompleto({
  workbook31,
  workbookIngenieria,
  workbookMetrologia,
  pn,
}) {
  try {
    console.log("GENERADOR: iniciando archivo completo");

    /*
     * ==========================================================
     * IMPORTANTE
     * ==========================================================
     *
     * NO creamos un workbook nuevo.
     *
     * Usamos directamente el workbook del CERTIFICADO 3.1 como
     * workbook final.
     *
     * Esto permite conservar:
     * - colores originales
     * - tema de Excel
     * - imágenes
     * - bordes
     * - combinaciones
     * - formatos
     * - configuración visual
     *
     * del formato 3.1.
     *
     * Este era precisamente el punto que estaba provocando
     * que los azules terminaran viéndose verdosos.
     */

    const workbookFinal = workbook31;

    /* ----------------------------------------------------------
       3.1
    ---------------------------------------------------------- */

    const hoja31 = workbookFinal.getWorksheet(HOJA_31);

    if (!hoja31) {
      throw new Error(
        `No se encontró la hoja "${HOJA_31}" en el workbook 3.1.`
      );
    }

    console.log("GENERADOR: hoja 3.1 OK");

    /* ----------------------------------------------------------
       INGENIERÍA
    ---------------------------------------------------------- */

    copiarHoja(
      workbookIngenieria,
      HOJA_INGENIERIA,
      workbookFinal
    );

    console.log("GENERADOR: Ingeniería OK");

    /* ----------------------------------------------------------
       METROLOGÍA
    ---------------------------------------------------------- */

    console.log("GENERADOR: iniciando Metrología");

    copiarHoja(
      workbookMetrologia,
      HOJA_METROLOGIA,
      workbookFinal
    );

    console.log("GENERADOR: Metrología OK");

    /* ----------------------------------------------------------
       ORDEN DE LAS HOJAS
       El 3.1 ya está primero.
       Las otras dos se agregan después.
    ---------------------------------------------------------- */

    console.log("GENERADOR: escribiendo workbook");

    const buffer = await workbookFinal.xlsx.writeBuffer();

    console.log("GENERADOR: writeBuffer OK");

    const nombreArchivo = `DOCUMENTACION_${pn || "SIN_PN"}.xlsx`;

const blob = new Blob([buffer], {
  type: TIPO_EXCEL,
});

const url = URL.createObjectURL(blob);

const enlace = document.createElement("a");
enlace.href = url;
enlace.download = nombreArchivo;

document.body.appendChild(enlace);
enlace.click();
enlace.remove();

URL.revokeObjectURL(url);

    console.log(
      `GENERADOR: archivo descargado -> ${nombreArchivo}`
    );

    return {
      buffer,
      nombreArchivo,
    };
  } catch (error) {
    console.error(
      "GENERADOR: error generando archivo completo",
      error
    );

    throw error;
  }
}
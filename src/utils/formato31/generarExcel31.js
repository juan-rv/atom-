// =====================================================
// GENERADOR EXCEL - FORMATO 3.1
// =====================================================

// Plantilla oficial:
// AT-GT-P01-F12_EN.xlsx

// Hoja:
// certificado 3.1

// =====================================================

import ExcelJS from "exceljs";

import {
  obtenerMaterial,
} from "./materiales";

import {
  obtenerProveedorFormatoExcel,
} from "./proveedores";

import {
  calcularPesoNeto,
} from "./calculos31";


// =====================================================
// CONFIGURACIÓN
// =====================================================

const NOMBRE_PLANTILLA =
  "/AT-GT-P01-F12.xlsx";

const NOMBRE_HOJA =
  "certificado 3.1";


// =====================================================
// TEXTO FIJO PARA EL EXCEL
// =====================================================

const OBSERVACION_FINAL =
  "Atom Tech certifies that the information provided herein is traceable to the properties of the indicated material and that the machining and metrology processes comply with the standards requested by the customer";


// =====================================================
// VALIDACIONES
// =====================================================

function textoCompleto(valor) {

  return (
    typeof valor === "string" &&
    valor.trim() !== ""
  );

}


function numeroCompleto(valor) {

  if (
    valor === "" ||
    valor === null ||
    valor === undefined
  ) {

    return false;

  }


  const numero =
    Number(valor);


  return (
    Number.isFinite(numero) &&
    numero > 0
  );

}


// =====================================================
// VALIDAR DATOS DEL FORMATO
// =====================================================

function validarDatosFormato31(datos) {

  const errores = [];


  // ---------------------------------------------------
  // INFORMACIÓN INICIAL
  // ---------------------------------------------------

  if (
    !textoCompleto(datos.item)
  ) {

    errores.push(
      "Ítem / Nombre"
    );

  }


  if (
    !textoCompleto(datos.pn)
  ) {

    errores.push(
      "P/N"
    );

  }


  if (
    !numeroCompleto(datos.cantidad)
  ) {

    errores.push(
      "Cantidad"
    );

  }


  if (
    !textoCompleto(
      datos.fechaSolicitud
    )
  ) {

    errores.push(
      "Fecha de solicitud"
    );

  }


  if (
    !textoCompleto(
      datos.fechaEntrega
    )
  ) {

    errores.push(
      "Fecha de entrega"
    );

  }


  if (
    !textoCompleto(
      datos.fechaLiberacion
    )
  ) {

    errores.push(
      "Fecha de liberación"
    );

  }


  if (
    !textoCompleto(datos.cliente)
  ) {

    errores.push(
      "Cliente"
    );

  }


  if (
    !textoCompleto(datos.observacion)
  ) {

    errores.push(
      "Observación"
    );

  }


  if (
    !textoCompleto(datos.proveedorId)
  ) {

    errores.push(
      "Proveedor"
    );

  }


  if (
    !textoCompleto(datos.materialId)
  ) {

    errores.push(
      "Material"
    );

  }


  // ---------------------------------------------------
  // DATOS COMPARTIDOS
  // ---------------------------------------------------

  if (
    !textoCompleto(datos.op)
  ) {

    errores.push(
      "OP"
    );

  }


  if (
    !textoCompleto(datos.ocPo)
  ) {

    errores.push(
      "OC / PO"
    );

  }


  if (
    !textoCompleto(datos.codigoCliente)
  ) {

    errores.push(
      "Código de cliente"
    );

  }


  // ---------------------------------------------------
  // DESCRIPCIÓN DEL PRODUCTO
  // ---------------------------------------------------

  if (
    !textoCompleto(
      datos.formaSuministro
    )
  ) {

    errores.push(
      "Forma de suministro"
    );

  }


  const dimensiones =
    datos.dimensiones || {};


  // ---------------------------------------------------
  // REDONDO
  // ---------------------------------------------------

  if (
    datos.formaSuministro ===
    "redondo"
  ) {

    if (
      !numeroCompleto(
        dimensiones.diametro
      )
    ) {

      errores.push(
        "Diámetro"
      );

    }


    if (
      !numeroCompleto(
        dimensiones.largo
      )
    ) {

      errores.push(
        "Largo"
      );

    }

  }


  // ---------------------------------------------------
  // PLACA
  // ---------------------------------------------------

  if (
    datos.formaSuministro ===
    "placa"
  ) {

    if (
      !numeroCompleto(
        dimensiones.largo
      )
    ) {

      errores.push(
        "Largo"
      );

    }


    if (
      !numeroCompleto(
        dimensiones.ancho
      )
    ) {

      errores.push(
        "Ancho"
      );

    }


    if (
      !numeroCompleto(
        dimensiones.alto
      )
    ) {

      errores.push(
        "Alto"
      );

    }

  }


  // ---------------------------------------------------
  // PESOS
  // ---------------------------------------------------

  if (
    !numeroCompleto(
      datos.pesoMecanizado
    )
  ) {

    errores.push(
      "Peso mecanizado"
    );

  }


  if (
    !numeroCompleto(
      datos.qty
    )
  ) {

    errores.push(
      "QTY"
    );

  }


  // ---------------------------------------------------
  // CONDICIONES DE MATERIA PRIMA
  // ---------------------------------------------------

  const condiciones =
    datos.condicionesMateriaPrima ||
    {};


  if (
    !textoCompleto(
      condiciones.tratamientoCalcioSilicio
    )
  ) {

    errores.push(
      "Tratamiento de calcio y silicio"
    );

  }


  if (
    !textoCompleto(
      condiciones.mpiTest
    )
  ) {

    errores.push(
      "MPI Test"
    );

  }


  if (
    !textoCompleto(
      condiciones.testUltrasonico
    )
  ) {

    errores.push(
      "Test ultrasónico"
    );

  }


  // ---------------------------------------------------
  // RESULTADO
  // ---------------------------------------------------

  if (
    errores.length > 0
  ) {

    throw new Error(

      "El Formato 3.1 está incompleto.\n\n" +

      "Campos pendientes:\n" +

      errores
        .map(
          (error) =>
            `• ${error}`
        )
        .join("\n")

    );

  }

}


// =====================================================
// CONVERTIR FECHA
// =====================================================

// Recibe:
// YYYY-MM-DD

// Devuelve:
// objeto Date

// =====================================================

function convertirFecha(fechaTexto) {

  if (!fechaTexto) {

    return null;

  }


  const partes =
    String(
      fechaTexto
    ).split("-");


  if (
    partes.length !== 3
  ) {

    return null;

  }


  const año =
    Number(partes[0]);

  const mes =
    Number(partes[1]);

  const dia =
    Number(partes[2]);


  if (
    !año ||
    !mes ||
    !dia
  ) {

    return null;

  }


  return new Date(
    año,
    mes - 1,
    dia
  );

}


// =====================================================
// COLOCAR FECHA
// =====================================================

// La plantilla NO utiliza una única celda para la fecha.
//
// FECHA SOLICITUD
// Q5 = día
// R5 = mes
// S5 = año
//
// FECHA ENTREGA
// Q6 = día
// R6 = mes
// S6 = año
//
// FECHA LIBERACIÓN
// Q29 = día
// R29 = mes
// S29 = año
//
// =====================================================

function colocarFecha(
  worksheet,
  celdaDia,
  celdaMes,
  celdaAño,
  fecha
) {

  const fechaConvertida =
    convertirFecha(
      fecha
    );


  // ---------------------------------------------------
  // LIMPIAR CELDAS
  // ---------------------------------------------------

  if (
    !fechaConvertida
  ) {

    worksheet.getCell(
      celdaDia
    ).value = "";

    worksheet.getCell(
      celdaMes
    ).value = "";

    worksheet.getCell(
      celdaAño
    ).value = "";

    return;

  }


  // ---------------------------------------------------
  // COMPONENTES DE FECHA
  // ---------------------------------------------------

  const dia =
    fechaConvertida.getDate();

  const mes =
    fechaConvertida.getMonth() + 1;

  const año =
    fechaConvertida.getFullYear();


  // ---------------------------------------------------
  // DÍA
  // ---------------------------------------------------

  worksheet.getCell(
    celdaDia
  ).value =
    dia;


  // ---------------------------------------------------
  // MES
  // ---------------------------------------------------

  worksheet.getCell(
    celdaMes
  ).value =
    mes;


  // ---------------------------------------------------
  // AÑO
  // ---------------------------------------------------

  worksheet.getCell(
    celdaAño
  ).value =
    año;


  // ---------------------------------------------------
  // ALINEACIÓN
  // ---------------------------------------------------

  [
    celdaDia,
    celdaMes,
    celdaAño,
  ].forEach(
    (referencia) => {

      const celda =
        worksheet.getCell(
          referencia
        );


      celda.alignment = {

        horizontal:
          "center",

        vertical:
          "middle",

      };

    }
  );

}


// =====================================================
// MPa → Kg/mm²
// =====================================================

function convertirMPaAKgMm2(
  valor
) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {

    return "";

  }


  const numero =
    Number(valor);


  if (
    !Number.isFinite(numero)
  ) {

    return "";

  }


  return Number(
    (
      numero /
      9.80665
    ).toFixed(2)
  );

}


// =====================================================
// OBTENER NÚMERO
// =====================================================

function obtenerNumero(
  valor
) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {

    return null;

  }


  const numero =
    Number(valor);


  return Number.isFinite(
    numero
  )
    ? numero
    : null;

}


// =====================================================
// INFORMACIÓN INICIAL
// =====================================================

function colocarDatosIniciales(
  worksheet,
  datos
) {

  // ---------------------------------------------------
  // ITEM
  // ---------------------------------------------------

  worksheet.getCell(
    "C5"
  ).value =
    datos.item.trim();


  // ---------------------------------------------------
  // CANTIDAD
  // ---------------------------------------------------

  worksheet.getCell(
    "L5"
  ).value =
    Number(
      datos.cantidad
    );


  // ---------------------------------------------------
  // FECHA SOLICITUD
  // ---------------------------------------------------

  colocarFecha(
    worksheet,
    "Q5",
    "R5",
    "S5",
    datos.fechaSolicitud
  );


  // ---------------------------------------------------
  // MATERIAL
  // ---------------------------------------------------

  const material =
    obtenerMaterial(
      datos.materialId
    );


  worksheet.getCell(
    "C6"
  ).value =
    material
      ? material.nombre
      : "";


  // ---------------------------------------------------
  // TIPO DE PROCESO
  // ---------------------------------------------------

  worksheet.getCell(
    "D7"
  ).value =
    "X";


  worksheet.getCell(
    "E7"
  ).value =
    "MANUFACTURING";


  // ---------------------------------------------------
  // CLIENTE
  // ---------------------------------------------------

  worksheet.getCell(
    "D8"
  ).value =
    datos.cliente.trim();


  // ---------------------------------------------------
  // OBSERVACIÓN
  // ---------------------------------------------------

  worksheet.getCell(
    "D9"
  ).value =
    datos.observacion.trim();


  // ---------------------------------------------------
  // PROVEEDOR
  // ---------------------------------------------------

  worksheet.getCell(
    "D10"
  ).value =
    obtenerProveedorFormatoExcel(
      datos.proveedorId
    );


  // ---------------------------------------------------
  // FECHA ENTREGA
  // ---------------------------------------------------

  colocarFecha(
    worksheet,
    "Q6",
    "R6",
    "S6",
    datos.fechaEntrega
  );

}


// =====================================================
// COMPOSICIÓN QUÍMICA
// =====================================================

function colocarComposicionQuimica(
  worksheet,
  material
) {

  if (
    !material ||
    !Array.isArray(
      material.composicionQuimica
    )
  ) {

    return;

  }


  const columnas = [
    "D",
    "E",
    "F",
    "G",
    "H",
  ];


  material.composicionQuimica
    .slice(0, 5)
    .forEach(
      (elemento, index) => {

        const columna =
          columnas[index];


        if (!columna) {

          return;

        }


        worksheet.getCell(
          `${columna}11`
        ).value =
          elemento.elemento ||
          "";


        worksheet.getCell(
          `${columna}12`
        ).value =
          elemento.minimo ??
          "";


        worksheet.getCell(
          `${columna}13`
        ).value =
          elemento.maximo ??
          "";

      }
    );

}


// =====================================================
// PROPIEDADES MECÁNICAS
// =====================================================

function colocarPropiedadesMecanicas(
  worksheet,
  material
) {

  if (
    !material ||
    !material.propiedadesMecanicas
  ) {

    return;

  }


  const propiedades =
    material.propiedadesMecanicas;


  // ---------------------------------------------------
  // TRACCIÓN
  // ---------------------------------------------------

  if (
    propiedades.traccion
  ) {

    worksheet.getCell(
      "F15"
    ).value =
      convertirMPaAKgMm2(
        propiedades.traccion.minimo
      );

  }


  // ---------------------------------------------------
  // FLUENCIA
  // ---------------------------------------------------

  if (
    propiedades.fluencia
  ) {

    worksheet.getCell(
      "F16"
    ).value =
      convertirMPaAKgMm2(
        propiedades.fluencia.minimo
      );

  }


  // ---------------------------------------------------
  // ELONGACIÓN
  // ---------------------------------------------------

  if (
    propiedades.elongacion
  ) {

    worksheet.getCell(
      "F17"
    ).value =
      propiedades.elongacion.minimo ??
      "";

  }


  // ---------------------------------------------------
  // DUREZA
  // ---------------------------------------------------

  if (
    propiedades.durezaHB
  ) {

    worksheet.getCell(
      "F18"
    ).value =
      propiedades.durezaHB.minimo ??
      "";

  }

}


// =====================================================
// DESCRIPCIÓN DEL PRODUCTO
// =====================================================

function colocarDescripcionProducto(
  worksheet,
  datos,
  material
) {

  // ---------------------------------------------------
  // PIEZA
  // ---------------------------------------------------

  worksheet.getCell(
    "N13"
  ).value =
    datos.item.trim();


  // ---------------------------------------------------
  // MATERIAL
  // ---------------------------------------------------

  worksheet.getCell(
    "N14"
  ).value =
    material
      ? material.nombre
      : "";


  // ---------------------------------------------------
  // DIMENSIONES
  // ---------------------------------------------------

  let dimensionTexto =
    "";


  const dimensiones =
    datos.dimensiones || {};


  if (
    datos.formaSuministro ===
    "redondo"
  ) {

    dimensionTexto =
      `Ø ${dimensiones.diametro} mm x ${dimensiones.largo} mm`;

  }


  if (
    datos.formaSuministro ===
    "placa"
  ) {

    dimensionTexto =
      `${dimensiones.largo} x ${dimensiones.ancho} x ${dimensiones.alto} mm`;

  }


  worksheet.getCell(
    "N15"
  ).value =
    dimensionTexto;


  // ---------------------------------------------------
  // PESO NETO
  // ---------------------------------------------------

  const pesoNeto =
    calcularPesoNeto(
      datos.formaSuministro,
      dimensiones,
      material.densidad
    );


  if (
    pesoNeto === null
  ) {

    throw new Error(
      "No fue posible calcular el peso neto."
    );

  }


  worksheet.getCell(
    "N16"
  ).value =
    pesoNeto;


  worksheet.getCell(
    "N16"
  ).numFmt =
    "0.00";


  // ---------------------------------------------------
  // PESO MECANIZADO
  // ---------------------------------------------------

  const pesoMecanizado =
    obtenerNumero(
      datos.pesoMecanizado
    );


  worksheet.getCell(
    "N17"
  ).value =
    pesoMecanizado;


  worksheet.getCell(
    "N17"
  ).numFmt =
    "0.00";


  // ---------------------------------------------------
  // QTY
  // ---------------------------------------------------

  worksheet.getCell(
    "N18"
  ).value =
    Number(
      datos.qty
    );

}


// =====================================================
// CONDICIONES DE MATERIA PRIMA
// =====================================================

function colocarCondicionesMateriaPrima(
  worksheet,
  datos
) {

  const condiciones =
    datos.condicionesMateriaPrima ||
    {};


  // ---------------------------------------------------
  // CALCIO Y SILICIO
  // ---------------------------------------------------

  worksheet.getCell(
    "I21"
  ).value =
    condiciones
      .tratamientoCalcioSilicio
      .trim();


  // ---------------------------------------------------
  // SUMINISTRO
  // ---------------------------------------------------

  let suministro =
    "";


  if (
    datos.formaSuministro ===
    "redondo"
  ) {

    suministro =
      "Round";

  }


  if (
    datos.formaSuministro ===
    "placa"
  ) {

    suministro =
      "Plate";

  }


  worksheet.getCell(
    "I22"
  ).value =
    suministro;


  // ---------------------------------------------------
  // MPI TEST
  // ---------------------------------------------------

  worksheet.getCell(
    "I23"
  ).value =
    condiciones
      .mpiTest
      .trim();


  // ---------------------------------------------------
  // TEST ULTRASÓNICO
  // ---------------------------------------------------

  worksheet.getCell(
    "I24"
  ).value =
    condiciones
      .testUltrasonico
      .trim();

}


// =====================================================
// LIBERACIÓN
// =====================================================

function colocarLiberacion(
  worksheet,
  datos
) {

  // ---------------------------------------------------
  // APROBADO POR
  // ---------------------------------------------------
  // Se conserva intacto.
  // ---------------------------------------------------


  // ---------------------------------------------------
  // RECHAZADO POR
  // ---------------------------------------------------
  // Se conserva intacto.
  // ---------------------------------------------------


  // ---------------------------------------------------
  // FECHA DE LIBERACIÓN
  // ---------------------------------------------------

  colocarFecha(
    worksheet,
    "Q29",
    "R29",
    "S29",
    datos.fechaLiberacion
  );


  // ---------------------------------------------------
  // CÓDIGO CLIENTE
  // ---------------------------------------------------

  worksheet.getCell(
    "D30"
  ).value =
    datos.codigoCliente.trim();


  // ---------------------------------------------------
  // OC / PO
  // ---------------------------------------------------

  worksheet.getCell(
    "L30"
  ).value =
    datos.ocPo.trim();


  // ---------------------------------------------------
  // ÍTEM
  // ---------------------------------------------------

  worksheet.getCell(
    "Q30"
  ).value =
    datos.item.trim();

}


// =====================================================
// CONFIGURACIÓN DE IMPRESIÓN
// =====================================================

function configurarImpresion(
  worksheet
) {

  worksheet.pageSetup = {

    orientation:
      "portrait",

    paperSize:
      9,

    fitToPage:
      true,

    fitToWidth:
      1,

    fitToHeight:
      1,

    printArea:
      "A1:S32",

    horizontalDpi:
      300,

    verticalDpi:
      300,

    margins: {

      left:
        0.25,

      right:
        0.25,

      top:
        0.35,

      bottom:
        0.35,

      header:
        0.1,

      footer:
        0.1,

    },

  };


  worksheet.pageSetup.horizontalCentered =
    true;

}


// =====================================================
// LIMPIAR NOMBRE DE ARCHIVO
// =====================================================

function limpiarNombreArchivo(
  valor
) {

  return String(
    valor
  )
    .trim()
    .replace(
      /[<>:"/\\|?*\x00-\x1F]/g,
      "_"
    )
    .replace(
      /\s+/g,
      "_"
    );

}


// =====================================================
// FUNCIÓN PRINCIPAL
// =====================================================

// =====================================================
// PREPARAR EXCEL - FORMATO 3.1
// =====================================================

export async function prepararExcel31({
  datos,
}) {

  // ---------------------------------------------------
  // VALIDACIÓN
  // ---------------------------------------------------

  if (!datos) {
    throw new Error(
      "No se recibieron los datos del Formato 3.1."
    );
  }


  validarDatosFormato31(
    datos
  );


  // ---------------------------------------------------
  // MATERIAL
  // ---------------------------------------------------

  const material =
    obtenerMaterial(
      datos.materialId
    );


  if (!material) {
    throw new Error(
      "No fue posible encontrar el material seleccionado."
    );
  }


  // ---------------------------------------------------
  // PROVEEDOR
  // ---------------------------------------------------

  const proveedor =
    obtenerProveedorFormatoExcel(
      datos.proveedorId
    );

  if (
    !proveedor ||
    !textoCompleto(proveedor)
  ) {
    throw new Error(
      "No fue posible encontrar el proveedor seleccionado."
    );
  }


  // ---------------------------------------------------
  // CARGAR PLANTILLA
  // ---------------------------------------------------

  const response =
    await fetch(
      NOMBRE_PLANTILLA
    );


  if (!response.ok) {
    throw new Error(
      "No se encontró la plantilla AT-GT-P01-F12.xlsx en la carpeta public."
    );
  }


  const arrayBuffer =
    await response.arrayBuffer();


  // ---------------------------------------------------
  // CREAR WORKBOOK
  // ---------------------------------------------------

  const workbook =
    new ExcelJS.Workbook();

  await workbook.xlsx.load(
    arrayBuffer
  );


  // ---------------------------------------------------
  // OBTENER HOJA
  // ---------------------------------------------------

  const worksheet =
    workbook.getWorksheet(
      NOMBRE_HOJA
    );


  if (!worksheet) {
    throw new Error(
      `No se encontró la hoja "${NOMBRE_HOJA}" en la plantilla.`
    );
  }


  // ---------------------------------------------------
  // COLOCAR INFORMACIÓN
  // ---------------------------------------------------

  colocarDatosIniciales(
    worksheet,
    datos
  );


  colocarComposicionQuimica(
    worksheet,
    material
  );


  colocarPropiedadesMecanicas(
    worksheet,
    material
  );


  colocarDescripcionProducto(
    worksheet,
    datos,
    material
  );


  colocarCondicionesMateriaPrima(
    worksheet,
    datos
  );


  colocarLiberacion(
    worksheet,
    datos
  );


  // ---------------------------------------------------
  // OBSERVACIÓN FINAL
  // ---------------------------------------------------

  worksheet.getCell(
    "A26"
  ).value =
    OBSERVACION_FINAL;


  // ---------------------------------------------------
  // IMPRESIÓN
  // ---------------------------------------------------

  configurarImpresion(
    worksheet
  );


  // ---------------------------------------------------
  // DEVOLVER LIBRO PREPARADO
  // ---------------------------------------------------

  return {
    workbook,
    worksheet,
  };
}


// =====================================================
// GENERAR Y DESCARGAR EXCEL 3.1
// =====================================================

// Se conserva esta función para no romper
// ninguna parte existente del proyecto.
// =====================================================

export async function generarExcel31({
  datos,
}) {

  const {
    workbook,
  } =
    await prepararExcel31({
      datos,
    });


  // ---------------------------------------------------
  // GENERAR BUFFER
  // ---------------------------------------------------

  const buffer =
    await workbook.xlsx.writeBuffer();


  // ---------------------------------------------------
  // CREAR BLOB
  // ---------------------------------------------------

  const blob =
    new Blob(
      [
        buffer,
      ],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );


  // ---------------------------------------------------
  // CREAR URL
  // ---------------------------------------------------

  const url =
    URL.createObjectURL(
      blob
    );


  // ---------------------------------------------------
  // CREAR ENLACE
  // ---------------------------------------------------

  const enlace =
    document.createElement(
      "a"
    );


  enlace.href =
    url;


  // ---------------------------------------------------
  // NOMBRE DEL ARCHIVO
  // ---------------------------------------------------

  const pnArchivo =
    limpiarNombreArchivo(
      datos.pn
    );

  enlace.download =
    `Certificate_3.1_${pnArchivo}.xlsx`;


  // ---------------------------------------------------
  // DESCARGAR
  // ---------------------------------------------------

  document.body.appendChild(
    enlace
  );

  enlace.click();

  document.body.removeChild(
    enlace
  );

  URL.revokeObjectURL(
    url
  );
}
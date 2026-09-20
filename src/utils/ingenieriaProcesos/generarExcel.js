import ExcelJS from "exceljs";
import { obtenerMaterial } from "../formato31/materiales";

const NOMBRE_PLANTILLA =
  "/AT-GT-P01-F05.xlsx";

const NOMBRE_HOJA =
  "Ingenieria de proceso";

const FILA_INICIO_BLOQUES = 18;


/*
=====================================================
CLONAR
=====================================================
*/

function clonar(valor) {
  if (
    valor === undefined ||
    valor === null
  ) {
    return valor;
  }

  if (
    typeof valor === "object"
  ) {
    return JSON.parse(
      JSON.stringify(valor)
    );
  }

  return valor;
}


/*
=====================================================
CAPTURAR FILA MODELO
=====================================================
*/

function capturarFilaModelo(
  worksheet,
  fila
) {
  const row =
    worksheet.getRow(fila);

  return {
    height:
      row.height,

    styles:
      Array.from(
        {
          length: 13,
        },
        (_, index) =>
          clonar(
            row.getCell(
              index + 1
            ).style
          )
      ),

    numFmts:
      Array.from(
        {
          length: 13,
        },
        (_, index) =>
          row.getCell(
            index + 1
          ).numFmt
      ),

    alignments:
      Array.from(
        {
          length: 13,
        },
        (_, index) =>
          clonar(
            row.getCell(
              index + 1
            ).alignment
          )
      ),

    protections:
      Array.from(
        {
          length: 13,
        },
        (_, index) =>
          clonar(
            row.getCell(
              index + 1
            ).protection
          )
      ),
  };
}


/*
=====================================================
APLICAR FILA MODELO
=====================================================
*/

function aplicarFilaModelo(
  worksheet,
  modelo,
  filaDestino
) {
  const destino =
    worksheet.getRow(
      filaDestino
    );

  destino.height =
    modelo.height;

  for (
    let columna = 1;
    columna <= 13;
    columna += 1
  ) {
    const cell =
      destino.getCell(
        columna
      );

    cell.style =
      clonar(
        modelo.styles[
          columna - 1
        ]
      );

    cell.numFmt =
      modelo.numFmts[
        columna - 1
      ];

    cell.alignment =
      clonar(
        modelo.alignments[
          columna - 1
        ]
      );

    cell.protection =
      clonar(
        modelo.protections[
          columna - 1
        ]
      );
  }
}


/*
=====================================================
FORMATEAR FECHA
=====================================================
*/

function formatearFecha(
  fecha
) {
  if (!fecha) {
    return "";
  }

  const partes =
    String(fecha).split("-");

  if (
    partes.length !== 3
  ) {
    return fecha;
  }

  const [
    año,
    mes,
    dia,
  ] = partes;

  return `${dia}/${mes}/${año}`;
}


/*
=====================================================
COLOCAR FECHA CABECERA
=====================================================
*/

function colocarFechaCabecera(
  worksheet,
  fecha
) {
  if (!fecha) {
    return;
  }

  const partes =
    String(fecha).split("-");

  if (
    partes.length !== 3
  ) {
    return;
  }

  const [
    año,
    mes,
    dia,
  ] = partes;

  worksheet.getCell(
    "B7"
  ).value = dia;

  worksheet.getCell(
    "C7"
  ).value = mes;

  worksheet.getCell(
    "D7"
  ).value =
    año.slice(-2);
}


/*
=====================================================
DATOS FORMATO 3.1
=====================================================
*/

function obtenerDatosFormato31(
  datosIngenieria
) {
  return (
    datosIngenieria?.datosFormato31 ||
    {}
  );
}


/*
=====================================================
DIMENSIÓN EN BRUTO
=====================================================
*/

function obtenerDimensionBruto(
  datosIngenieria
) {
  if (
    datosIngenieria?.dimensionBruto
  ) {
    return datosIngenieria.dimensionBruto;
  }

  const datos31 =
    obtenerDatosFormato31(
      datosIngenieria
    );

  const forma =
    datos31.formaSuministro ||
    "";

  const dimensiones =
    datos31.dimensiones ||
    {};

  if (
    forma === "redondo"
  ) {
    const diametro =
      dimensiones.diametro ??
      "";

    const largo =
      dimensiones.largo ??
      "";

    if (
      diametro === "" &&
      largo === ""
    ) {
      return "";
    }

    return `Ø ${diametro} mm × ${largo} mm`;
  }

  if (
    forma === "placa"
  ) {
    const largo =
      dimensiones.largo ??
      "";

    const ancho =
      dimensiones.ancho ??
      "";

    const alto =
      dimensiones.alto ??
      "";

    if (
      largo === "" &&
      ancho === "" &&
      alto === ""
    ) {
      return "";
    }

    return `${largo} × ${ancho} × ${alto} mm`;
  }

  return "";
}


/*
=====================================================
TRADUCCIÓN DE MÁQUINAS PARA EL EXCEL
=====================================================

La interfaz continúa utilizando los nombres
en español.

Aquí solamente se define cómo deben aparecer
en el documento Excel.
=====================================================
*/

function obtenerNombreMaquinaExcel(
  maquina
) {
  const id =
    maquina?.maquinaId ||
    "";

  const nombre =
    maquina?.maquina ||
    "";

  const codigo =
    maquina?.codigoMaquina ||
    "";


  const maquinas =
    {
      centro_leadwell_vmc25: {
        nombre:
          "CENTRO DE MECANIZADO LEADWELL VMC-25",

        pn:
          "AT-MI-P01-EQ01",
      },

      centro_ganesh_vmc4924: {
        nombre:
          "CENTRO DE MECANIZADO GANESH VMC-4924",

        pn:
          "AT-MI-P01-EQ02",
      },

      torno_cnc_hyundai_hit30f: {
        nombre:
          "TORNO CNC HYUNDAI HIT-30F",

        pn:
          "AT-MI-P01-EQ03",
      },

      torno_convencional_turner: {
        nombre:
          "TORNO CONVENCIONAL TURNER",

        pn:
          "AT-MI-P01-EQ04",
      },

      torno_cnc_hyundai_hit160m: {
        nombre:
          "TORNO CNC HYUNDAI HIT-160M",

        pn:
          "AT-MI-P01-EQ05",
      },
    };


  /*
  ---------------------------------------------------
  EQUIVALENCIAS DE LOS IDS ANTIGUOS
  ---------------------------------------------------
  */

  const equivalenciasAntiguas =
    {
      centro_001:
        maquinas
          .centro_leadwell_vmc25,

      centro_002:
        maquinas
          .centro_ganesh_vmc4924,

      centro_003:
        maquinas
          .centro_ganesh_vmc4924,

      torno_001:
        maquinas
          .torno_cnc_hyundai_hit30f,

      torno_002:
        maquinas
          .torno_cnc_hyundai_hit160m,

      torno_convencional_001:
        maquinas
          .torno_convencional_turner,
    };


  const maquinaReal =
    maquinas[id] ||
    equivalenciasAntiguas[id];


  if (
    maquinaReal
  ) {
    return `${maquinaReal.nombre}; P/N: ${maquinaReal.pn}`;
  }


  /*
  ---------------------------------------------------
  RESPALDO
  ---------------------------------------------------
  */

  if (
    nombre &&
    codigo
  ) {
    return `${nombre}; P/N: ${codigo}`;
  }

  return (
    nombre ||
    codigo ||
    ""
  );
}


/*
=====================================================
TRADUCCIÓN DE OPERACIONES
=====================================================
*/

function traducirOperacionExcel(
  nombreOperacion
) {
  const texto =
    String(
      nombreOperacion || ""
    )
      .trim()
      .toLowerCase();


  const traducciones =
    {
      taladrado:
        "Drilling",

      alesado:
        "Boring",

      alessado:
        "Boring",

      escariado:
        "Reaming",

      desbaste:
        "Roughing",

      acabado:
        "Finishing",

      roscado:
        "Threading",

      grafilado:
        "Knurling",
    };


  return (
    traducciones[
      texto
    ] ||
    nombreOperacion ||
    ""
  );
}


/*
=====================================================
TRADUCCIÓN DE HERRAMIENTAS
=====================================================
*/

function traducirHerramientaExcel(
  herramienta
) {
  const texto =
    String(
      herramienta || ""
    )
      .trim()
      .toLowerCase();


  const traducciones =
    {
      "brocas hss":
        "HSS Drills",

      escariadores:
        "Reamers",

      "inserto r0,1":
        "R0.1 Insert",

      "inserto r0.5":
        "R0.5 Insert",

      grafiladora:
        "Knurling Tool",
    };


  return (
    traducciones[
      texto
    ] ||
    herramienta ||
    ""
  );
}


/*
=====================================================
OBTENER TEXTO DE HERRAMIENTA
=====================================================

La interfaz sigue utilizando:

Brocas HSS
Escariadores
Inserto R0,1
Inserto R0,5
Grafiladora

Pero el Excel recibe:

HSS Drills
Reamers
R0.1 Insert
R0.5 Insert
Knurling Tool
=====================================================
*/

function obtenerHerramientaTexto(
  operacion
) {
  const herramienta =
    operacion?.herramienta ||
    "";

  if (
    !herramienta
  ) {
    return "";
  }


  const herramientaExcel =
    traducirHerramientaExcel(
      herramienta
    );


  const requiereDiametro =
    herramienta ===
      "Brocas HSS" ||
    herramienta ===
      "Escariadores";


  if (
    requiereDiametro &&
    operacion?.diametro
  ) {
    const unidad =
      operacion.unidadDiametro ||
      "mm";

    return `${herramientaExcel} Ø ${operacion.diametro} ${unidad}`;
  }


  return herramientaExcel;
}


/*
=====================================================
ESCRIBIR DATOS GENERALES
=====================================================
*/

function escribirDatosGenerales(
  worksheet,
  datosIngenieria
) {
  const datos31 =
    obtenerDatosFormato31(
      datosIngenieria
    );


  /*
  ---------------------------------------------------
  FECHA DEL FORMATO
  ---------------------------------------------------
  */

  colocarFechaCabecera(
    worksheet,
    datosIngenieria?.fecha
  );


  /*
  ---------------------------------------------------
  DATOS HEREDADOS
  ---------------------------------------------------
  */

  const op =
    datosIngenieria?.op ||
    datos31?.op ||
    "";

  const ocPo =
    datosIngenieria?.ocPo ||
    datos31?.ocPo ||
    "";

  const pieza =
    datosIngenieria?.pieza ||
    datos31?.item ||
    "";

  const pn =
    datosIngenieria?.pn ||
    datos31?.pn ||
    "";


  /*
  ---------------------------------------------------
  OP
  ---------------------------------------------------
  */

  worksheet.getCell(
    "G7"
  ).value =
    op;


  /*
  ---------------------------------------------------
  OC / PO
  ---------------------------------------------------
  */

  worksheet.getCell(
    "K7"
  ).value =
    ocPo;


  /*
  ---------------------------------------------------
  PIEZA
  ---------------------------------------------------
  */

  worksheet.getCell(
    "B8"
  ).value =
    pieza;


  /*
  ---------------------------------------------------
  P/N
  ---------------------------------------------------
  */

  worksheet.getCell(
    "J8"
  ).value =
    pn;


  /*
  ---------------------------------------------------
  S/N
  ---------------------------------------------------
  */

  worksheet.getCell(
    "L8"
  ).value =
    datosIngenieria?.sn ||
    "";


  /*
  ---------------------------------------------------
  FECHA DE INICIO
  ---------------------------------------------------
  */

  worksheet.getCell(
    "B10"
  ).value =
    formatearFecha(
      datosIngenieria
        ?.fechaInicioFabricacion
    );


  /*
  ---------------------------------------------------
  FECHA DE REVISIÓN
  ---------------------------------------------------
  */

  worksheet.getCell(
    "J10"
  ).value =
    formatearFecha(
      datosIngenieria
        ?.fechaRevision
    );


  /*
  ---------------------------------------------------
  INFORMACIÓN GENERAL
  ---------------------------------------------------
  */

  worksheet.getCell(
    "C12"
  ).value =
    datosIngenieria?.pieza ||
    datos31.item ||
    "";


  /*
  ---------------------------------------------------
  MATERIAL
  ---------------------------------------------------
  */

  const materialId =
    datosIngenieria?.material ||
    datos31.materialId ||
    "";


  const material =
    obtenerMaterial(
      materialId
    );


  worksheet.getCell(
    "C13"
  ).value =
    material?.nombre ||
    materialId;


  /*
  ---------------------------------------------------
  DIMENSIÓN EN BRUTO
  ---------------------------------------------------
  */

  worksheet.getCell(
    "C14"
  ).value =
    obtenerDimensionBruto(
      datosIngenieria
    );


  /*
  ---------------------------------------------------
  PESO NETO
  ---------------------------------------------------
  */

  worksheet.getCell(
    "C15"
  ).value =
    datosIngenieria
      ?.pesoNeto ??
    "";


  /*
  ---------------------------------------------------
  PESO MECANIZADO
  ---------------------------------------------------
  */

  worksheet.getCell(
    "C16"
  ).value =
    datosIngenieria
      ?.pesoMecanizado ??
    "";


  /*
  ---------------------------------------------------
  CANTIDAD DE PIEZAS
  ---------------------------------------------------
  */

  worksheet.getCell(
    "C17"
  ).value =
    datosIngenieria
      ?.cantidadPiezas ??
    datos31.cantidad ??
    datos31.qty ??
    "";
}


/*
=====================================================
OBTENER RANGOS INFERIORES
=====================================================
*/

function obtenerRangosInferiores(
  worksheet
) {
  return Array.from(
    worksheet.model.merges ||
      []
  )
    .filter(
      (rango) => {
        const inicio =
          rango.split(":")[0];

        const fin =
          rango.split(":")[1];

        const filaInicio =
          Number(
            inicio.replace(
              /[A-Z]/g,
              ""
            )
          );

        const filaFin =
          Number(
            fin.replace(
              /[A-Z]/g,
              ""
            )
          );

        return (
          filaInicio >= 21 &&
          filaFin >= 21
        );
      }
    );
}


/*
=====================================================
DESCOMBINAR RANGOS
=====================================================
*/

function descombinarRangos(
  worksheet,
  rangos
) {
  rangos.forEach(
    (rango) => {
      try {
        worksheet.unMergeCells(
          rango
        );
      } catch {
        // Continúa.
      }
    }
  );
}


/*
=====================================================
DESPLAZAR RANGO
=====================================================
*/

function desplazarRango(
  rango,
  desplazamiento
) {
  const [
    inicio,
    fin,
  ] =
    rango.split(":");


  const mover =
    (
      referencia
    ) => {
      const coincidencia =
        referencia.match(
          /^([A-Z]+)(\d+)$/
        );


      if (
        !coincidencia
      ) {
        return referencia;
      }


      return `${coincidencia[1]}${
        Number(
          coincidencia[2]
        ) + desplazamiento
      }`;
    };


  return `${mover(
    inicio
  )}:${mover(fin)}`;
}


/*
=====================================================
ESCRIBIR BLOQUE DE MÁQUINA
=====================================================
*/

function escribirBloqueMaquina(
  worksheet,
  fila,
  maquina,
  indiceMaquina,
  modelos
) {
  aplicarFilaModelo(
    worksheet,
    modelos.maquina,
    fila
  );


  aplicarFilaModelo(
    worksheet,
    modelos.encabezado,
    fila + 1
  );


  /*
  ---------------------------------------------------
  COMBINACIONES
  ---------------------------------------------------
  */

  worksheet.mergeCells(
    `A${fila}:C${fila}`
  );

  worksheet.mergeCells(
    `D${fila}:M${fila}`
  );

  worksheet.mergeCells(
    `B${fila + 1}:C${fila + 1}`
  );

  worksheet.mergeCells(
    `D${fila + 1}:E${fila + 1}`
  );

  worksheet.mergeCells(
    `F${fila + 1}:H${fila + 1}`
  );

  worksheet.mergeCells(
    `K${fila + 1}:L${fila + 1}`
  );


  /*
  ---------------------------------------------------
  FILA 18
  ---------------------------------------------------
  */

  worksheet.getCell(
    `A${fila}`
  ).value =
    "MACHINE";


  worksheet.getCell(
    `D${fila}`
  ).value =
    obtenerNombreMaquinaExcel(
      maquina
    );


  /*
  ---------------------------------------------------
  FILA 19
  ---------------------------------------------------
  */

  worksheet.getCell(
    `A${fila + 1}`
  ).value =
    "OPERATION";


  worksheet.getCell(
    `B${fila + 1}`
  ).value =
    "TOOL";


  worksheet.getCell(
    `D${fila + 1}`
  ).value =
    "Cutting Speed Vc\n(M/Min )";


  worksheet.getCell(
    `F${fila + 1}`
  ).value =
    "Feed Rate F\n(Mm/Min)";


  worksheet.getCell(
    `I${fila + 1}`
  ).value =
    "RPM";


  worksheet.getCell(
    `J${fila + 1}`
  ).value =
    "Cutting Depth\nAp (Am)";


  worksheet.getCell(
    `K${fila + 1}`
  ).value =
    "Date";


  worksheet.getCell(
    `M${fila + 1}`
  ).value =
    "Time\n(Minutes)";
}


/*
=====================================================
CONVERTIR NÚMERO
=====================================================
*/

function convertirNumero(
  valor
) {
  if (
    valor === "" ||
    valor === null ||
    valor === undefined
  ) {
    return "";
  }


  const numero =
    Number(
      String(valor).replace(
        ",",
        "."
      )
    );


  return Number.isFinite(
    numero
  )
    ? numero
    : valor;
}


/*
=====================================================
ESCRIBIR OPERACIÓN
=====================================================
*/

function escribirOperacion(
  worksheet,
  fila,
  operacion,
  modelos
) {
  aplicarFilaModelo(
    worksheet,
    modelos.operacion,
    fila
  );


  /*
  ---------------------------------------------------
  COMBINACIONES
  ---------------------------------------------------
  */

  worksheet.mergeCells(
    `B${fila}:C${fila}`
  );

  worksheet.mergeCells(
    `D${fila}:E${fila}`
  );

  worksheet.mergeCells(
    `F${fila}:H${fila}`
  );

  worksheet.mergeCells(
    `K${fila}:L${fila}`
  );


  /*
  ---------------------------------------------------
  OPERACIÓN
  ---------------------------------------------------
  */

  worksheet.getCell(
    `A${fila}`
  ).value =
    traducirOperacionExcel(
      operacion?.nombreOperacion
    );


  /*
  ---------------------------------------------------
  HERRAMIENTA
  ---------------------------------------------------
  */

  worksheet.getCell(
    `B${fila}`
  ).value =
    obtenerHerramientaTexto(
      operacion
    );


  /*
  ---------------------------------------------------
  VELOCIDAD DE CORTE
  ---------------------------------------------------
  */

  worksheet.getCell(
    `D${fila}`
  ).value =
    convertirNumero(
      operacion?.velocidadCorte
    );


  /*
  ---------------------------------------------------
  AVANCE
  ---------------------------------------------------
  */

  worksheet.getCell(
    `F${fila}`
  ).value =
    convertirNumero(
      operacion?.avance
    );


  /*
  ---------------------------------------------------
  RPM
  ---------------------------------------------------
  */

  worksheet.getCell(
    `I${fila}`
  ).value =
    convertirNumero(
      operacion?.rpm
    );


  /*
  ---------------------------------------------------
  PROFUNDIDAD DE CORTE
  ---------------------------------------------------
  */

  worksheet.getCell(
    `J${fila}`
  ).value =
    convertirNumero(
      operacion?.profundidadCorte
    );


  /*
  ---------------------------------------------------
  FECHA
  ---------------------------------------------------
  */

  worksheet.getCell(
    `K${fila}`
  ).value =
    formatearFecha(
      operacion?.fecha
    );


  /*
  ---------------------------------------------------
  TIEMPO
  ---------------------------------------------------
  */

  worksheet.getCell(
    `M${fila}`
  ).value =
    convertirNumero(
      operacion?.tiempo
    );
}


/*
=====================================================
CONSTRUIR BLOQUES
=====================================================
*/

function construirBloques(
  worksheet,
  maquinas
) {
  const modelos =
    {
      maquina:
        capturarFilaModelo(
          worksheet,
          18
        ),

      encabezado:
        capturarFilaModelo(
          worksheet,
          19
        ),

      operacion:
        capturarFilaModelo(
          worksheet,
          20
        ),
    };


  const rangosInferiores =
    obtenerRangosInferiores(
      worksheet
    );


  const rangosDinamicos =
    [
      "A18:C18",
      "D18:M18",
      "B19:C19",
      "D19:E19",
      "F19:H19",
      "K19:L19",
      "B20:C20",
      "D20:E20",
      "F20:H20",
      "K20:L20",
    ];


  /*
  ---------------------------------------------------
  DESCOMBINAR
  ---------------------------------------------------
  */

  descombinarRangos(
    worksheet,
    rangosInferiores
  );


  descombinarRangos(
    worksheet,
    rangosDinamicos
  );


  /*
  ---------------------------------------------------
  CALCULAR FILAS
  ---------------------------------------------------
  */

  const cantidadFilas =
    maquinas.reduce(
      (
        total,
        maquina
      ) =>
        total +
        2 +
        (
          maquina
            ?.operaciones
            ?.length ||
          0
        ),
      0
    );


  const cantidadFilasBase =
    3;


  const filasAInsertar =
    Math.max(
      0,
      cantidadFilas -
        cantidadFilasBase
    );


  /*
  ---------------------------------------------------
  INSERTAR FILAS
  ---------------------------------------------------
  */

  if (
    filasAInsertar > 0
  ) {
    worksheet.spliceRows(
      21,
      0,
      ...Array.from(
        {
          length:
            filasAInsertar,
        },
        () => []
      )
    );
  }


  const desplazamiento =
    filasAInsertar;


  /*
  ---------------------------------------------------
  VOLVER A COMBINAR SECCIONES INFERIORES
  ---------------------------------------------------
  */

  rangosInferiores.forEach(
    (rango) => {
      const nuevoRango =
        desplazarRango(
          rango,
          desplazamiento
        );


      try {
        worksheet.mergeCells(
          nuevoRango
        );
      } catch {
        // Evita detener la generación.
      }
    }
  );


  /*
  ---------------------------------------------------
  LIMPIAR FILAS DINÁMICAS
  ---------------------------------------------------
  */

  for (
    let fila =
      FILA_INICIO_BLOQUES;

    fila <
      FILA_INICIO_BLOQUES +
      cantidadFilas;

    fila += 1
  ) {
    worksheet
      .getRow(fila)
      .eachCell(
        (cell) => {
          cell.value =
            null;
        }
      );
  }


  /*
  ---------------------------------------------------
  CONSTRUIR MÁQUINAS
  ---------------------------------------------------
  */

  let filaActual =
    FILA_INICIO_BLOQUES;


  maquinas.forEach(
    (
      maquina,
      indiceMaquina
    ) => {

      escribirBloqueMaquina(
        worksheet,
        filaActual,
        maquina,
        indiceMaquina,
        modelos
      );


      filaActual += 2;


      const operaciones =
        Array.isArray(
          maquina
            ?.operaciones
        )
          ? maquina.operaciones
          : [];


      operaciones.forEach(
        (
          operacion
        ) => {

          escribirOperacion(
            worksheet,
            filaActual,
            operacion,
            modelos
          );


          filaActual += 1;
        }
      );
    }
  );


  return {
    filaInicioObservaciones:
      filaActual,

    filaFinal:
      worksheet.lastRow.number,

    filasTotales:
      cantidadFilas,
  };
}


/*
=====================================================
CONFIGURAR IMPRESIÓN
=====================================================
*/

function configurarImpresion(
  worksheet,
  filaFinal
) {
  worksheet.pageSetup.printArea =
    `A1:M${filaFinal}`;

  worksheet.pageSetup.orientation =
    "portrait";

  worksheet.pageSetup.paperSize =
    9;

  worksheet.pageSetup.fitToPage =
    true;

  worksheet.pageSetup.fitToWidth =
    1;

  worksheet.pageSetup.fitToHeight =
    0;

  worksheet.pageSetup.margins =
    {
      left: 0.25,
      right: 0.25,
      top: 0.5,
      bottom: 0.5,
      header: 0.2,
      footer: 0.2,
    };
}


/*
=====================================================
PREPARAR EXCEL DE INGENIERÍA
=====================================================
*/

export async function prepararExcelIngenieria(
  datosIngenieria
) {
  const response =
    await fetch(
      NOMBRE_PLANTILLA
    );


  if (
    !response.ok
  ) {
    throw new Error(
      "No se encontró la plantilla AT-GT-P01-F05.xlsx en la carpeta public."
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


  const maquinas =
    Array.isArray(
      datosIngenieria
        ?.maquinas
    )
      ? datosIngenieria.maquinas
      : [];


  if (
    maquinas.length === 0
  ) {
    throw new Error(
      "No hay máquinas registradas en Ingeniería de Procesos."
    );
  }


  /*
  ---------------------------------------------------
  DATOS GENERALES
  ---------------------------------------------------
  */

  escribirDatosGenerales(
    worksheet,
    datosIngenieria
  );


  /*
  ---------------------------------------------------
  BLOQUES DE MÁQUINAS
  ---------------------------------------------------
  */

  const resultado =
    construirBloques(
      worksheet,
      maquinas
    );


  /*
  ---------------------------------------------------
  IMPRESIÓN
  ---------------------------------------------------
  */

  configurarImpresion(
    worksheet,
    resultado.filaFinal
  );


  return {
    workbook,
    worksheet,
  };
}


/*
=====================================================
GENERAR EXCEL INDIVIDUAL
=====================================================
*/

export async function generarExcelIngenieria(
  datosIngenieria
) {
  const {
    workbook,
  } =
    await prepararExcelIngenieria(
      datosIngenieria
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
    datosIngenieria
      ?.datosFormato31
      ?.pn ||
    datosIngenieria?.pn ||
    "";


  enlace.download =
    pn
      ? `INGENIERIA_PROCESOS_${String(
          pn
        ).trim()}.xlsx`
      : "INGENIERIA_PROCESOS.xlsx";


  document.body.appendChild(
    enlace
  );


  enlace.click();


  enlace.remove();


  window.URL.revokeObjectURL(
    url
  );
}
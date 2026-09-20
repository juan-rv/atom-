import React, { useMemo, useState } from "react";


const MAQUINAS = [
  {
    id: "centro_leadwell_vmc25",
    nombre: "LEADWELL VMC-25 MACHINING CENTER",
    codigo: "AT-MI-P01-EQ01",
    tipo: "centro_mecanizado",

    operaciones: [
      {
        id: "taladrado",
        nombre: "Drilling",
        herramientas: ["HSS Drills"],
      },
      {
        id: "alessado",
        nombre: "Reaming",
        herramientas: ["Reamers"],
      },
      {
        id: "desbaste",
        nombre: "Roughing",
        herramientas: ["Reamers"],
      },
      {
        id: "acabado",
        nombre: "Finishing",
        herramientas: ["Reamers"],
      },
    ],
  },

  {
    id: "centro_ganesh_vmc4924",
    nombre: "GANESH VMC-4924 MACHINING CENTER",
    codigo: "AT-MI-P01-EQ02",
    tipo: "centro_mecanizado",

    operaciones: [
      {
        id: "taladrado",
        nombre: "Drilling",
        herramientas: ["HSS Drills"],
      },
      {
        id: "alessado",
        nombre: "Reaming",
        herramientas: ["Reamers"],
      },
      {
        id: "desbaste",
        nombre: "Roughing",
        herramientas: ["Reamers"],
      },
      {
        id: "acabado",
        nombre: "Finishing",
        herramientas: ["Reamers"],
      },
    ],
  },

  {
    id: "torno_cnc_hyundai_hit30f",
    nombre: "HYUNDAI HIT-30F CNC LATHE",
    codigo: "AT-MI-P01-EQ03",
    tipo: "torno_cnc",

    operaciones: [
      {
        id: "taladrado",
        nombre: "Drilling",
        herramientas: ["HSS Drills"],
      },
      {
        id: "roscado",
        nombre: "Threading",
        herramientas: ["R0.1 Insert"],
      },
      {
        id: "grafilado",
        nombre: "Knurling",
        herramientas: ["Knurling Tool"],
      },
      {
        id: "desbaste",
        nombre: "Roughing",
        herramientas: ["R0.5 Insert"],
      },
      {
        id: "acabado",
        nombre: "Finishing",
        herramientas: ["R0.1 Insert"],
      },
    ],
  },

  {
    id: "torno_cnc_hyundai_hit160m",
    nombre: "HYUNDAI HIT-160M CNC LATHE",
    codigo: "AT-MI-P01-EQ05",
    tipo: "torno_cnc",

    operaciones: [
      {
        id: "taladrado",
        nombre: "Drilling",
        herramientas: ["HSS Drills"],
      },
      {
        id: "roscado",
        nombre: "Threading",
        herramientas: ["R0.1 Insert"],
      },
      {
        id: "grafilado",
        nombre: "Knurling",
        herramientas: ["Knurling Tool"],
      },
      {
        id: "desbaste",
        nombre: "Roughing",
        herramientas: ["R0.5 Insert"],
      },
      {
        id: "acabado",
        nombre: "Finishing",
        herramientas: ["R0.1 Insert"],
      },
    ],
  },

  {
    id: "torno_convencional_turner",
    nombre: "TURNER CONVENTIONAL LATHE",
    codigo: "AT-MI-P01-EQ04",
    tipo: "torno_convencional",

    operaciones: [
      {
        id: "taladrado",
        nombre: "Drilling",
        herramientas: ["HSS Drills"],
      },
      {
        id: "roscado",
        nombre: "Threading",
        herramientas: ["R0.1 Insert"],
      },
      {
        id: "desbaste",
        nombre: "Roughing",
        herramientas: ["R0.5 Insert"],
      },
      {
        id: "acabado",
        nombre: "Finishing",
        herramientas: ["R0.1 Insert"],
      },
    ],
  },
];

const DIAMETROS_BROCA_MM = Array.from(
  { length: 25 },
  (_, index) => String(index + 1)
);



const DIAMETROS_BROCA_PULGADAS = [
  "1/64",
  "1/32",
  "3/64",
  "1/16",
  "5/64",
  "3/32",
  "7/64",
  "1/8",
  "9/64",
  "5/32",
  "11/64",
  "3/16",
  "13/64",
  "7/32",
  "15/64",
  "1/4",
  "17/64",
  "9/32",
  "19/64",
  "5/16",
  "21/64",
  "11/32",
  "23/64",
  "3/8",
  "25/64",
  "13/32",
  "27/64",
  "7/16",
  "29/64",
  "15/32",
  "31/64",
  "1/2",
  "33/64",
  "17/32",
  "35/64",
  "9/16",
  "37/64",
  "19/32",
  "39/64",
  "5/8",
  "41/64",
  "21/32",
  "43/64",
  "11/16",
  "45/64",
  "23/32",
  "47/64",
  "3/4",
  "49/64",
  "25/32",
  "51/64",
  "13/16",
  "53/64",
  "27/32",
  "55/64",
  "7/8",
  "57/64",
  "29/32",
  "59/64",
  "15/16",
  "61/64",
  "31/32",
  "1",
];




const DIAMETROS_ESCARIADOR = Array.from(
  { length: 14 },
  (_, index) => String(index + 1)
);



const crearOperacion = () => ({
  id: `${Date.now()}-${Math.random()}`,

  operacionId: "",

  herramienta: "",

  unidadDiametro: "mm",

  diametro: "",

  velocidadCorte: "",

  avance: "",

  rpm: "",

  profundidadCorte: "",

  fecha: "",

  tiempo: "",
});


const crearMaquina = () => ({
  id: `${Date.now()}-${Math.random()}`,

  maquinaId: "",

  cantidadOperaciones: 1,

  operaciones: [
    crearOperacion(),
  ],
});


function IngenieriaProcesos({
  datosFormato31 = {},
  fechaIngenieria = "",
  onContinuar,
}) {



  const [
    numeroSerie,
    setNumeroSerie,
  ] = useState("");



  const sumarDias = (
    fecha,
    dias
  ) => {

    if (!fecha) {
      return "";
    }

    const fechaBase =
      new Date(`${fecha}T00:00:00`);

    fechaBase.setDate(
      fechaBase.getDate() + dias
    );

    const year =
      fechaBase.getFullYear();

    const month =
      String(
        fechaBase.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        fechaBase.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  const fechaInicioFabricacion =
    fechaIngenieria || "";



  const fechaMetrologia =
    sumarDias(
      fechaIngenieria,
      5
    );


  const fechaRevision =
    sumarDias(
      fechaMetrologia,
      -1
    );

  const [
    maquinas,
    setMaquinas,
  ] = useState([]);



  const [
    intentoContinuar,
    setIntentoContinuar,
  ] = useState(false);



  const obtenerMaquina = (
    maquinaId
  ) => {

    return MAQUINAS.find(
      (maquina) =>
        maquina.id === maquinaId
    );

  };


  const agregarMaquina = () => {

    setMaquinas(
      (prev) => [
        ...prev,
        crearMaquina(),
      ]
    );

  };


  /*
  ===================================================
  ELIMINAR MÁQUINA
  ===================================================
  */

  const eliminarMaquina = (
    maquinaIndex
  ) => {

    setMaquinas(
      (prev) =>
        prev.filter(
          (_, index) =>
            index !== maquinaIndex
        )
    );

  };


  const actualizarMaquina = (
    maquinaIndex,
    cambios
  ) => {

    setMaquinas(
      (prev) =>
        prev.map(
          (maquina, index) =>
            index === maquinaIndex
              ? {
                  ...maquina,
                  ...cambios,
                }
              : maquina
        )
    );

  };



  const cambiarCantidadOperaciones = (
    maquinaIndex,
    cantidad
  ) => {

    const cantidadNumerica =
      Math.max(
        1,
        Math.floor(
          Number(cantidad) || 1
        )
      );


    setMaquinas(
      (prev) =>
        prev.map(
          (maquina, index) => {

            if (
              index !== maquinaIndex
            ) {

              return maquina;

            }


            const operacionesActuales =
              maquina.operaciones || [];


            let nuevasOperaciones =
              [...operacionesActuales];


            while (
              nuevasOperaciones.length <
              cantidadNumerica
            ) {

              nuevasOperaciones.push(
                crearOperacion()
              );

            }


            if (
              nuevasOperaciones.length >
              cantidadNumerica
            ) {

              nuevasOperaciones =
                nuevasOperaciones.slice(
                  0,
                  cantidadNumerica
                );

            }


            return {

              ...maquina,

              cantidadOperaciones:
                cantidadNumerica,

              operaciones:
                nuevasOperaciones,

            };

          }
        )
    );

  };


  const actualizarOperacion = (
    maquinaIndex,
    operacionIndex,
    cambios
  ) => {

    setMaquinas(
      (prev) =>
        prev.map(
          (maquina, indexMaquina) => {

            if (
              indexMaquina !==
              maquinaIndex
            ) {

              return maquina;

            }


            return {

              ...maquina,

              operaciones:
                maquina.operaciones.map(
                  (
                    operacion,
                    indexOperacion
                  ) =>
                    indexOperacion ===
                    operacionIndex
                      ? {
                          ...operacion,
                          ...cambios,
                        }
                      : operacion
                ),

            };

          }
        )
    );

  };


  const requiereDiametro = (
    herramienta
  ) => {

    return (
      herramienta === "Brocas HSS" ||
      herramienta === "Escariadores"
    );

  };


  const esInserto = (
    herramienta
  ) => {

    return (
      herramienta === "Inserto R0,5" ||
      herramienta === "Inserto R0,1"
    );

  };



  const errores = useMemo(() => {

    const lista = [];

    if (
      !numeroSerie.trim()
    ) {

      lista.push(
        "S/N: ingrese el número de serie."
      );

    }


  
    if (
      maquinas.length === 0
    ) {

      lista.push(
        "Debe agregar al menos una máquina."
      );

      return lista;

    }


    maquinas.forEach(
      (
        maquinaFormulario,
        maquinaIndex
      ) => {

        const numeroMaquina =
          maquinaIndex + 1;


        if (
          !maquinaFormulario.maquinaId
        ) {

          lista.push(
            `Máquina ${numeroMaquina}: seleccione una máquina.`
          );

          return;

        }


        if (
          !maquinaFormulario.cantidadOperaciones ||
          maquinaFormulario.cantidadOperaciones < 1
        ) {

          lista.push(
            `Máquina ${numeroMaquina}: indique la cantidad de operaciones.`
          );

          return;

        }


        maquinaFormulario.operaciones.forEach(
          (
            operacion,
            operacionIndex
          ) => {

            const numeroOperacion =
              operacionIndex + 1;


            const etiqueta =
              `Máquina ${numeroMaquina} - Operación ${numeroOperacion}`;
            if (
              !operacion.operacionId
            ) {

              lista.push(
                `${etiqueta}: seleccione una operación.`
              );

            }


            if (
              !operacion.herramienta
            ) {

              lista.push(
                `${etiqueta}: seleccione una herramienta.`
              );

            }

            if (
              requiereDiametro(
                operacion.herramienta
              ) &&
              !operacion.diametro
            ) {

              lista.push(
                `${etiqueta}: indique el diámetro de la herramienta.`
              );

            }


            if (
              operacion.velocidadCorte === ""
            ) {

              lista.push(
                `${etiqueta}: ingrese Vc.`
              );

            }


            /*
            =========================================
            F
            =========================================
            */

            if (
              operacion.avance === ""
            ) {

              lista.push(
                `${etiqueta}: ingrese F.`
              );

            }


            /*
            =========================================
            RPM
            =========================================
            */

            if (
              operacion.rpm === ""
            ) {

              lista.push(
                `${etiqueta}: ingrese RPM.`
              );

            }


            /*
            =========================================
            AP
            =========================================
            */

            if (
              operacion.profundidadCorte === ""
            ) {

              lista.push(
                `${etiqueta}: ingrese Ap.`
              );

            }


            /*
            =========================================
            FECHA
            =========================================
            */

            if (
              operacion.fecha === ""
            ) {

              lista.push(
                `${etiqueta}: ingrese la fecha.`
              );

            }


            /*
            =========================================
            TIEMPO
            =========================================
            */

            if (
              operacion.tiempo === ""
            ) {

              lista.push(
                `${etiqueta}: ingrese el tiempo.`
              );

            }


            /*
            =========================================
            FECHA MÍNIMA
            =========================================
            */

            if (
              operacion.fecha &&
              fechaIngenieria
            ) {

              const fechaOperacion =
                new Date(
                  `${operacion.fecha}T00:00:00`
                );


              const fechaInicio =
                new Date(
                  `${fechaIngenieria}T00:00:00`
                );


              if (
                fechaOperacion <
                fechaInicio
              ) {

                lista.push(
                  `${etiqueta}: la fecha no puede ser anterior a la fecha de Ingeniería.`
                );

              }

            }


            /*
            =========================================
            FECHA VS OPERACIÓN ANTERIOR
            =========================================
            */

            if (
              operacionIndex > 0
            ) {

              const operacionAnterior =
                maquinaFormulario
                  .operaciones[
                    operacionIndex - 1
                  ];


              if (
                operacion.fecha &&
                operacionAnterior.fecha
              ) {

                const fechaActual =
                  new Date(
                    `${operacion.fecha}T00:00:00`
                  );


                const fechaAnterior =
                  new Date(
                    `${operacionAnterior.fecha}T00:00:00`
                  );


                if (
                  fechaActual <
                  fechaAnterior
                ) {

                  lista.push(
                    `${etiqueta}: la fecha no puede ser anterior a la operación ${operacionIndex}.`
                  );

                }

              }

            }

          }
        );

      }
    );


    return lista;

  }, [
    maquinas,
    fechaIngenieria,
    numeroSerie,
  ]);


  /*
  ===================================================
  COMPLETAR INGENIERÍA
  ===================================================
  */

  const manejarContinuar = () => {

    setIntentoContinuar(
      true
    );


    if (
      errores.length > 0
    ) {

      return;

    }


    /*
    ---------------------------------------------------
    CONSTRUIR DATOS DE INGENIERÍA
    ---------------------------------------------------
    */

    const datosIngenieria = {

      /*
      -----------------------------------------------
      FECHA DEL FORMATO
      -----------------------------------------------
      */

      fecha:
        fechaIngenieria,


      /*
      -----------------------------------------------
      S/N
      -----------------------------------------------
      */

      sn:
        numeroSerie.trim(),


      /*
      -----------------------------------------------
      MÁQUINAS
      -----------------------------------------------
      */

      maquinas:
        maquinas.map(
          (
            maquinaFormulario
          ) => {

            const maquina =
              obtenerMaquina(
                maquinaFormulario.maquinaId
              );


            return {

              maquinaId:
                maquinaFormulario.maquinaId,

              maquina:
                maquina
                  ? maquina.nombre
                  : "",

              codigoMaquina:
                maquina
                  ? maquina.codigo
                  : "",

              tipoMaquina:
                maquina
                  ? maquina.tipo
                  : "",

              cantidadOperaciones:
                maquinaFormulario
                  .cantidadOperaciones,

              operaciones:
                maquinaFormulario.operaciones.map(
                  (
                    operacion
                  ) => {

                    const configuracion =
                      maquina?.operaciones.find(
                        (item) =>
                          item.id ===
                          operacion.operacionId
                      );


                    return {

                      ...operacion,

                      nombreOperacion:
                        configuracion
                          ? configuracion.nombre
                          : "",

                    };

                  }
                ),

            };

          }
        ),


      /*
      -----------------------------------------------
      INFORMACIÓN GENERAL HEREDADA DEL FORMATO 3.1
      -----------------------------------------------
      */

      pieza:
        datosFormato31.pieza ||
        datosFormato31.descripcionGeneral ||
        datosFormato31.descripcion ||
        datosFormato31.producto ||
        "",

      material:
        datosFormato31.materialId ||
        datosFormato31.material ||
        "",

      dimensionBruto:
        datosFormato31.dimensionBruto ||
        datosFormato31.dimensionesBruto ||
        datosFormato31.dimensionEnBruto ||
        "",

      pesoNeto:
        datosFormato31.pesoNeto ||
        "",

      pesoMecanizado:
        datosFormato31.pesoMecanizado ||
        "",

      cantidadPiezas:
        datosFormato31.cantidadPiezas ||
        datosFormato31.cantidad ||
        datosFormato31.qty ||
        "",

      fechaInicioFabricacion:
        fechaInicioFabricacion,

      fechaRevision:
        fechaRevision,

      fechaMetrologia:
        fechaMetrologia,


      /*
      -----------------------------------------------
      DATOS COMPLETOS DEL FORMATO 3.1
      -----------------------------------------------
      */

      datosFormato31,

    };


    /*
    ---------------------------------------------------
    ENVIAR A APP
    ---------------------------------------------------
    */

    if (
      typeof onContinuar ===
      "function"
    ) {

      onContinuar(
        datosIngenieria
      );

    }

  };


  /*
  ===================================================
  RENDER
  ===================================================
  */

  return (

    <div className="formato31-page">


      {/* =================================================
          ENCABEZADO
      ================================================= */}

      <header className="formato31-header">

        <div>

          <h1>
            INGENIERÍA DE PROCESOS
          </h1>

          <p>
            Planeación y definición del proceso
            de fabricación
          </p>

        </div>


        <span className="formato31-version">
          AT-GT-P01-F05-V02
        </span>

      </header>


      <main className="formato31-container">


        {/* =================================================
            INFORMACIÓN DE LA PIEZA
        ================================================= */}

        <section className="formato31-section">

          <div className="formato31-section-title">
            INFORMACIÓN DE LA PIEZA
          </div>


          <div className="formato31-grid">


            {/* =========================================
                FECHA
            ========================================= */}

            <div className="formato31-field">

              <label>
                Fecha
              </label>

              <input
                type="date"
                value={
                  fechaIngenieria || ""
                }
                readOnly
              />

            </div>


            {/* =========================================
                FECHA INICIO DE FABRICACIÓN
            ========================================= */}

            <div className="formato31-field">

              <label>
                Fecha inicio de fabricación
              </label>

              <input
                type="date"
                value={
                  fechaInicioFabricacion
                }
                readOnly
              />

            </div>


            {/* =========================================
                FECHA DE REVISIÓN
            ========================================= */}

            <div className="formato31-field">

              <label>
                Fecha de revisión
              </label>

              <input
                type="date"
                value={
                  fechaRevision
                }
                readOnly
              />

            </div>


            {/* =========================================
                OP
            ========================================= */}

            <div className="formato31-field">

              <label>
                OP
              </label>

              <input
                value={
                  datosFormato31.op ||
                  datosFormato31.OP ||
                  ""
                }
                readOnly
              />

            </div>


            {/* =========================================
                OC / PO
            ========================================= */}

            <div className="formato31-field">

              <label>
                OC / PO
              </label>

              <input
                value={
                  datosFormato31.ocPo ||
                  datosFormato31.OC_PO ||
                  ""
                }
                readOnly
              />

            </div>


            {/* =========================================
                COMPONENTE
            ========================================= */}

            <div className="formato31-field">

              <label>
                Componente
              </label>

              <input
                value={
                  datosFormato31.item ||
                  datosFormato31.componente ||
                  ""
                }
                readOnly
              />

            </div>


            {/* =========================================
                P/N
            ========================================= */}

            <div className="formato31-field">

              <label>
                P/N
              </label>

              <input
                value={
                  datosFormato31.pn ||
                  datosFormato31.PN ||
                  ""
                }
                readOnly
              />

            </div>


            {/* =========================================
                S/N
            ========================================= */}

            <div className="formato31-field">

              <label>
                S/N *
              </label>

              <input
                type="text"
                value={
                  numeroSerie
                }
                onChange={(e) =>
                  setNumeroSerie(
                    e.target.value
                  )
                }
                placeholder="Ingrese S/N"
              />

              <small>
                Número de serie de la pieza
              </small>

            </div>


            {/* =========================================
                INFORMACIÓN GENERAL
            ========================================= */}

            <div className="formato31-field">

              <label>
                Pieza
              </label>

              <input
                value={
                  datosFormato31.pieza ||
                  datosFormato31.descripcionGeneral ||
                  datosFormato31.descripcion ||
                  datosFormato31.producto ||
                  ""
                }
                readOnly
              />

            </div>


            <div className="formato31-field">

              <label>
                Material
              </label>

              <input
                value={
                  datosFormato31.materialId ||
                  datosFormato31.material ||
                  ""
                }
                readOnly
              />

            </div>


            <div className="formato31-field">

              <label>
                Dimensión en bruto
              </label>

              <input
                value={
                  datosFormato31.dimensionBruto ||
                  datosFormato31.dimensionesBruto ||
                  datosFormato31.dimensionEnBruto ||
                  ""
                }
                readOnly
              />

            </div>


            <div className="formato31-field">

              <label>
                Peso neto
              </label>

              <input
                value={
                  datosFormato31.pesoNeto ||
                  ""
                }
                readOnly
              />

            </div>


            <div className="formato31-field">

              <label>
                Peso mecanizado
              </label>

              <input
                value={
                  datosFormato31.pesoMecanizado ||
                  ""
                }
                readOnly
              />

            </div>


            <div className="formato31-field">

              <label>
                Cantidad de piezas
              </label>

              <input
                value={
                  datosFormato31.cantidadPiezas ||
                  datosFormato31.cantidad ||
                  datosFormato31.qty ||
                  ""
                }
                readOnly
              />

            </div>

          </div>

        </section>


        {/* =================================================
            OPERACIONES DE FABRICACIÓN
        ================================================= */}

        <section className="formato31-section">

          <div className="formato31-section-title">
            OPERACIONES DE FABRICACIÓN
          </div>


          {maquinas.length === 0 && (

            <div className="ingenieria-empty">

              <strong>
                No hay máquinas agregadas
              </strong>


              <p>
                Agrega una máquina para comenzar
                a definir la ruta de fabricación.
              </p>

            </div>

          )}


          {/* =================================================
              MÁQUINAS
          ================================================= */}

          {maquinas.map(
            (
              maquinaFormulario,
              maquinaIndex
            ) => {

              const maquina =
                obtenerMaquina(
                  maquinaFormulario.maquinaId
                );


              const operacionesDisponibles =
                maquina?.operaciones ||
                [];


              return (

                <div
                  className="ingenieria-maquina"
                  key={
                    maquinaFormulario.id
                  }
                >


                  {/* =========================================
                      CABECERA DE MÁQUINA
                  ========================================= */}

                  <div className="ingenieria-maquina-header">

                    <div>

                      <strong>
                        Máquina {maquinaIndex + 1}
                      </strong>


                      {maquina && (

                        <span>

                          {" "}
                          — {maquina.nombre}
                          {" "}
                          ({maquina.codigo})

                        </span>

                      )}

                    </div>


                    <button

                      type="button"

                      className="button-delete"

                      onClick={() =>
                        eliminarMaquina(
                          maquinaIndex
                        )
                      }

                    >

                      Eliminar máquina

                    </button>

                  </div>


                  {/* =========================================
                      DATOS DE MÁQUINA
                  ========================================= */}

                  <div className="formato31-grid">


                    {/* =======================================
                        MÁQUINA
                    ======================================= */}

                    <div className="formato31-field">

                      <label>
                        Máquina *
                      </label>


                      <select

                        value={
                          maquinaFormulario.maquinaId
                        }

                        onChange={(e) =>
                          actualizarMaquina(
                            maquinaIndex,
                            {
                              maquinaId:
                                e.target.value,

                              operaciones: [
                                crearOperacion(),
                              ],

                              cantidadOperaciones:
                                1,
                            }
                          )
                        }

                      >

                        <option value="">
                          Seleccione una máquina
                        </option>


                        {MAQUINAS.map(
                          (maquina) => (

                            <option
                              key={
                                maquina.id
                              }
                              value={
                                maquina.id
                              }
                            >

                              {maquina.nombre}
                              {" — "}
                              {maquina.codigo}

                            </option>

                          )
                        )}

                      </select>

                    </div>


                    {/* =======================================
                        CANTIDAD DE OPERACIONES
                    ======================================= */}

                    <div className="formato31-field">

                      <label>
                        Cantidad de operaciones *
                      </label>


                      <input

                        type="number"

                        min="1"

                        step="1"

                        inputMode="numeric"

                        value={
                          maquinaFormulario
                            .cantidadOperaciones
                        }

                        onChange={(e) =>
                          cambiarCantidadOperaciones(
                            maquinaIndex,
                            e.target.value
                          )
                        }

                      />


                      <small>
                        Indique cuántas operaciones
                        realizará esta máquina.
                      </small>

                    </div>

                  </div>


                  {/* =========================================
                      OPERACIONES DE ESTA MÁQUINA
                  ========================================= */}

                  <div className="ingenieria-operaciones-maquina">

                    <h3>
                      Operaciones de la máquina
                    </h3>


                    {maquinaFormulario.operaciones.map(
                      (
                        operacion,
                        operacionIndex
                      ) => {

                        const operacionSeleccionada =
                          operacionesDisponibles.find(
                            (item) =>
                              item.id ===
                              operacion.operacionId
                          );


                        const herramientasDisponibles =
                          operacionSeleccionada
                            ?.herramientas ||
                          [];


                        const necesitaDiametro =
                          requiereDiametro(
                            operacion.herramienta
                          );


                        const inserto =
                          esInserto(
                            operacion.herramienta
                          );


                        return (

                          <div
                            className="ingenieria-operacion"
                            key={
                              operacion.id
                            }
                          >

                            <div className="ingenieria-operacion-header">

                              <strong>
                                Operación{" "}
                                {operacionIndex + 1}
                              </strong>

                            </div>


                            <div className="formato31-grid">


                              {/* =================================
                                  OPERACIÓN
                              ================================= */}

                              <div className="formato31-field">

                                <label>
                                  Operación *
                                </label>


                                <select

                                  value={
                                    operacion.operacionId
                                  }

                                  disabled={
                                    !maquina
                                  }

                                  onChange={(e) =>
                                    actualizarOperacion(
                                      maquinaIndex,
                                      operacionIndex,
                                      {
                                        operacionId:
                                          e.target.value,

                                        herramienta:
                                          "",

                                        diametro:
                                          "",

                                        unidadDiametro:
                                          "mm",
                                      }
                                    )
                                  }

                                >

                                  <option value="">
                                    Seleccione una operación
                                  </option>


                                  {operacionesDisponibles.map(
                                    (item) => (

                                      <option
                                        key={
                                          item.id
                                        }
                                        value={
                                          item.id
                                        }
                                      >

                                        {item.nombre}

                                      </option>

                                    )
                                  )}

                                </select>

                              </div>


                              {/* =================================
                                  HERRAMIENTA
                              ================================= */}

                              <div className="formato31-field">

                                <label>
                                  Herramienta *
                                </label>


                                <select

                                  value={
                                    operacion.herramienta
                                  }

                                  disabled={
                                    !operacionSeleccionada
                                  }

                                  onChange={(e) =>
                                    actualizarOperacion(
                                      maquinaIndex,
                                      operacionIndex,
                                      {
                                        herramienta:
                                          e.target.value,

                                        diametro:
                                          "",

                                        unidadDiametro:
                                          "mm",
                                      }
                                    )
                                  }

                                >

                                  <option value="">
                                    Seleccione una herramienta
                                  </option>


                                  {herramientasDisponibles.map(
                                    (herramienta) => (

                                      <option
                                        key={
                                          herramienta
                                        }
                                        value={
                                          herramienta
                                        }
                                      >

                                        {herramienta}

                                      </option>

                                    )
                                  )}

                                </select>

                              </div>


                              {/* =================================
                                  DIÁMETRO
                              ================================= */}

                              {necesitaDiametro && (

                                <div className="formato31-field">

                                  <label>
                                    Diámetro de herramienta *
                                  </label>


                                  {operacion.herramienta ===
                                    "Brocas HSS" && (

                                    <select

                                      value={
                                        operacion.unidadDiametro
                                      }

                                      onChange={(e) =>
                                        actualizarOperacion(
                                          maquinaIndex,
                                          operacionIndex,
                                          {
                                            unidadDiametro:
                                              e.target.value,

                                            diametro:
                                              "",
                                          }
                                        )
                                      }

                                    >

                                      <option value="mm">
                                        Milímetros (mm)
                                      </option>


                                      <option value="pulgadas">
                                        Pulgadas (fracción)
                                      </option>

                                    </select>

                                  )}


                                  <select

                                    value={
                                      operacion.diametro
                                    }

                                    onChange={(e) =>
                                      actualizarOperacion(
                                        maquinaIndex,
                                        operacionIndex,
                                        {
                                          diametro:
                                            e.target.value,
                                        }
                                      )
                                    }

                                  >

                                    <option value="">
                                      Seleccione diámetro
                                    </option>


                                    {operacion.herramienta ===
                                      "Brocas HSS" &&

                                      operacion.unidadDiametro ===
                                        "mm" &&

                                      DIAMETROS_BROCA_MM.map(
                                        (diametro) => (

                                          <option
                                            key={
                                              diametro
                                            }
                                            value={
                                              diametro
                                            }
                                          >

                                            Ø {diametro} mm

                                          </option>

                                        )
                                      )
                                    }


                                    {operacion.herramienta ===
                                      "Brocas HSS" &&

                                      operacion.unidadDiametro ===
                                        "pulgadas" &&

                                      DIAMETROS_BROCA_PULGADAS.map(
                                        (diametro) => (

                                          <option
                                            key={
                                              diametro
                                            }
                                            value={
                                              diametro
                                            }
                                          >

                                            Ø {diametro}"

                                          </option>

                                        )
                                      )
                                    }


                                    {operacion.herramienta ===
                                      "Escariadores" &&

                                      DIAMETROS_ESCARIADOR.map(
                                        (diametro) => (

                                          <option
                                            key={
                                              diametro
                                            }
                                            value={
                                              diametro
                                            }
                                          >

                                            Ø {diametro} mm

                                          </option>

                                        )
                                      )
                                    }

                                  </select>

                                </div>

                              )}


                              {/* =================================
                                  RADIO DE PUNTA
                              ================================= */}

                              {inserto && (

                                <div className="formato31-field">

                                  <label>
                                    Radio de punta
                                  </label>


                                  <input

                                    value={
                                      operacion.herramienta ===
                                      "Inserto R0,5"
                                        ? "0,5 mm"
                                        : "0,1 mm"
                                    }

                                    readOnly

                                  />

                                </div>

                              )}


                              {/* =================================
                                  VC
                              ================================= */}

                              <div className="formato31-field">

                                <label>
                                  Vc *
                                </label>


                                <input

                                  type="number"

                                  min="0"

                                  step="any"

                                  inputMode="decimal"

                                  value={
                                    operacion.velocidadCorte
                                  }

                                  onChange={(e) =>
                                    actualizarOperacion(
                                      maquinaIndex,
                                      operacionIndex,
                                      {
                                        velocidadCorte:
                                          e.target.value,
                                      }
                                    )
                                  }

                                  placeholder="Ingrese Vc"

                                />


                                <small>
                                  m/min — ingreso manual
                                </small>

                              </div>


                              {/* =================================
                                  F
                              ================================= */}

                              <div className="formato31-field">

                                <label>
                                  F *
                                </label>


                                <input

                                  type="number"

                                  min="0"

                                  step="any"

                                  inputMode="decimal"

                                  value={
                                    operacion.avance
                                  }

                                  onChange={(e) =>
                                    actualizarOperacion(
                                      maquinaIndex,
                                      operacionIndex,
                                      {
                                        avance:
                                          e.target.value,
                                      }
                                    )
                                  }

                                  placeholder="Ingrese F"

                                />


                                <small>
                                  mm/min — ingreso manual
                                </small>

                              </div>


                              {/* =================================
                                  RPM
                              ================================= */}

                              <div className="formato31-field">

                                <label>
                                  RPM *
                                </label>


                                <input

                                  type="number"

                                  min="0"

                                  step="any"

                                  inputMode="numeric"

                                  value={
                                    operacion.rpm
                                  }

                                  onChange={(e) =>
                                    actualizarOperacion(
                                      maquinaIndex,
                                      operacionIndex,
                                      {
                                        rpm:
                                          e.target.value,
                                      }
                                    )
                                  }

                                  placeholder="Ingrese RPM"

                                />


                                <small>
                                  rpm — ingreso manual
                                </small>

                              </div>


                              {/* =================================
                                  AP
                              ================================= */}

                              <div className="formato31-field">

                                <label>
                                  Ap *
                                </label>


                                <input

                                  type="number"

                                  min="0"

                                  step="any"

                                  inputMode="decimal"

                                  value={
                                    operacion.profundidadCorte
                                  }

                                  onChange={(e) =>
                                    actualizarOperacion(
                                      maquinaIndex,
                                      operacionIndex,
                                      {
                                        profundidadCorte:
                                          e.target.value,
                                      }
                                    )
                                  }

                                  placeholder="Ingrese Ap"

                                />


                                <small>
                                  mm — ingreso manual
                                </small>

                              </div>


                              {/* =================================
                                  FECHA
                              ================================= */}

                              <div className="formato31-field">

                                <label>
                                  Fecha *
                                </label>


                                <input

                                  type="date"

                                  value={
                                    operacion.fecha
                                  }

                                  min={
                                    fechaIngenieria ||
                                    undefined
                                  }

                                  onChange={(e) =>
                                    actualizarOperacion(
                                      maquinaIndex,
                                      operacionIndex,
                                      {
                                        fecha:
                                          e.target.value,
                                      }
                                    )
                                  }

                                />

                              </div>


                              {/* =================================
                                  TIEMPO
                              ================================= */}

                              <div className="formato31-field">

                                <label>
                                  Tiempo *
                                </label>


                                <input

                                  type="number"

                                  min="0"

                                  step="any"

                                  inputMode="decimal"

                                  value={
                                    operacion.tiempo
                                  }

                                  onChange={(e) =>
                                    actualizarOperacion(
                                      maquinaIndex,
                                      operacionIndex,
                                      {
                                        tiempo:
                                          e.target.value,
                                      }
                                    )
                                  }

                                  placeholder="Ingrese tiempo"

                                />


                                <small>
                                  minutos — ingreso manual
                                </small>

                              </div>


                            </div>

                          </div>

                        );

                      }
                    )}

                  </div>

                </div>

              );

            }
          )}


          {/* =================================================
              AGREGAR MÁQUINA
          ================================================= */}

          <div className="agregar-medida-final">

            <button

              type="button"

              className="button-primary"

              onClick={
                agregarMaquina
              }

            >

              + Agregar máquina

            </button>

          </div>

        </section>


        {/* =================================================
            VALIDACIÓN
        ================================================= */}

        {intentoContinuar &&
          errores.length > 0 && (

            <section className="formato31-validation-error">

              <div className="formato31-section-title">

                ⚠️ INGENIERÍA DE PROCESOS INCOMPLETA

              </div>


              <p>

                Completa los campos obligatorios
                antes de continuar.

              </p>


              <ul>

                {errores.map(
                  (
                    error,
                    index
                  ) => (

                    <li
                      key={
                        index
                      }
                    >

                      {error}

                    </li>

                  )
                )}

              </ul>

            </section>

          )}


        {/* =================================================
            FINAL
        ================================================= */}

        <section className="formato31-final-section">

          {intentoContinuar &&
            errores.length === 0 && (

              <div className="formato31-success">

                <strong>
                  ✓ Ingeniería de Procesos completa
                </strong>


                <p>
                  La ruta de fabricación está
                  lista para continuar con Metrología.
                </p>

              </div>

            )}


          <button

            type="button"

            className="button-primary"

            onClick={
              manejarContinuar
            }

          >

            Continuar con Metrología →

          </button>

        </section>

      </main>

    </div>

  );

}


export default IngenieriaProcesos;
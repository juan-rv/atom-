import {
  useState,
} from "react";

import "./App.css";


// =====================================================
// COMPONENTES DE METROLOGÍA
// =====================================================

import DatosGenerales
  from "./components/DatosGenerales";

import ListaMediciones
  from "./components/ListaMediciones";

import InstrumentosUtilizados
  from "./components/InstrumentosUtilizados";


// =====================================================
// FORMATO 3.1
// =====================================================

import Formato31
  from "./pages/Formato31";


// =====================================================
// INGENIERÍA DE PROCESOS
// =====================================================

import IngenieriaProcesos
  from "./pages/IngenieriaProcesos";


// =====================================================
// EXCEL DE INGENIERÍA DE PROCESOS
// =====================================================

import {
  prepararExcelIngenieria,
} from "./utils/ingenieriaProcesos/generarExcel";

// =====================================================
// EXCEL COMPLETO DE LA DOCUMENTACIÓN
// =====================================================

import {
  generarExcelCompleto,
} from "./utils/generarExcelCompleto";


// =====================================================
// EXCEL FORMATO 3.1
// =====================================================

import {
  prepararExcel31,
} from "./utils/formato31/generarExcel31";


// =====================================================
// EXCEL DE METROLOGÍA
// =====================================================

import {
  prepararExcel,
} from "./utils/generarExcel";


import {
  obtenerListadoInstrumentosExcel,
} from "./utils/instrumentos";


// =====================================================
// CONFIGURACIÓN DEL FLUJO
// =====================================================

// =====================================================
// FECHA ACTUAL
// =====================================================

function obtenerFechaHoy() {

  const hoy =
    new Date();

  hoy.setHours(
    0,
    0,
    0,
    0
  );

  return hoy;

}


// =====================================================
// FECHA → YYYY-MM-DD
// =====================================================

function fechaISO(
  fecha
) {

  const año =
    fecha.getFullYear();

  const mes =
    String(
      fecha.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const dia =
    String(
      fecha.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${año}-${mes}-${dia}`;

}


// =====================================================
// YYYY-MM-DD → DD/MM/YYYY
// =====================================================

function formatearFecha(
  fechaTexto
) {

  if (!fechaTexto) {

    return "";

  }


  const partes =
    fechaTexto.split("-");


  if (
    partes.length !== 3
  ) {

    return fechaTexto;

  }


  const [
    año,
    mes,
    dia,
  ] = partes;


  return `${dia}/${mes}/${año}`;

}


// =====================================================
// AGREGAR DÍAS CALENDARIO
//
// Ingeniería = Liberación + 10 días
// Metrología = Ingeniería + 5 días
//
// NO son días hábiles.
// =====================================================

function agregarDias(
  fechaTexto,
  cantidadDias
) {

  if (!fechaTexto) {

    return "";

  }


  const fecha =
    new Date(
      `${fechaTexto}T00:00:00`
    );


  if (
    Number.isNaN(
      fecha.getTime()
    )
  ) {

    return "";

  }


  fecha.setDate(
    fecha.getDate() +
    cantidadDias
  );


  return fechaISO(
    fecha
  );

}


// =====================================================
// DATOS INICIALES DE METROLOGÍA
// =====================================================

const datosGeneralesIniciales =
  () => ({

    fecha:
      fechaISO(
        obtenerFechaHoy()
      ),

    op: "",

    ocPo: "",

    componente: "",

    pn: "",

    sn: "",

  });


// =====================================================
// ESTADO INICIAL DEL FLUJO
// =====================================================

const flujoInicial = {

  // -----------------------------------------------
  // FORMATO 3.1
  // -----------------------------------------------

  formato31Completado:
    false,

  fechaCompletado31:
    "",

  fechaLiberacion31:
    "",

  // Datos completos provenientes del 3.1
  datosFormato31:
    null,


  // -----------------------------------------------
  // INGENIERÍA DE PROCESOS
  // -----------------------------------------------

  ingenieriaProcesosCompletada:
    false,

  fechaIngenieriaProcesos:
    "",

  // Datos completos de Ingeniería
  datosIngenieriaProcesos:
    null,


  // -----------------------------------------------
  // METROLOGÍA
  // -----------------------------------------------

  metrologiaCompletada:
    false,

  fechaMetrologia:
    "",

};


// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

function App() {


  // ===================================================
  // VISTA ACTUAL
  // ===================================================

  const [
    vista,
    setVista,
  ] = useState(
    "formato31"
  );


  // ===================================================
  // ESTADO DEL FLUJO
  // ===================================================

  const [
    flujo,
    setFlujo,
  ] = useState({
    ...flujoInicial,
  });

  // Identificador de la documentación actual.
  // Al iniciar una nueva documentación cambia y fuerza a los
  // formularios hijos a comenzar completamente vacíos.
  const [
    documentacionKey,
    setDocumentacionKey,
  ] = useState(0);


  // ===================================================
  // DATOS DE METROLOGÍA
  // ===================================================

  const [
    datosGenerales,
    setDatosGenerales,
  ] = useState(
    datosGeneralesIniciales()
  );


  // ===================================================
  // MEDICIONES
  // ===================================================

  const [
    mediciones,
    setMediciones,
  ] = useState([]);


  // ===================================================
  // ESTADO EXCEL
  // ===================================================

  const [
    generandoExcel,
    setGenerandoExcel,
  ] = useState(false);
const [
    excelDescargado,
    setExcelDescargado,
  ] = useState(false);


  // ===================================================
  // INSTRUMENTOS
  // ===================================================

  const instrumentosUtilizados =
    obtenerListadoInstrumentosExcel(
      mediciones
    );


  // ===================================================
  // COMPLETAR FORMATO 3.1
  // ===================================================

  const manejarFormato31Completado =
    (datosFormato31) => {

      // -----------------------------------------------
      // FECHA DE LIBERACIÓN
      // -----------------------------------------------

      const fechaLiberacion =
        datosFormato31?.fechaLiberacion ||
        "";


      // -----------------------------------------------
      // FECHA DE INGENIERÍA
      //
      // Liberación + 10 días
      // -----------------------------------------------

      const fechaIngenieria =
        agregarDias(
          fechaLiberacion,
          10
        );


      // -----------------------------------------------
      // FECHA DE METROLOGÍA
      //
      // Ingeniería + 5 días
      // -----------------------------------------------

      const fechaMetrologia =
        agregarDias(
          fechaIngenieria,
          5
        );


      // -----------------------------------------------
      // GUARDAR TODO EL 3.1
      // -----------------------------------------------

      setFlujo(
        (prev) => ({

          ...prev,

          formato31Completado:
            true,

          fechaCompletado31:
            fechaISO(
              obtenerFechaHoy()
            ),

          fechaLiberacion31:
            fechaLiberacion,

          datosFormato31:
            datosFormato31,

          // Al completar nuevamente el 3.1,
          // Ingeniería debe volver a diligenciarse.
          ingenieriaProcesosCompletada:
            false,

          fechaIngenieriaProcesos:
            fechaIngenieria,

          datosIngenieriaProcesos:
            null,

          metrologiaCompletada:
            false,

          fechaMetrologia:
            fechaMetrologia,

        })
      );


      // -----------------------------------------------
      // PASAR A INGENIERÍA
      // -----------------------------------------------

      setVista(
        "ingenieria"
      );

    };


  // ===================================================
  // ABRIR FORMATO 3.1
  // ===================================================

  const abrirFormato31 =
    () => {

      setVista(
        "formato31"
      );

    };


  // ===================================================
  // ABRIR INGENIERÍA DE PROCESOS
  //
  // Solo después de completar 3.1.
  //
  // NO existe bloqueo por fecha.
  // ===================================================

  const abrirIngenieriaProcesos =
    () => {

      if (
        !flujo.formato31Completado
      ) {

        alert(
          "Debes completar el Formato 3.1 antes de continuar con Ingeniería de Procesos."
        );

        return;

      }


      setVista(
        "ingenieria"
      );

    };


  // ===================================================
  // ABRIR METROLOGÍA
  //
  // Solo después de completar Ingeniería.
  //
  // NO se revisa ninguna fecha.
  // ===================================================

  const abrirMetrologia =
    () => {

      if (
        !flujo.formato31Completado
      ) {

        alert(
          "Debes completar el Formato 3.1 antes de ingresar a Metrología."
        );

        return;

      }


      if (
        !flujo.ingenieriaProcesosCompletada
      ) {

        alert(
          "Debes completar Ingeniería de Procesos antes de ingresar a Metrología."
        );

        return;

      }


      setVista(
        "metrologia"
      );

    };


  // ===================================================
  // COMPLETAR INGENIERÍA
  // ===================================================

  const manejarIngenieriaCompletada =
    (datosIngenieria) => {

      const datos31 =
        flujo.datosFormato31 || {};

      const datosIngenieriaCompletos = {

        ...datosIngenieria,

        datosFormato31:
          datos31,

        fechaIngenieria:
          flujo.fechaIngenieriaProcesos || "",

        // La fecha de revisión será un día
        // antes de la fecha de Metrología.
        fechaRevision:
          flujo.fechaMetrologia
            ? agregarDias(
                flujo.fechaMetrologia,
                -1
              )
            : "",

      };

      // -----------------------------------------------
      // Datos Generales de Metrología
      // 3.1 → OP, OC/PO, Componente/Pieza y P/N
      // Ingeniería → S/N
      // -----------------------------------------------

      setDatosGenerales({

        fecha:
          flujo.fechaMetrologia || "",

        op:
          datos31.op || "",

        ocPo:
          datos31.ocPo || "",

        componente:
          datos31.item || "",

        pn:
          datos31.pn || "",

        sn:
          datosIngenieria?.sn || "",

      });

      // -----------------------------------------------
      // Guardar Ingeniería
      // -----------------------------------------------

      setFlujo(
        (prev) => ({
          ...prev,

          ingenieriaProcesosCompletada:
            true,

          datosIngenieriaProcesos:
            datosIngenieriaCompletos,

          metrologiaCompletada:
            false,

        })
      );

      setVista(
        "metrologia"
      );

    };


  // ===================================================
  // COMPLETAR METROLOGÍA
  // ===================================================

  const metrologiaCompleta =
    Boolean(
      datosGenerales?.fecha &&
      datosGenerales?.op &&
      datosGenerales?.ocPo &&
      datosGenerales?.componente &&
      datosGenerales?.pn &&
      datosGenerales?.sn &&
      Array.isArray(mediciones) &&
      mediciones.length > 0
    );

  const manejarMetrologiaCompletada =
    () => {

      if (!metrologiaCompleta) {

        alert(
          "Completa todos los datos generales y agrega al menos una medición antes de finalizar Metrología."
        );

        return;

      }

      setFlujo(
        (prev) => ({
          ...prev,

          metrologiaCompletada:
            true,

        })
      );

    };


  // ===================================================
  // DESCARGA FINAL DE LOS TRES FORMATOS
  // ===================================================

  const [
    descargandoFormatos,
    setDescargandoFormatos,
  ] = useState(false);

  const [
    formatosDescargados,
    setFormatosDescargados,
  ] = useState(false);


  const descargarFormatosPieza =
    async () => {

      // El botón solo aparece cuando metrologiaCompleta es true,
      // por lo tanto esta es la validación correcta para iniciar
      // la descarga final.
      if (
        !metrologiaCompleta
      ) {

        alert(
          "Completa todos los datos generales y agrega al menos una medición antes de descargar los formatos."
        );

        return;

      }

      if (
        descargandoFormatos
      ) {

        return;

      }

      try {

        setDescargandoFormatos(
          true
        );

        setFlujo(
          (prev) => ({
            ...prev,
            metrologiaCompletada:
              true,
          })
        );

        const datos31 =
          flujo.datosFormato31 || {};

        const datosIngenieria =
          flujo.datosIngenieriaProcesos || {};

        // ---------------------------------------------
        // 1. PREPARAR CERTIFICADO 3.1
        // ---------------------------------------------

        const { workbook: workbook31 } =
          await prepararExcel31({
            datos:
              datos31,
          });

        // ---------------------------------------------
        // 2. PREPARAR INGENIERÍA DE PROCESOS
        // ---------------------------------------------

        const { workbook: workbookIngenieria } =
          await prepararExcelIngenieria(
            datosIngenieria
          );

        // ---------------------------------------------
        // 3. PREPARAR METROLOGÍA
        // ---------------------------------------------

        const { workbook: workbookMetrologia } =
          await prepararExcel({
            datosGenerales,

            mediciones,

            instrumentosUtilizados,

          });

        // ---------------------------------------------
        // 4. CONSOLIDAR TODO EN UN SOLO ARCHIVO
        // ---------------------------------------------

        await generarExcelCompleto({
          workbook31,
          workbookIngenieria,
          workbookMetrologia,
          pn:
            datosGenerales?.pn ||
            datos31?.pn ||
            "",
        });

        setFormatosDescargados(
          true
        );

      } catch (error) {

        console.error(
          "Error al generar los tres formatos:",
          error
        );

        alert(
          `No fue posible generar el archivo completo.\n\n${error.message}`
        );

      } finally {

        setDescargandoFormatos(
          false
        );

      }

    };


  // ===================================================
  // NUEVA METROLOGÍA
  // ===================================================

  const nuevaDocumentacion =
    () => {

      const confirmar =
        window.confirm(
          "¿Deseas iniciar una nueva documentación?\n\n" +
          "Se borrarán todos los datos de la pieza actual."
        );

      if (!confirmar) {
        return;
      }

      // Cambiar la key desmonta/remonta los formularios hijos
      // y borra también sus estados internos.
      setDocumentacionKey(
        (prev) => prev + 1
      );

      setFlujo({
        ...flujoInicial,
      });

      setDatosGenerales(
        datosGeneralesIniciales()
      );

      setMediciones([]);

      setFormatosDescargados(
        false
      );

      setDescargandoFormatos(
        false
      );

      setVista(
        "formato31"
      );

    };


  // ===================================================
  // NAVEGACIÓN HACIA ATRÁS
  // ===================================================

  const volverAFormato31 =
    () => {

      setVista(
        "formato31"
      );

    };


  const volverAIngenieria =
    () => {

      setVista(
        "ingenieria"
      );

    };


  // ===================================================
  // ESTADOS DE NAVEGACIÓN
  // ===================================================

  const ingenieriaDisponible =
    flujo.formato31Completado;


  const metrologiaDisponible =
    flujo.ingenieriaProcesosCompletada;


  // ===================================================
  // INTERFAZ
  // ===================================================

  return (

    <div className="app">

      {/* =================================================
          ENCABEZADO
      ================================================= */}

      <header className="app-header">

        <div>

          <h1>
            ATOM-DOCUMENT
          </h1>

          <p>
            Gestión Técnica
          </p>

        </div>

        <span className="version">
          Flujo de fabricación
        </span>

      </header>


      {/* =================================================
          NAVEGACIÓN
      ================================================= */}

      <nav
        className="workflow-nav"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >

        <button
          type="button"
          className={
            vista === "formato31"
              ? "workflow-button active"
              : "workflow-button"
          }
          onClick={
            abrirFormato31
          }
        >
          <strong>
            Formato 3.1
          </strong>
        </button>


        <button
          type="button"
          className={
            !ingenieriaDisponible
              ? "workflow-button locked"
              : vista === "ingenieria"
                ? "workflow-button active"
                : "workflow-button"
          }
          onClick={
            abrirIngenieriaProcesos
          }
          disabled={
            !ingenieriaDisponible
          }
        >
          <strong>
            Ingeniería de Procesos
          </strong>
        </button>


        <button
          type="button"
          className={
            !metrologiaDisponible
              ? "workflow-button locked"
              : vista === "metrologia"
                ? "workflow-button active"
                : "workflow-button"
          }
          onClick={
            abrirMetrologia
          }
          disabled={
            !metrologiaDisponible
          }
        >
          <strong>
            Metrología
          </strong>
        </button>

      </nav>


      {/* =================================================
          FORMATO 3.1
      ================================================= */}

      <div
        style={{
          display:
            vista === "formato31"
              ? "block"
              : "none",
        }}
      >

        <Formato31
          key={
            documentacionKey
          }
          onContinuar={
            manejarFormato31Completado
          }
        />

      </div>


      {/* =================================================
          INGENIERÍA DE PROCESOS
      ================================================= */}

      <div
        style={{
          display:
            vista === "ingenieria"
              ? "block"
              : "none",
        }}
      >

        {
          ingenieriaDisponible ? (

            <>

              <div
                className="back-navigation"
                style={{
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >

                <button
                  type="button"
                  className="button-secondary"
                  onClick={
                    volverAFormato31
                  }
                >
                  ← Volver a Formato 3.1
                </button>

              </div>


              <IngenieriaProcesos
                key={
                  documentacionKey
                }
                datosFormato31={
                  flujo.datosFormato31 || {}
                }
                fechaIngenieria={
                  flujo.fechaIngenieriaProcesos || ""
                }
                onContinuar={
                  manejarIngenieriaCompletada
                }
              />

            </>

          ) : null
        }

      </div>


      {/* =================================================
          METROLOGÍA
      ================================================= */}

      <div
        style={{
          display:
            vista === "metrologia"
              ? "block"
              : "none",
        }}
      >

        {
          metrologiaDisponible ? (

            <div className="container">

              {/* =================================================
                  ENCABEZADO DE METROLOGÍA
              ================================================= */}

              <header className="app-header">

                <div>

                  <h1>
                    METROLOGÍA
                  </h1>

                  <p>
                    Gestión Técnica
                  </p>

                </div>

                <span className="version">
                  AT-GT-P01-P01-F06-V05
                </span>

              </header>


              {/* =================================================
                  FECHA DEL FORMATO
              ================================================= */}

              <section className="workflow-status">

                <h2>
                  Fecha de Metrología
                </h2>

                <p>

                  El formato de Metrología
                  corresponde al:

                  {" "}

                  <strong>
                    {
                      formatearFecha(
                        flujo.fechaMetrologia
                      )
                    }
                  </strong>

                </p>

              </section>


              {/* =================================================
                  BOTÓN VOLVER
              ================================================= */}

              <div
                className="back-navigation"
                style={{
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >

                <button
                  type="button"
                  className="button-secondary"
                  onClick={
                    volverAIngenieria
                  }
                >
                  ← Volver a Ingeniería de Procesos
                </button>

              </div>


              {/* =================================================
                  DATOS GENERALES
              ================================================= */}

              <DatosGenerales
                key={
                  documentacionKey
                }
                datosGenerales={
                  datosGenerales
                }
                setDatosGenerales={
                  setDatosGenerales
                }
              />


              {/* =================================================
                  MEDICIONES
              ================================================= */}

              <ListaMediciones
                key={
                  documentacionKey
                }
                mediciones={
                  mediciones
                }
                setMediciones={
                  setMediciones
                }
              />


              {/* =================================================
                  INSTRUMENTOS
              ================================================= */}

              {
                mediciones.length > 0 && (

                  <InstrumentosUtilizados
                    instrumentos={
                      instrumentosUtilizados
                    }
                  />

                )
              }


              {/* =================================================
                  DESCARGA FINAL
              ================================================= */}

              <section className="final-section">

                {
                  metrologiaCompleta && (

                    <>

                      <button
                        type="button"
                        className="button-excel"
                        onClick={
                          descargarFormatosPieza
                        }
                        disabled={
                          descargandoFormatos ||
                          formatosDescargados
                        }
                      >

                        {
                          descargandoFormatos
                            ? "Generando formatos..."
                            : `Descargar formatos de la pieza (${
                                datosGenerales?.componente ||
                                flujo.datosFormato31?.item ||
                                "PIEZA"
                              })`
                        }

                      </button>


                      {
                        formatosDescargados && (

                          <div className="nueva-metrologia-container">

                            <button
                              type="button"
                              className="button-nueva-metrologia"
                              onClick={
                                nuevaDocumentacion
                              }
                            >
                              Realizar nueva documentación
                            </button>

                            <p>
                              El archivo fue descargado correctamente.
                            </p>

                          </div>

                        )
                      }

                    </>

                  )
                }

              </section>

            </div>

          ) : null
        }

      </div>

    </div>

  );

}


export default App;
import React, { useState } from "react";

import {
  PARAMETROS,
  obtenerInstrumento,
  obtenerUnidad,
  obtenerNombreInstrumento,
} from "../utils/instrumentos";

import {
  calcularResultadosMedicion,
  formatoNumero,
} from "../utils/calculos";


function ListaMediciones({
  mediciones,
  setMediciones,
}) {
  const [medidaAbierta, setMedidaAbierta] =
    useState(null);


  const agregarMedicion = () => {
    const nuevaMedicion = {
      id: Date.now(),

      letra: "",

      parametro: "",

      medidaOriginal: "",

      tolerancia: "±0,10",

      toleranciaManual: false,

      instrumento: "",

      unidad: "",

      medicionesAutomaticas: [
        "",
        "",
        "",
        "",
        "",
      ],

      media: "",

      desviacion: "",
    };


    setMediciones((prev) => [
      ...prev,
      nuevaMedicion,
    ]);


    setMedidaAbierta(
      nuevaMedicion.id
    );
  };


  const eliminarMedicion = (id) => {
    setMediciones((prev) =>
      prev.filter(
        (medicion) =>
          medicion.id !== id
      )
    );


    if (
      medidaAbierta === id
    ) {
      setMedidaAbierta(null);
    }
  };



  const actualizarMedicion = (
    id,
    cambios
  ) => {
    setMediciones((prev) =>
      prev.map((medicion) =>
        medicion.id === id
          ? {
              ...medicion,
              ...cambios,
            }
          : medicion
      )
    );
  };



  const cambiarIdentificacion = (
    medicion,
    valor
  ) => {
    actualizarMedicion(
      medicion.id,
      {
        letra: valor,
      }
    );
  };



  const cambiarParametro = (
    medicion,
    parametro
  ) => {
    const instrumento =
      obtenerInstrumento(
        parametro,
        medicion.medidaOriginal
      );


    const unidad =
      obtenerUnidad(
        parametro
      );


    actualizarMedicion(
      medicion.id,
      {
        parametro,
        instrumento,
        unidad,
      }
    );
  };


  const cambiarMedidaOriginal = (
    medicion,
    valor
  ) => {

    if (
      valor === ""
    ) {
      actualizarMedicion(
        medicion.id,
        {
          medidaOriginal: "",

          instrumento:
            obtenerInstrumento(
              medicion.parametro,
              ""
            ),

          medicionesAutomaticas: [
            "",
            "",
            "",
            "",
            "",
          ],

          media: "",

          desviacion: "",
        }
      );

      return;
    }


    const numero =
      Number(valor);


    if (
      Number.isNaN(numero)
    ) {
      return;
    }


    const resultados =
      calcularResultadosMedicion(
        numero
      );


    const instrumento =
      obtenerInstrumento(
        medicion.parametro,
        numero
      );


    const unidad =
      obtenerUnidad(
        medicion.parametro
      );


    actualizarMedicion(
      medicion.id,
      {
        medidaOriginal: valor,

        instrumento,

        unidad,

        medicionesAutomaticas:
          resultados.medicionesAutomaticas,

        media:
          resultados.media,

        desviacion:
          resultados.desviacion,
      }
    );
  };

  const actualizarTolerancia = (
    medicion,
    valor
  ) => {
    actualizarMedicion(
      medicion.id,
      {
        tolerancia: valor,

        toleranciaManual: true,
      }
    );
  };

  const mostrarInstrumento = (
    instrumento
  ) => {
    if (
      !instrumento
    ) {
      return "Pendiente";
    }


    if (
      typeof instrumento ===
      "string"
    ) {
      return instrumento;
    }


    return obtenerNombreInstrumento(
      instrumento
    );
  };


  return (
    <section className="card">

      {/* =================================================
          ENCABEZADO
      ================================================= */}

      <div className="section-header">

        <div>

          <h2>
            Mediciones
          </h2>

          <p>
            Agrega las características
            que tenga la pieza.
          </p>

        </div>

      </div>


      {/* =================================================
          SIN MEDICIONES
      ================================================= */}

      {mediciones.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
          
          </div>


          <h3>
            No hay medidas agregadas
          </h3>


          <p>
            Agrega la primera
            característica de la pieza
            para comenzar.
          </p>


          <button
            className="button-primary"
            onClick={
              agregarMedicion
            }
          >
            + Agregar primera medida
          </button>

        </div>

      ) : (


        <div className="mediciones-list">

          {mediciones.map(
            (medicion) => {

              const abierta =
                medidaAbierta ===
                medicion.id;


              return (

                <div
                  className={`medicion-item ${
                    abierta
                      ? "abierta"
                      : ""
                  }`}
                  key={
                    medicion.id
                  }
                >

                  {/* ======================================
                      RESUMEN
                  ====================================== */}

                  <div
                    className="medicion-resumen"

                    onClick={() =>
                      setMedidaAbierta(
                        abierta
                          ? null
                          : medicion.id
                      )
                    }
                  >

                    {/* IDENTIFICACIÓN */}

                    <div className="medicion-letra">

                      {medicion.letra ||
                        "?"}

                    </div>


                    {/* PARÁMETRO */}

                    <div className="resumen-principal">

                      <strong>

                        {
                          medicion.parametro ||
                          "Parámetro sin definir"
                        }

                      </strong>


                      <span>

                        {medicion.medidaOriginal
                          ? `${formatoNumero(
                              medicion.medidaOriginal
                            )} ${
                              medicion.unidad ||
                              ""
                            }`
                          : "Sin medida original"}

                      </span>

                    </div>


                    {/* INSTRUMENTO */}

                    <div className="resumen-dato">

                      <small>
                        Instrumento
                      </small>


                      <strong>

                        {
                          mostrarInstrumento(
                            medicion.instrumento
                          )
                        }

                      </strong>

                    </div>


                    {/* TOLERANCIA */}

                    <div className="resumen-dato">

                      <small>
                        Tolerancia
                      </small>


                      <strong>
                        {
                          medicion.tolerancia
                        }
                      </strong>

                    </div>


                    {/* ACCIONES */}

                    <div className="resumen-acciones">

                      <button
                        className="button-edit"

                        onClick={(e) => {

                          e.stopPropagation();

                          setMedidaAbierta(
                            abierta
                              ? null
                              : medicion.id
                          );

                        }}
                      >

                        {
                          abierta
                            ? "Cerrar"
                            : "Editar"
                        }

                      </button>


                      <button
                        className="button-delete"

                        onClick={(e) => {

                          e.stopPropagation();

                          eliminarMedicion(
                            medicion.id
                          );

                        }}
                      >
                        Eliminar
                      </button>

                    </div>

                  </div>


                  {/* ======================================
                      DETALLE
                  ====================================== */}

                  {abierta && (

                    <div className="medicion-detalle">


                      {/* =================================
                          IDENTIFICACIÓN / PARÁMETRO /
                          MEDIDA ORIGINAL
                      ================================= */}

                      <div className="form-grid">


                        {/* IDENTIFICACIÓN */}

                        <div className="form-group">

                          <label>
                            Identificación de medida
                          </label>


                          <input
                            type="text"

                            value={
                              medicion.letra
                            }

                            onChange={(e) =>
                              cambiarIdentificacion(
                                medicion,
                                e.target.value
                              )
                            }

                            placeholder="Ej: A, Ø1, L3..."
                          />


                          <span className="help-text">
                            Puedes utilizar la
                            identificación que
                            corresponda a la pieza.
                          </span>

                        </div>


                        {/* PARÁMETRO */}

                        <div className="form-group">

                          <label>
                            Parámetro
                          </label>


                          <select
                            value={
                              medicion.parametro
                            }

                            onChange={(e) =>
                              cambiarParametro(
                                medicion,
                                e.target.value
                              )
                            }
                          >

                            <option value="">
                              Seleccionar...
                            </option>


                            {PARAMETROS.map(
                              (parametro) => (

                                <option
                                  key={
                                    parametro
                                  }

                                  value={
                                    parametro
                                  }
                                >
                                  {
                                    parametro
                                  }
                                </option>

                              )
                            )}

                          </select>

                        </div>


                        {/* MEDIDA ORIGINAL */}

                        <div className="form-group">

                          <label>
                            Medida original
                          </label>


                          <input
                            type="number"

                            step="0.01"

                            value={
                              medicion.medidaOriginal
                            }

                            onChange={(e) =>
                              cambiarMedidaOriginal(
                                medicion,
                                e.target.value
                              )
                            }

                            placeholder="0,00"
                          />

                        </div>

                      </div>


                      {/* =================================
                          RESULTADOS
                      ================================= */}

                      <div className="resultado-grid">


                        {/* INSTRUMENTO */}

                        <div className="resultado-box">

                          <small>
                            Instrumento
                          </small>


                          <strong>

                            {
                              mostrarInstrumento(
                                medicion.instrumento
                              )
                            }

                          </strong>

                        </div>


                        {/* UNIDAD */}

                        <div className="resultado-box">

                          <small>
                            Unidad
                          </small>


                          <strong>

                            {
                              medicion.unidad ||
                              "—"
                            }

                          </strong>

                        </div>


                        {/* TOLERANCIA */}

                        <div className="resultado-box">

                          <small>
                            Tolerancia
                          </small>


                          <input
                            type="text"

                            value={
                              medicion.tolerancia
                            }

                            onChange={(e) =>
                              actualizarTolerancia(
                                medicion,
                                e.target.value
                              )
                            }
                          />


                          <span className="help-text">

                            Puedes modificarla
                            si la pieza tiene
                            una tolerancia específica.

                          </span>

                        </div>

                      </div>


                      {/* =================================
                          CINCO MEDICIONES
                      ================================= */}

                      <div className="mediciones-automaticas">

                        <h3>
                          Mediciones automáticas
                        </h3>


                        <p>

                          Generadas con una
                          variación de ±0,01
                          respecto a la medida
                          original.

                        </p>


                        <div className="cinco-medidas">

                          {medicion.medicionesAutomaticas.map(
                            (
                              valor,
                              index
                            ) => (

                              <div
                                className="lectura"
                                key={
                                  index
                                }
                              >

                                <span>

                                  Medida{" "}
                                  {index + 1}

                                </span>


                                <strong>

                                  {
                                    formatoNumero(
                                      valor
                                    )
                                  }

                                </strong>

                              </div>

                            )
                          )}

                        </div>

                      </div>


                      {/* =================================
                          MEDIA Y DESVIACIÓN
                      ================================= */}

                      <div className="calculos">


                        <div>

                          <small>
                            Media
                          </small>


                          <strong>

                            {
                              formatoNumero(
                                medicion.media
                              ) || "—"
                            }

                          </strong>

                        </div>


                        <div>

                          <small>
                            Desviación
                          </small>


                          <strong>

                            {
                              formatoNumero(
                                medicion.desviacion
                              ) || "—"
                            }

                          </strong>

                        </div>

                      </div>

                    </div>

                  )}

                </div>

              );
            }
          )}


          {/* =================================================
              AGREGAR MEDIDA AL FINAL
          ================================================= */}

          <div className="agregar-medida-final">

            <button
              className="button-primary"
              onClick={
                agregarMedicion
              }
            >
              + Agregar medida
            </button>

          </div>

        </div>

      )}

    </section>
  );
}


export default ListaMediciones;
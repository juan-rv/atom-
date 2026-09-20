import React from "react";

function CondicionesMateriaPrima({
  datos,
  setDatos,
}) {

 
  const actualizarCondicion = (
    campo,
    valor
  ) => {

    setDatos((prev) => ({

      ...prev,

      condicionesMateriaPrima: {

        ...(prev.condicionesMateriaPrima || {}),

        [campo]: valor,

      },

    }));

  };

 
  const condiciones =
    datos.condicionesMateriaPrima || {};

  const formaSuministro =
    datos.formaSuministro || "";


  const formaSuministroTexto =
    formaSuministro === "redondo"
      ? "Redondo"
      : formaSuministro === "placa"
        ? "Placa"
        : "";


  return (

    <section className="formato31-section">


      <div className="formato31-section-title">

        CONDICIONES DE LA MATERIA PRIMA

      </div>


      <div className="formato31-grid">


        <div className="formato31-field">

          <label>
            Forma de suministro
          </label>

          <input
            type="text"
            value={formaSuministroTexto}
            readOnly
            placeholder="Se obtiene de la descripción general del producto"
          />

        </div>

        <div className="formato31-field">

          <label>
            Tratamiento de calcio y silicio
          </label>

          <select
            value={
              condiciones.tratamientoCalcioSilicio ||
              ""
            }
            onChange={(e) =>
              actualizarCondicion(
                "tratamientoCalcioSilicio",
                e.target.value
              )
            }
          >

            <option value="">
              Seleccione una opción
            </option>

            <option value="OK">
              OK
            </option>

            <option value="N/A">
              N/A
            </option>

          </select>

        </div>

        <div className="formato31-field">

          <label>
            MPI Test
          </label>

          <select
            value={
              condiciones.mpiTest || ""
            }
            onChange={(e) =>
              actualizarCondicion(
                "mpiTest",
                e.target.value
              )
            }
          >

            <option value="">
              Seleccione una opción
            </option>

            <option value="OK">
              OK
            </option>

            <option value="N/A">
              N/A
            </option>

          </select>

        </div>


        <div className="formato31-field">

          <label>
            Test ultrasónico
          </label>

          <select
            value={
              condiciones.testUltrasonico ||
              ""
            }
            onChange={(e) =>
              actualizarCondicion(
                "testUltrasonico",
                e.target.value
              )
            }
          >

            <option value="">
              Seleccione una opción
            </option>

            <option value="OK">
              OK
            </option>

            <option value="N/A">
              N/A
            </option>

          </select>

        </div>


      </div>


      <div className="formato31-info-box">

        <strong>
          Nota:
        </strong>

        <span>
          Las condiciones que no apliquen a la
          materia prima deberán registrarse como
          N/A.
        </span>

      </div>


    </section>

  );

}

export default CondicionesMateriaPrima;
import React, { useMemo } from "react";

import {
  obtenerMaterial,
} from "../../utils/formato31/materiales";

import {
  calcularPesoNeto,
} from "../../utils/formato31/calculos31";


function DescripcionProducto({
  datos,
  setDatos,
}) {


  const material = useMemo(() => {

    return obtenerMaterial(
      datos.materialId
    );

  }, [
    datos.materialId,
  ]);


  const dimensiones =
    datos.dimensiones || {

      diametro: "",
      largo: "",
      ancho: "",
      alto: "",

    };



  const actualizarCampo = (
    campo,
    valor
  ) => {

    setDatos((prev) => ({
      ...prev,
      [campo]: valor,
    }));

  };


  const actualizarDimension = (
    campo,
    valor
  ) => {

    setDatos((prev) => ({
      ...prev,

      dimensiones: {

        ...(prev.dimensiones || {}),

        [campo]: valor,

      },

    }));

  };


  const manejarFormaSuministro = (
    valor
  ) => {

    setDatos((prev) => ({

      ...prev,

      formaSuministro:
        valor,

      dimensiones: {

        diametro: "",
        largo: "",
        ancho: "",
        alto: "",

      },

    }));

  };


  const pesoNeto = useMemo(() => {

    if (
      !material ||
      !material.densidad
    ) {

      return null;

    }


    try {

      return calcularPesoNeto(
        datos.formaSuministro,
        dimensiones,
        material.densidad
      );

    } catch (error) {

      return null;

    }

  }, [
    material,
    datos.formaSuministro,
    dimensiones.diametro,
    dimensiones.largo,
    dimensiones.ancho,
    dimensiones.alto,
  ]);



  const pesoNetoMostrar =
    pesoNeto !== null
      ? Number(
          pesoNeto
        ).toFixed(2)
      : "";




  const pesoMecanizado =
    datos.pesoMecanizado || "";



  const pesoMecanizadoNumero =
    Number(
      pesoMecanizado
    );


  const pesoNetoNumero =
    Number(
      pesoNeto
    );


  const pesoMecanizadoValido =
    pesoMecanizado !== "" &&
    Number.isFinite(
      pesoMecanizadoNumero
    ) &&
    pesoMecanizadoNumero > 0 &&
    pesoNeto !== null &&
    Number.isFinite(
      pesoNetoNumero
    ) &&
    pesoMecanizadoNumero <
      pesoNetoNumero;


  const pesoMecanizadoMayorOIgual =
    pesoMecanizado !== "" &&
    pesoNeto !== null &&
    Number.isFinite(
      pesoMecanizadoNumero
    ) &&
    Number.isFinite(
      pesoNetoNumero
    ) &&
    pesoMecanizadoNumero >=
      pesoNetoNumero;


  return (

    <section className="formato31-section">



      <div className="formato31-section-title">

        DESCRIPCIÓN GENERAL DEL PRODUCTO

      </div>


      <div className="formato31-grid">


        <div className="formato31-field">

          <label>
            Pieza
          </label>

          <input
            type="text"
            value={
              datos.item || ""
            }
            readOnly
          />

          <small>
            Tomado automáticamente de Ítem / Nombre.
          </small>

        </div>



        <div className="formato31-field">

          <label>
            Material
          </label>

          <input
            type="text"
            value={
              material
                ? material.nombre
                : ""
            }
            readOnly
          />

          <small>
            Tomado automáticamente del material seleccionado.
          </small>

        </div>


        <div className="formato31-field">

          <label>
            Forma de suministro
          </label>

          <select
            value={
              datos.formaSuministro || ""
            }
            onChange={(e) =>
              manejarFormaSuministro(
                e.target.value
              )
            }
          >

            <option value="">
              Seleccione una opción
            </option>

            <option value="redondo">
              Redondo
            </option>

            <option value="placa">
              Placa
            </option>

          </select>

        </div>


        <div className="formato31-field">

          <label>
            Cantidad / QTY
          </label>

          <input
            type="number"
            value={
              datos.cantidad || ""
            }
            readOnly
          />

          <small>
            La cantidad se diligencia una sola vez
            en Información Inicial.
          </small>

        </div>



        {datos.formaSuministro ===
          "redondo" && (

          <>

            <div className="formato31-field">

              <label>
                Diámetro (mm)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  dimensiones.diametro ||
                  ""
                }
                onChange={(e) =>
                  actualizarDimension(
                    "diametro",
                    e.target.value
                  )
                }
                placeholder="Ej. 50"
              />

            </div>


            <div className="formato31-field">

              <label>
                Largo (mm)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  dimensiones.largo ||
                  ""
                }
                onChange={(e) =>
                  actualizarDimension(
                    "largo",
                    e.target.value
                  )
                }
                placeholder="Ej. 100"
              />

            </div>

          </>

        )}



        {datos.formaSuministro ===
          "placa" && (

          <>

            <div className="formato31-field">

              <label>
                Largo (mm)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  dimensiones.largo ||
                  ""
                }
                onChange={(e) =>
                  actualizarDimension(
                    "largo",
                    e.target.value
                  )
                }
                placeholder="Ej. 100"
              />

            </div>


            <div className="formato31-field">

              <label>
                Ancho (mm)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  dimensiones.ancho ||
                  ""
                }
                onChange={(e) =>
                  actualizarDimension(
                    "ancho",
                    e.target.value
                  )
                }
                placeholder="Ej. 50"
              />

            </div>


            <div className="formato31-field">

              <label>
                Alto / Espesor (mm)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  dimensiones.alto ||
                  ""
                }
                onChange={(e) =>
                  actualizarDimension(
                    "alto",
                    e.target.value
                  )
                }
                placeholder="Ej. 10"
              />

            </div>

          </>

        )}


        <div className="formato31-field">

          <label>
            Peso neto (g)
          </label>

          <input
            type="text"
            value={
              pesoNetoMostrar
            }
            readOnly
            placeholder="Se calculará automáticamente"
          />

          <small>
            Calculado automáticamente mediante
            dimensiones y densidad del material.
          </small>

        </div>

        <div className="formato31-field">

          <label>
            Peso mecanizado (g)
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={
              pesoMecanizado
            }
            onChange={(e) =>
              actualizarCampo(
                "pesoMecanizado",
                e.target.value
              )
            }
            placeholder="Ingrese peso mecanizado"
            className={
              pesoMecanizadoMayorOIgual
                ? "input-error"
                : ""
            }
          />



          {pesoMecanizadoMayorOIgual && (

            <small
              className="formato31-error"
            >

              ⚠️ El peso mecanizado debe ser
              menor que el peso neto.

            </small>

          )}

          {pesoMecanizadoValido && (

            <small
              className="formato31-success"
            >

              ✓ Peso mecanizado válido.

            </small>

          )}

        </div>



        <div className="formato31-field">

          <label>
            Densidad del material
          </label>

          <input
            type="text"
            value={
              material
                ? `${material.densidad} ${
                    material.unidadDensidad ||
                    "g/cm³"
                  }`
                : ""
            }
            readOnly
          />

          <small>
            Valor utilizado para calcular el peso neto.
          </small>

        </div>

      </div>


      {material && (

        <div className="formato31-material-info">

          <div>

            <strong>
              Material:
            </strong>{" "}

            {material.nombre}

          </div>


          <div>

            <strong>
              Densidad:
            </strong>{" "}

            {material.densidad}{" "}

            {material.unidadDensidad ||
              "g/cm³"}

          </div>


          {pesoNeto !== null && (

            <div>

              <strong>
                Peso neto calculado:
              </strong>{" "}

              {pesoNetoMostrar} g

            </div>

          )}


          {pesoMecanizadoMayorOIgual && (

            <div className="formato31-error">

              ⚠️ El peso mecanizado
              ({pesoMecanizadoNumero.toFixed(2)} g)
              debe ser menor que el peso neto
              ({pesoNetoNumero.toFixed(2)} g).

            </div>

          )}

        </div>

      )}

    </section>

  );

}


export default DescripcionProducto;
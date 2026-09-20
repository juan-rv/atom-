import React, {
  useMemo,
  useState,
} from "react";

import DatosIniciales31 from "../components/formato31/DatosIniciales31";
import ComposicionQuimica from "../components/formato31/ComposicionQuimica";
import PropiedadesMecanicas from "../components/formato31/PropiedadesMecanicas";
import DescripcionProducto from "../components/formato31/DescripcionProducto";
import CondicionesMateriaPrima from "../components/formato31/CondicionesMateriaPrima";

import {
  obtenerMaterial,
} from "../utils/formato31/materiales";

import {
  calcularPesoNeto,
} from "../utils/formato31/calculos31";

import {
  calcularFechaEntrega,
} from "../utils/formato31/fechas31";


function Formato31({
  onContinuar,
}) {

  // =====================================================
  // DATOS DEL FORMATO 3.1
  // =====================================================

  const [datos, setDatos] = useState({

    // ---------------------------------------------------
    // INFORMACIÓN INICIAL
    // ---------------------------------------------------

    pn: "",

    item: "",

    cantidad: "",

    fechaSolicitud: "",

    fechaEntrega: "",

    fechaLiberacion: "",

    cliente: "",

    observacion: "",

    proveedorId: "",

    materialId: "",

    op: "",

    ocPo: "",

    codigoCliente: "",


    // ---------------------------------------------------
    // DESCRIPCIÓN DEL PRODUCTO
    // ---------------------------------------------------

    pesoMecanizado: "",

    // QTY ya NO se solicita manualmente.
    // Se obtiene automáticamente desde cantidad.
    qty: "",

    formaSuministro: "",

    dimensiones: {

      diametro: "",

      largo: "",

      ancho: "",

      alto: "",

    },


    // ---------------------------------------------------
    // CONDICIONES DE MATERIA PRIMA
    // ---------------------------------------------------

    condicionesMateriaPrima: {

      tratamientoCalcioSilicio: "",

      mpiTest: "",

      testUltrasonico: "",

    },

  });


  // =====================================================
  // ESTADO DE VALIDACIÓN
  // =====================================================

  const [
    intentoContinuar,
    setIntentoContinuar,
  ] = useState(false);


  // =====================================================
  // ACTUALIZAR DATOS
  // =====================================================

  const actualizarDatos = (
    nuevosDatos
  ) => {

    setDatos((prev) => ({

      ...prev,

      ...nuevosDatos,

    }));

  };


  // =====================================================
  // CAMBIO DE FECHA DE SOLICITUD
  // =====================================================

  const manejarFechaSolicitud = (fecha) => {

    let fechaEntrega = "";
    let fechaLiberacion = "";
  
  
    if (fecha) {
  
      try {
  
        // =================================================
        // FECHA DE ENTREGA
        // =================================================
  
        fechaEntrega =
          calcularFechaEntrega(
            fecha
          );
  
  
        // =================================================
        // FECHA DE LIBERACIÓN
        // =================================================
        //
        // Fecha de entrega + 2 días
        //
        // =================================================
  
        if (fechaEntrega) {
  
          const fecha =
            new Date(
              `${fechaEntrega}T00:00:00`
            );
  
  
          fecha.setDate(
            fecha.getDate() + 2
          );
  
  
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
  
  
          fechaLiberacion =
            `${año}-${mes}-${dia}`;
  
        }
  
  
      } catch (error) {
  
        console.error(
          "Error calculando fechas:",
          error
        );
  
      }
  
    }
  
  
    // =====================================================
    // ACTUALIZAR ESTADO
    // =====================================================
  
    setDatos((prev) => ({
  
      ...prev,
  
      fechaSolicitud:
        fecha,
  
      fechaEntrega,
  
      fechaLiberacion,
  
    }));
  
  };


  // =====================================================
  // MATERIAL
  // =====================================================

  const material = useMemo(() => {

    return obtenerMaterial(
      datos.materialId
    );

  }, [
    datos.materialId,
  ]);


  // =====================================================
  // PESO NETO
  // =====================================================

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

        datos.dimensiones || {},

        material.densidad

      );

    } catch (error) {

      return null;

    }

  }, [

    material,

    datos.formaSuministro,

    datos.dimensiones?.diametro,

    datos.dimensiones?.largo,

    datos.dimensiones?.ancho,

    datos.dimensiones?.alto,

  ]);


  // =====================================================
  // SINCRONIZAR QTY CON CANTIDAD
  // =====================================================
  //
  // QTY no es un dato independiente.
  //
  // Siempre debe ser igual a cantidad.
  //
  // =====================================================

  const cantidadNumero =
    Number(
      datos.cantidad
    );


  const pesoMecanizadoNumero =
    Number(
      datos.pesoMecanizado
    );


  // =====================================================
  // VALIDACIÓN DE PESO
  // =====================================================

  const pesoValido =

    datos.pesoMecanizado !== "" &&

    Number.isFinite(
      pesoMecanizadoNumero
    ) &&

    pesoMecanizadoNumero > 0 &&

    pesoNeto !== null &&

    Number.isFinite(
      Number(pesoNeto)
    ) &&

    pesoMecanizadoNumero <
      Number(pesoNeto);


  const pesoInvalido =

    datos.pesoMecanizado !== "" &&

    Number.isFinite(
      pesoMecanizadoNumero
    ) &&

    (

      pesoMecanizadoNumero <= 0 ||

      (
        pesoNeto !== null &&

        Number.isFinite(
          Number(pesoNeto)
        ) &&

        pesoMecanizadoNumero >=
          Number(pesoNeto)
      )

    );


  // =====================================================
  // VALIDACIÓN GENERAL
  // =====================================================

  const errores = useMemo(() => {

    const lista = [];


    // ---------------------------------------------------
    // P/N
    // ---------------------------------------------------

    if (
      !String(
        datos.pn || ""
      ).trim()
    ) {

      lista.push(
        "P/N"
      );

    }


    // ---------------------------------------------------
    // ITEM
    // ---------------------------------------------------

    if (
      !String(
        datos.item || ""
      ).trim()
    ) {

      lista.push(
        "Ítem / Nombre"
      );

    }


    // ---------------------------------------------------
    // CANTIDAD
    // ---------------------------------------------------

    if (
      !Number.isFinite(
        cantidadNumero
      ) ||
      cantidadNumero <= 0
    ) {

      lista.push(
        "Cantidad"
      );

    }


    // ---------------------------------------------------
    // FECHA SOLICITUD
    // ---------------------------------------------------

    if (
      !String(
        datos.fechaSolicitud || ""
      ).trim()
    ) {

      lista.push(
        "Fecha de solicitud"
      );

    }


    // ---------------------------------------------------
    // FECHA ENTREGA
    // ---------------------------------------------------

    if (
      !String(
        datos.fechaEntrega || ""
      ).trim()
    ) {

      lista.push(
        "Fecha de entrega"
      );

    }


    // ---------------------------------------------------
    // FECHA LIBERACIÓN
    // ---------------------------------------------------

    if (
      !String(
        datos.fechaLiberacion || ""
      ).trim()
    ) {

      lista.push(
        "Fecha de liberación"
      );

    }


    // ---------------------------------------------------
    // CLIENTE
    // ---------------------------------------------------

    if (
      !String(
        datos.cliente || ""
      ).trim()
    ) {

      lista.push(
        "Cliente"
      );

    }


    // ---------------------------------------------------
    // PROVEEDOR
    // ---------------------------------------------------

    if (
      !String(
        datos.proveedorId || ""
      ).trim()
    ) {

      lista.push(
        "Proveedor"
      );

    }


    // ---------------------------------------------------
    // MATERIAL
    // ---------------------------------------------------

    if (
      !String(
        datos.materialId || ""
      ).trim()
    ) {

      lista.push(
        "Material"
      );

    }


    // ---------------------------------------------------
    // OP
    // ---------------------------------------------------

    if (
      !String(
        datos.op || ""
      ).trim()
    ) {

      lista.push(
        "OP"
      );

    }


    // ---------------------------------------------------
    // OC / PO
    // ---------------------------------------------------

    if (
      !String(
        datos.ocPo || ""
      ).trim()
    ) {

      lista.push(
        "OC / PO"
      );

    }


    // ---------------------------------------------------
    // CÓDIGO CLIENTE
    // ---------------------------------------------------

    if (
      !String(
        datos.codigoCliente || ""
      ).trim()
    ) {

      lista.push(
        "Código de cliente"
      );

    }


    // ---------------------------------------------------
    // OBSERVACIÓN
    // ---------------------------------------------------

    if (
      !String(
        datos.observacion || ""
      ).trim()
    ) {

      lista.push(
        "Observación"
      );

    }


    // ---------------------------------------------------
    // FORMA DE SUMINISTRO
    // ---------------------------------------------------

    if (
      !String(
        datos.formaSuministro || ""
      ).trim()
    ) {

      lista.push(
        "Forma de suministro"
      );

    }


    // ---------------------------------------------------
    // DIMENSIONES
    // ---------------------------------------------------

    const dimensiones =
      datos.dimensiones || {};


    if (
      datos.formaSuministro ===
      "redondo"
    ) {

      if (
        !Number.isFinite(
          Number(
            dimensiones.diametro
          )
        ) ||
        Number(
          dimensiones.diametro
        ) <= 0
      ) {

        lista.push(
          "Diámetro"
        );

      }


      if (
        !Number.isFinite(
          Number(
            dimensiones.largo
          )
        ) ||
        Number(
          dimensiones.largo
        ) <= 0
      ) {

        lista.push(
          "Largo"
        );

      }

    }


    if (
      datos.formaSuministro ===
      "placa"
    ) {

      if (
        !Number.isFinite(
          Number(
            dimensiones.largo
          )
        ) ||
        Number(
          dimensiones.largo
        ) <= 0
      ) {

        lista.push(
          "Largo"
        );

      }


      if (
        !Number.isFinite(
          Number(
            dimensiones.ancho
          )
        ) ||
        Number(
          dimensiones.ancho
        ) <= 0
      ) {

        lista.push(
          "Ancho"
        );

      }


      if (
        !Number.isFinite(
          Number(
            dimensiones.alto
          )
        ) ||
        Number(
          dimensiones.alto
        ) <= 0
      ) {

        lista.push(
          "Alto / Espesor"
        );

      }

    }


    // ---------------------------------------------------
    // PESO NETO
    // ---------------------------------------------------

    if (
      pesoNeto === null ||
      !Number.isFinite(
        Number(pesoNeto)
      ) ||
      Number(pesoNeto) <= 0
    ) {

      lista.push(
        "Peso neto"
      );

    }


    // ---------------------------------------------------
    // PESO MECANIZADO
    // ---------------------------------------------------

    if (
      datos.pesoMecanizado === ""
    ) {

      lista.push(
        "Peso mecanizado"
      );

    } else if (
      !pesoValido
    ) {

      lista.push(
        "Peso mecanizado debe ser menor que el peso neto"
      );

    }


    // ---------------------------------------------------
    // CONDICIONES
    // ---------------------------------------------------

    const condiciones =
      datos.condicionesMateriaPrima ||
      {};


    if (
      !String(
        condiciones
          .tratamientoCalcioSilicio ||
        ""
      ).trim()
    ) {

      lista.push(
        "Tratamiento de calcio y silicio"
      );

    }


    if (
      !String(
        condiciones.mpiTest ||
        ""
      ).trim()
    ) {

      lista.push(
        "MPI Test"
      );

    }


    if (
      !String(
        condiciones.testUltrasonico ||
        ""
      ).trim()
    ) {

      lista.push(
        "Test ultrasónico"
      );

    }


    return lista;

  }, [

    datos,

    cantidadNumero,

    pesoNeto,

    pesoValido,

  ]);


  // =====================================================
  // FORMATO COMPLETO
  // =====================================================

  const formatoCompleto =
    errores.length === 0;


  // =====================================================
  // CONTINUAR
  // =====================================================

  const manejarContinuar = () => {

    setIntentoContinuar(
      true
    );


    if (
      !formatoCompleto
    ) {

      return;

    }


    // ---------------------------------------------------
    // QTY AUTOMÁTICO
    // ---------------------------------------------------

    const datosFinales = {

      ...datos,

      qty:
        datos.cantidad,

    
      pesoNeto:
        pesoNeto,

    };


    // ---------------------------------------------------
    // ENVIAR AL SIGUIENTE FORMATO
    // ---------------------------------------------------

    if (
      typeof onContinuar ===
      "function"
    ) {

      onContinuar(
        datosFinales
      );

    } else {

      console.log(
        "Formato 3.1 completo:",
        datosFinales
      );

    }

  };


  // =====================================================
  // INTERFAZ
  // =====================================================

  return (

    <div className="formato31-page">

      {/* =================================================
          ENCABEZADO
      ================================================= */}

      <header className="formato31-header">

        <div>

          <h1>
            FORMATO 3.1
          </h1>

          <p>
            Control de recepción de materiales
          </p>

        </div>


        <span className="formato31-version">
          AT-GT-P01-F12
        </span>

      </header>


      {/* =================================================
          CONTENIDO
      ================================================= */}

      <main className="formato31-container">


        {/* =================================================
            INFORMACIÓN INICIAL
        ================================================= */}

        <DatosIniciales31
          datos={datos}
          setDatos={setDatos}
          actualizarDatos={
            actualizarDatos
          }
          manejarFechaSolicitud={
            manejarFechaSolicitud
          }
        />


        {/* =================================================
            COMPOSICIÓN QUÍMICA
        ================================================= */}

<ComposicionQuimica
  materialId={datos.materialId}
/>


        {/* =================================================
            PROPIEDADES MECÁNICAS
        ================================================= */}

<PropiedadesMecanicas
  materialId={datos.materialId}
/>


        {/* =================================================
            DESCRIPCIÓN DEL PRODUCTO
        ================================================= */}

        <DescripcionProducto
          datos={datos}
          setDatos={setDatos}
        />


        {/* =================================================
            CONDICIONES DE MATERIA PRIMA
        ================================================= */}

        <CondicionesMateriaPrima
          datos={datos}
          setDatos={setDatos}
        />


        {/* =================================================
            VALIDACIÓN
        ================================================= */}

        {intentoContinuar &&
          !formatoCompleto && (

          <section className="formato31-validation-error">

            <div className="formato31-section-title">

              ⚠️ FORMATO 3.1 INCOMPLETO

            </div>


            <p>
              No puedes continuar hasta completar
              todos los campos obligatorios.
            </p>


            <ul>

              {errores.map(
                (
                  error,
                  index
                ) => (

                  <li
                    key={index}
                  >
                    {error}
                  </li>

                )
              )}

            </ul>

          </section>

        )}


        {/* =================================================
            VALIDACIÓN PESO
        ================================================= */}

        {intentoContinuar &&
          pesoInvalido && (

          <section className="formato31-validation-error">

            <strong>
              ⚠️ Validación de peso
            </strong>

            <p>

              El peso mecanizado debe ser
              estrictamente menor que el
              peso neto calculado.

            </p>


            {pesoNeto !== null && (

              <p>

                Peso neto:{" "}

                <strong>
                  {Number(
                    pesoNeto
                  ).toFixed(2)} g
                </strong>

                <br />

                Peso mecanizado:{" "}

                <strong>
                  {Number(
                    pesoMecanizadoNumero
                  ).toFixed(2)} g
                </strong>

              </p>

            )}

          </section>

        )}


              {/* =================================================
            RESUMEN DE ESTADO
        ================================================= */}

{/* =================================================
    RESUMEN DE ESTADO
================================================= */}

<section className="formato31-final-section">

  {intentoContinuar && (

    formatoCompleto ? (

      <div className="formato31-success">

        <strong>
          ✓ Formato 3.1 completo
        </strong>

        <p>
          Todos los campos obligatorios
          están diligenciados correctamente.
        </p>

      </div>

    ) : (

      <div>

        <strong>
          Formato 3.1 pendiente
        </strong>

        <p>
          Completa todos los campos antes
          de continuar con el siguiente proceso.
        </p>

      </div>

    )

  )}

  {/* =================================================
      BOTÓN SIGUIENTE
  ================================================= */}

  <button
    type="button"
    className="button-primary"
    onClick={manejarContinuar}
  >
    Continuar con Ingeniería de Procesos →
  </button>

</section>

      </main>

    </div>

  );

}


export default Formato31;
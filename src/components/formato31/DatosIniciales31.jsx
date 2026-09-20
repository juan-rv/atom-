import React, {
  useEffect,
} from "react";

import {
  PROVEEDORES,
} from "../../utils/formato31/proveedores";

import {
  MATERIALES,
} from "../../utils/formato31/materiales";


function DatosIniciales31({
  datos,
  setDatos,
  manejarFechaSolicitud,
}) {


  const obtenerFechaActual = () => {

    const hoy =
      new Date();


    const año =
      hoy.getFullYear();


    const mes =
      String(
        hoy.getMonth() + 1
      ).padStart(
        2,
        "0"
      );


    const dia =
      String(
        hoy.getDate()
      ).padStart(
        2,
        "0"
      );


    return `${año}-${mes}-${dia}`;

  };



  useEffect(() => {

    if (
      datos.fechaSolicitud
    ) {

      return;

    }


    const fechaHoy =
      obtenerFechaActual();


    if (
      typeof manejarFechaSolicitud ===
      "function"
    ) {

      manejarFechaSolicitud(
        fechaHoy
      );

      return;

    }



    setDatos((prev) => ({

      ...prev,

      fechaSolicitud:
        fechaHoy,

    }));

  }, []);


  // =====================================================
  // ACTUALIZAR CAMPO
  // =====================================================

  const actualizarCampo = (
    campo,
    valor
  ) => {

    setDatos((prev) => ({

      ...prev,

      [campo]:
        valor,

    }));

  };


  const manejarCambioFechaSolicitud = (
    valor
  ) => {

    if (
      typeof manejarFechaSolicitud ===
      "function"
    ) {

      manejarFechaSolicitud(
        valor
      );

      return;

    }


    actualizarCampo(
      "fechaSolicitud",
      valor
    );

  };



  const proveedorSeleccionado =
    PROVEEDORES.find(
      (proveedor) =>
        proveedor.id ===
        datos.proveedorId
    );



  const materialSeleccionado =
    MATERIALES.find(
      (material) =>
        material.id ===
        datos.materialId
    );



  return (

    <section className="formato31-section">


      <div className="formato31-section-title">

        INFORMACIÓN INICIAL

      </div>


      <div className="formato31-grid">


        <div className="formato31-field formato31-field-full">

          <label>
            P/N *
          </label>

          <input
            type="text"
            value={
              datos.pn || ""
            }
            onChange={(e) =>
              actualizarCampo(
                "pn",
                e.target.value
              )
            }
            placeholder="Ingrese el Part Number"
          />

          

        </div>


        <div className="formato31-field">

          <label>
            Ítem / Nombre *
          </label>

          <input
            type="text"
            value={
              datos.item || ""
            }
            onChange={(e) =>
              actualizarCampo(
                "item",
                e.target.value
              )
            }
            placeholder="Ingrese el nombre o ítem"
          />

        </div>


        <div className="formato31-field">

          <label>
            Cantidad *
          </label>

          <input
            type="number"
            min="1"
            step="1"
            value={
              datos.cantidad || ""
            }
            onChange={(e) =>
              actualizarCampo(
                "cantidad",
                e.target.value
              )
            }
            placeholder="Cantidad de piezas"
          />


        </div>


        <div className="formato31-field">

          <label>
            Fecha de solicitud *
          </label>

          <input
            type="date"
            value={
              datos.fechaSolicitud || ""
            }
            onChange={(e) =>
              manejarCambioFechaSolicitud(
                e.target.value
              )
            }
          />

          

        </div>


        <div className="formato31-field">

          <label>
            Fecha de entrega
          </label>

          <input
            type="date"
            value={
              datos.fechaEntrega || ""
            }
            readOnly
          />

          

        </div>


        <div className="formato31-field">

          <label>
            Fecha de liberación *
          </label>

          <input
  type="date"
  value={
    datos.fechaLiberacion || ""
  }
  readOnly
/>


        </div>


        <div className="formato31-field">

  <label>
    OP *
  </label>

  <select
    value={datos.op || ""}
    onChange={(e) =>
      actualizarCampo(
        "op",
        e.target.value
      )
    }
  >

    <option value="">
      Seleccione OP
    </option>

    <option value="26130">
      26130
    </option>

  </select>

</div>


        <div className="formato31-field">

  <label>
    OC / PO *
  </label>

  <select
    value={datos.ocPo || ""}
    onChange={(e) =>
      actualizarCampo(
        "ocPo",
        e.target.value
      )
    }
  >

    <option value="">
      Seleccione OC / PO
    </option>

    <option value="PO08810">
      PO08810
    </option>

  </select>

</div>



        <div className="formato31-field">

          <label>
            Cliente *
          </label>

          <input
            type="text"
            value={
              datos.cliente || ""
            }
            onChange={(e) =>
              actualizarCampo(
                "cliente",
                e.target.value
              )
            }
            placeholder="Nombre del cliente"
          />

        </div>


        <div className="formato31-field">

  <label>
    Código de cliente *
  </label>

  <input
    type="text"
    value={
      datos.codigoCliente || ""
    }
    onChange={(e) =>
      actualizarCampo(
        "codigoCliente",
        e.target.value
      )
    }
    placeholder="Código asignado por el cliente"
  />

  <button
    type="button"
    className="button-secondary"
    onClick={() =>
      actualizarCampo(
        "codigoCliente",
        "N/A"
      )
    }
  >
    N/A
  </button>

</div>


        <div className="formato31-field formato31-field-full">

          <label>
            Proveedor *
          </label>

          <select
            value={
              datos.proveedorId || ""
            }
            onChange={(e) =>
              actualizarCampo(
                "proveedorId",
                e.target.value
              )
            }
          >

            <option value="">
              Seleccione un proveedor
            </option>

            {PROVEEDORES.map(
              (proveedor) => (

                <option
                  key={
                    proveedor.id
                  }
                  value={
                    proveedor.id
                  }
                >

                  {proveedor.nombre}

                  {" ; NIT: "}

                  {proveedor.nit}

                </option>

              )
            )}

          </select>

        </div>

        <div className="formato31-field formato31-field-full">

          <label>
            Material *
          </label>

          <select
            value={
              datos.materialId || ""
            }
            onChange={(e) =>
              actualizarCampo(
                "materialId",
                e.target.value
              )
            }
          >

            <option value="">
              Seleccione el material
            </option>

            {MATERIALES.map(
              (material) => (

                <option
                  key={
                    material.id
                  }
                  value={
                    material.id
                  }
                >

                  {material.nombre}

                </option>

              )
            )}

          </select>

        </div>


        {materialSeleccionado && (

          <div
            className="formato31-material-info formato31-field-full"
          >

            <strong>
              Material seleccionado:
            </strong>

            <span>
              {materialSeleccionado.nombre}
            </span>

            <span>

              Densidad:

              {" "}

              {materialSeleccionado.densidad}

              {" "}

              {materialSeleccionado.unidadDensidad ||
                "g/cm³"}

            </span>

          </div>

        )}

        {proveedorSeleccionado && (

          <div
            className="formato31-material-info formato31-field-full"
          >

            <strong>
              Proveedor seleccionado:
            </strong>

            <span>
              {proveedorSeleccionado.nombre}
            </span>

            <span>
              NIT:{" "}
              {proveedorSeleccionado.nit}
            </span>

          </div>

        )}


        <div className="formato31-field formato31-field-full">

          <label>
            Observación *
          </label>

          <textarea
            value={
              datos.observacion || ""
            }
            onChange={(e) =>
              actualizarCampo(
                "observacion",
                e.target.value
              )
            }
            placeholder="Ingrese una observación o escriba N/A"
            rows="3"
          />


          <button
            type="button"
            className="button-secondary"
            onClick={() =>
              actualizarCampo(
                "observacion",
                "N/A"
              )
            }
          >

            N/A

          </button>

        </div>


        <div className="formato31-field formato31-field-full">

          <label>
            Tipo de proceso
          </label>

          <input
            type="text"
            value="FABRICACIÓN"
            readOnly
          />

          

        </div>


      </div>

    </section>

  );

}

export default DatosIniciales31;
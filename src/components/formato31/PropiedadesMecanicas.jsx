import React from "react";

import { obtenerMaterial } from "../../utils/formato31/materiales";


function PropiedadesMecanicas({
  materialId,
}) {


  const material =
    obtenerMaterial(materialId);



  if (!material) {

    return (
      <section className="formato31-section">

        <div className="formato31-section-title">
          PROPIEDADES MECÁNICAS
        </div>

        <p className="formato31-placeholder">
          Seleccione un material para visualizar
          sus propiedades mecánicas.
        </p>

      </section>
    );

  }



  const propiedades =
    material.propiedadesMecanicas;

  return (
    <section className="formato31-section">

      <div className="formato31-section-title">
        PROPIEDADES MECÁNICAS
      </div>


      <div className="formato31-material-selected">

        <strong>
          Material:
        </strong>

        <span>
          {material.nombre}
        </span>

      </div>


      {propiedades ? (

        <div className="formato31-table-container">

          <table className="formato31-table">

            <thead>

              <tr>

                <th>
                  PROPIEDAD
                </th>

                <th>
                  MÍNIMO
                </th>

                <th>
                  MÁXIMO
                </th>

              </tr>

            </thead>


            <tbody>


              <tr>

                <td>
                  Resistencia a la tracción (MPa)
                </td>

                <td>
                  {propiedades.traccion
                    ? propiedades.traccion.minimo
                    : "N/A"}
                </td>

                <td>
                  {propiedades.traccion
                    ? propiedades.traccion.maximo
                    : "N/A"}
                </td>

              </tr>


              <tr>

                <td>
                  Punto de fluencia (MPa)
                </td>

                <td>
                  {propiedades.fluencia
                    ? propiedades.fluencia.minimo
                    : "N/A"}
                </td>

                <td>
                  {propiedades.fluencia
                    ? propiedades.fluencia.maximo
                    : "N/A"}
                </td>

              </tr>

              <tr>

                <td>
                  Elongación (%)
                </td>

                <td>
                  {propiedades.elongacion
                    ? propiedades.elongacion.minimo
                    : "N/A"}
                </td>

                <td>
                  {propiedades.elongacion
                    ? propiedades.elongacion.maximo
                    : "N/A"}
                </td>

              </tr>


              <tr>

                <td>
                  Dureza (HB)
                </td>

                <td>
                  {propiedades.durezaHB
                    ? propiedades.durezaHB.minimo
                    : "N/A"}
                </td>

                <td>
                  {propiedades.durezaHB
                    ? propiedades.durezaHB.maximo
                    : "N/A"}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      ) : (

        <p className="formato31-placeholder">
          Las propiedades mecánicas no están
          especificadas para este material.
        </p>

      )}


      {material.condicionReferencia && (

        <p className="formato31-reference-note">

          Condición de referencia:
          {" "}

          <strong>
            {material.condicionReferencia}
          </strong>

        </p>

      )}

    </section>
  );
}


export default PropiedadesMecanicas;
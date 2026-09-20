import React from "react";

import { obtenerMaterial } from "../../utils/formato31/materiales";


function ComposicionQuimica({
  materialId,
}) {

  const material =
    obtenerMaterial(materialId);


  if (!material) {

    return (
      <section className="formato31-section">

        <div className="formato31-section-title">
          COMPOSICIÓN QUÍMICA
        </div>

        <p className="formato31-placeholder">
          Seleccione un material para visualizar
          su composición química.
        </p>

      </section>
    );

  }


  if (
    !material.composicionQuimica ||
    material.composicionQuimica.length === 0
  ) {

    return (
      <section className="formato31-section">

        <div className="formato31-section-title">
          COMPOSICIÓN QUÍMICA
        </div>

        <p className="formato31-placeholder">

          La composición química no está especificada
          para este material.

        </p>

      </section>
    );

  }

  return (
    <section className="formato31-section">

      <div className="formato31-section-title">
        COMPOSICIÓN QUÍMICA
      </div>


      <div className="formato31-material-selected">

        <strong>
          Material:
        </strong>

        <span>
          {material.nombre}
        </span>

      </div>


      <div className="formato31-table-container">

        <table className="formato31-table">

          <thead>

            <tr>

              <th>
                ELEMENTO
              </th>

              <th>
                MÍNIMO (%)
              </th>

              <th>
                MÁXIMO (%)
              </th>

            </tr>

          </thead>


          <tbody>

            {material.composicionQuimica.map(
              (item, index) => (

                <tr
                  key={`${item.elemento}-${index}`}
                >

                  <td>
                    {item.elemento}
                  </td>

                  <td>
                    {item.minimo}
                  </td>

                  <td>
                    {item.maximo}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>


      {/* =================================================
          CONDICIÓN DE REFERENCIA
      ================================================= */}

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


export default ComposicionQuimica;
function DatosGenerales({
    datosGenerales,
    setDatosGenerales,
  }) {
    const actualizarDato = (campo, valor) => {
      setDatosGenerales((prev) => ({
        ...prev,
        [campo]: valor,
      }));
    };
  
    return (
      <section className="card">
        <div className="section-title">
          <h2>Datos generales</h2>
        </div>
  
        <div className="form-grid">
          <div className="form-group">
            <label>Fecha</label>
  
            <input
              type="date"
              value={datosGenerales.fecha}
              onChange={(e) =>
                actualizarDato(
                  "fecha",
                  e.target.value
                )
              }
            />
          </div>
  
          <div className="form-group">
            <label>OP</label>
  
            <input
              type="text"
              value={datosGenerales.op}
              onChange={(e) =>
                actualizarDato(
                  "op",
                  e.target.value
                )
              }
              placeholder="Orden de producción"
            />
          </div>
  
          <div className="form-group">
            <label>OC / PO</label>
  
            <input
              type="text"
              value={datosGenerales.ocPo}
              onChange={(e) =>
                actualizarDato(
                  "ocPo",
                  e.target.value
                )
              }
              placeholder="Orden de compra"
            />
          </div>
  
          <div className="form-group full-width">
            <label>Componente</label>
  
            <input
              type="text"
              value={datosGenerales.componente}
              onChange={(e) =>
                actualizarDato(
                  "componente",
                  e.target.value
                )
              }
              placeholder="Nombre completo de la pieza"
            />
          </div>
  
          <div className="form-group">
            <label>P/N</label>
  
            <input
              type="text"
              value={datosGenerales.pn}
              onChange={(e) =>
                actualizarDato(
                  "pn",
                  e.target.value
                )
              }
              placeholder="Part Number"
            />
          </div>
  
          <div className="form-group">
            <label>S/N</label>
  
            <input
              type="text"
              value={datosGenerales.sn}
              onChange={(e) =>
                actualizarDato(
                  "sn",
                  e.target.value
                )
              }
              placeholder="Serial Number"
            />
          </div>
        </div>
      </section>
    );
  }
  
  export default DatosGenerales;
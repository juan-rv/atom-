function InstrumentosUtilizados({
  instrumentos,
}) {
  return (
    <section className="card">

      <div className="section-title">

        <h2>
          Instrumentos de medición utilizados
        </h2>

        <p className="section-description">
          Estos instrumentos se agregarán
          automáticamente al Excel.
        </p>

      </div>


      <div className="instrumentos-preview">

        {instrumentos.map(
          (instrumento) => (

            <span
              className="instrumento-tag"
              key={instrumento}
            >
              {instrumento}
            </span>

          )
        )}

      </div>

    </section>
  );
}

export default InstrumentosUtilizados;
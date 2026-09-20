export const PARAMETROS = [
  "Length E",
  "Longitud I",
  "Diámetro",
  "Peso",
  "Ángulo",
];



export const INSTRUMENTOS = {

  CALIBRADOR_0_150: {
    nombre: "Caliper",
    rango: "0-150 mm",
    codigo: "AT-MI-P02-IT06",
  },

  CALIBRADOR_0_300: {
    nombre: "Caliper",
    rango: "0-300 mm",
    codigo: "AT-MI-P02-IT16",
  },

  FLEXOMETRO: {
    nombre: "Flexometer",
    rango: "",
    codigo: "AT-MI-P02-IT35",
  },

  MICROMETRO_EXTERIORES_0_25: {
    nombre: "Outside Micrometer",
    rango: "0-25 mm",
    codigo: "AT-MI-P02-IT46",
  },

  MICROMETRO_EXTERIORES_25_50: {
    nombre: "Outside Micrometer",
    rango: "25-50 mm",
    codigo: "AT-MI-P02-IT47",
  },

  MICROMETRO_EXTERIORES_50_75: {
    nombre: "Outside Micrometer",
    rango: "50-75 mm",
    codigo: "AT-MI-P02-IT48",
  },

  MICROMETRO_INTERIORES_13_16: {
    nombre: "Inside Micrometer",
    rango: "13-16 mm",
    codigo: "AT-MI-P02-IT25",
  },

  BASCULA: {
    nombre: "Precision Scale",
    rango: "",
    codigo: "AT-MI-P02-IT28",
  },

  BLOQUES_PATRON: {
    nombre: "Gauge Block Set",
    rango: "87 piezas",
    codigo: "AT-MI-P02-IT26",
  },
};


export function obtenerNombreInstrumento(
  instrumento
) {

  if (!instrumento) {
    return "";
  }



  if (
    typeof instrumento === "string"
  ) {
    return instrumento;
  }


  const nombre =
    instrumento.nombre || "";


  const rango =
    instrumento.rango || "";


  if (
    nombre &&
    rango
  ) {
    return `${nombre} ${rango}`;
  }


  return nombre;
}



export function obtenerInstrumento(
  parametro,
  medidaOriginal
) {

  const medida =
    Number(medidaOriginal);

  if (
    Number.isNaN(medida)
  ) {
    return "";
  }


  if (
    parametro === "Length E"
  ) {

      if (
      medida >= 0 &&
      medida <= 25
    ) {
      return (
        INSTRUMENTOS
          .MICROMETRO_EXTERIORES_0_25
      );
    }


    if (
      medida > 25 &&
      medida <= 50
    ) {
      return (
        INSTRUMENTOS
          .MICROMETRO_EXTERIORES_25_50
      );
    }

    if (
      medida > 50 &&
      medida <= 75
    ) {
      return (
        INSTRUMENTOS
          .MICROMETRO_EXTERIORES_50_75
      );
    }

    if (
      medida > 75 &&
      medida <= 150
    ) {
      return (
        INSTRUMENTOS
          .CALIBRADOR_0_150
      );
    }

    if (
      medida > 150 &&
      medida <= 300
    ) {
      return (
        INSTRUMENTOS
          .CALIBRADOR_0_300
      );
    }

    if (
      medida > 300
    ) {
      return (
        INSTRUMENTOS
          .FLEXOMETRO
      );
    }
  }


  if (
    parametro === "Longitud I"
  ) {

    if (
      medida >= 0 &&
      medida <= 150
    ) {
      return (
        INSTRUMENTOS
          .CALIBRADOR_0_150
      );
    }


    if (
      medida > 150 &&
      medida <= 300
    ) {
      return (
        INSTRUMENTOS
          .CALIBRADOR_0_300
      );
    }


    if (
      medida > 300
    ) {
      return (
        INSTRUMENTOS
          .FLEXOMETRO
      );
    }
  }


  if (
    parametro === "Diámetro"
  ) {

    if (
      medida >= 0 &&
      medida <= 12
    ) {
      return (
        INSTRUMENTOS
          .CALIBRADOR_0_150
      );
    }

    if (
      medida > 12 &&
      medida <= 16
    ) {
      return (
        INSTRUMENTOS
          .MICROMETRO_INTERIORES_13_16
      );
    }

    if (
      medida > 16 &&
      medida <= 150
    ) {
      return (
        INSTRUMENTOS
          .CALIBRADOR_0_150
      );
    }

    if (
      medida > 150 &&
      medida <= 300
    ) {
      return (
        INSTRUMENTOS
          .CALIBRADOR_0_300
      );
    }

    if (
      medida > 300
    ) {
      return (
        INSTRUMENTOS
          .FLEXOMETRO
      );
    }
  }


  if (
    parametro === "Peso"
  ) {
    return (
      INSTRUMENTOS.BASCULA
    );
  }



  if (
    parametro === "Ángulo"
  ) {
    return "";
  }


  return "";
}



export function obtenerUnidad(
  parametro
) {

  if (
    parametro === "Length E" ||
    parametro === "Longitud I" ||
    parametro === "Diámetro"
  ) {
    return "mm";
  }


  if (
    parametro === "Peso"
  ) {
    return "g";
  }


  if (
    parametro === "Ángulo"
  ) {
    return "°";
  }


  return "";
}


export function obtenerListadoInstrumentosExcel(
  mediciones
) {

  const instrumentos =
    [];


  mediciones.forEach(
    (medicion) => {

      const instrumento =
        medicion.instrumento;


      if (!instrumento) {
        return;
      }


      if (
        typeof instrumento === "string"
      ) {

        if (
          !instrumentos.includes(
            instrumento
          )
        ) {
          instrumentos.push(
            instrumento
          );
        }

        return;
      }


      const texto =
        `${obtenerNombreInstrumento(
          instrumento
        )}; ${instrumento.codigo}`;


      if (
        !instrumentos.includes(
          texto
        )
      ) {
        instrumentos.push(
          texto
        );
      }
    }
  );



  const bloquesPatron =
    `${obtenerNombreInstrumento(
      INSTRUMENTOS.BLOQUES_PATRON
    )}; ${
      INSTRUMENTOS.BLOQUES_PATRON.codigo
    }`;


  if (
    !instrumentos.includes(
      bloquesPatron
    )
  ) {
    instrumentos.push(
      bloquesPatron
    );
  }


  return instrumentos;
}
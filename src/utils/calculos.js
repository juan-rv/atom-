export function redondear2(valor) {
    return Math.round((Number(valor) + Number.EPSILON) * 100) / 100;
  }
  
  export function formatoNumero(valor) {
    if (
      valor === "" ||
      valor === null ||
      valor === undefined
    ) {
      return "";
    }
  
    const numero = Number(valor);
  
    if (Number.isNaN(numero)) {
      return "";
    }
  
    return numero.toFixed(2).replace(".", ",");
  }
  
 
  export function generarMedicionesAutomaticas(
    medidaOriginal
  ) {
    const original = Number(medidaOriginal);
  
    if (
      medidaOriginal === "" ||
      Number.isNaN(original)
    ) {
      return ["", "", "", "", ""];
    }
  
    const variaciones = [-0.01, 0, 0.01];
  
    return Array.from(
      { length: 5 },
      () => {
        const indice =
          Math.floor(
            Math.random() * variaciones.length
          );
  
        const variacion =
          variaciones[indice];
  
        return redondear2(
          original + variacion
        );
      }
    );
  }
  
  export function calcularMedia(
    mediciones
  ) {
    const valores = mediciones
      .map(Number)
      .filter(
        (valor) => !Number.isNaN(valor)
      );
  
    if (valores.length === 0) {
      return "";
    }
  
    const suma = valores.reduce(
      (total, valor) =>
        total + valor,
      0
    );
  
    return redondear2(
      suma / valores.length
    );
  }
  

  export function calcularDesviacion(
    media,
    medidaOriginal
  ) {
    const valorMedia = Number(media);
    const original = Number(
      medidaOriginal
    );
  
    if (
      Number.isNaN(valorMedia) ||
      Number.isNaN(original)
    ) {
      return "";
    }
  
    return redondear2(
      valorMedia - original
    );
  }
  
  export function calcularResultadosMedicion(
    medidaOriginal
  ) {
    const medicionesAutomaticas =
      generarMedicionesAutomaticas(
        medidaOriginal
      );
  
    const media =
      calcularMedia(
        medicionesAutomaticas
      );
  
    const desviacion =
      calcularDesviacion(
        media,
        medidaOriginal
      );
  
    return {
      medicionesAutomaticas,
      media,
      desviacion,
    };
  }
// =====================================================
// CÁLCULOS - FORMATO 3.1
// =====================================================
//
// UNIDADES:
// - Dimensiones: mm
// - Volumen: mm³
// - Densidad: g/cm³
// - Peso: gramos (g)
//
// =====================================================


// =====================================================
// CONVERSIÓN
// =====================================================
//
// 1 cm³ = 1000 mm³
//
// Para trabajar con densidad en g/cm³:
//
// volumen_mm3 / 1000 = volumen_cm3
//
// =====================================================

const MM3_A_CM3 = 1000;


// =====================================================
// VALIDAR NÚMERO
// =====================================================

function numeroValido(valor) {

  return (
    valor !== "" &&
    valor !== null &&
    valor !== undefined &&
    Number.isFinite(Number(valor)) &&
    Number(valor) > 0
  );

}


// =====================================================
// VOLUMEN DE PIEZA REDONDA
// =====================================================
//
// Fórmula:
//
// V = π × (D² / 4) × L
//
// D = diámetro en mm
// L = largo en mm
// =====================================================

export function calcularVolumenRedondo(
  diametro,
  largo
) {

  if (
    !numeroValido(diametro) ||
    !numeroValido(largo)
  ) {

    return null;

  }


  const D =
    Number(diametro);

  const L =
    Number(largo);


  return (
    Math.PI *
    (D ** 2 / 4) *
    L
  );

}


// =====================================================
// VOLUMEN DE PLACA
// =====================================================
//
// Fórmula:
//
// V = Largo × Ancho × Alto
//
// Todas las dimensiones en mm.
// =====================================================

export function calcularVolumenPlaca(
  largo,
  ancho,
  alto
) {

  if (
    !numeroValido(largo) ||
    !numeroValido(ancho) ||
    !numeroValido(alto)
  ) {

    return null;

  }


  return (
    Number(largo) *
    Number(ancho) *
    Number(alto)
  );

}


// =====================================================
// CONVERTIR MM³ → CM³
// =====================================================

export function convertirMm3ACm3(
  volumenMm3
) {

  if (
    volumenMm3 === null ||
    volumenMm3 === undefined ||
    !Number.isFinite(
      Number(volumenMm3)
    )
  ) {

    return null;

  }


  return (
    Number(volumenMm3) /
    MM3_A_CM3
  );

}


// =====================================================
// CALCULAR PESO
// =====================================================
//
// Fórmula:
//
// Peso (g) = Volumen (cm³) × Densidad (g/cm³)
// =====================================================

export function calcularPeso(
  volumenMm3,
  densidad
) {

  if (
    volumenMm3 === null ||
    !numeroValido(densidad)
  ) {

    return null;

  }


  const volumenCm3 =
    convertirMm3ACm3(
      volumenMm3
    );


  if (
    volumenCm3 === null
  ) {

    return null;

  }


  return (
    volumenCm3 *
    Number(densidad)
  );

}


// =====================================================
// CALCULAR PESO DE REDONDO
// =====================================================

export function calcularPesoRedondo(
  diametro,
  largo,
  densidad
) {

  const volumen =
    calcularVolumenRedondo(
      diametro,
      largo
    );


  if (
    volumen === null
  ) {

    return null;

  }


  return calcularPeso(
    volumen,
    densidad
  );

}


// =====================================================
// CALCULAR PESO DE PLACA
// =====================================================

export function calcularPesoPlaca(
  largo,
  ancho,
  alto,
  densidad
) {

  const volumen =
    calcularVolumenPlaca(
      largo,
      ancho,
      alto
    );


  if (
    volumen === null
  ) {

    return null;

  }


  return calcularPeso(
    volumen,
    densidad
  );

}


// =====================================================
// REDONDEAR PESO
// =====================================================
//
// El resultado se redondea a 2 decimales.
// =====================================================

export function redondearPeso(
  peso
) {

  if (
    peso === null ||
    peso === undefined ||
    !Number.isFinite(
      Number(peso)
    )
  ) {

    return null;

  }


  return Number(
    Number(peso).toFixed(2)
  );

}


// =====================================================
// CALCULAR PESO FINAL
// =====================================================
//
// Esta función será la que utilizaremos desde
// DescripcionProducto.jsx.
//
// formaSuministro:
// - "redondo"
// - "placa"
// =====================================================

export function calcularPesoNeto(
  formaSuministro,
  dimensiones,
  densidad
) {

  if (
    !formaSuministro ||
    !dimensiones ||
    !numeroValido(densidad)
  ) {

    return null;

  }


  let peso = null;


  // ---------------------------------------------------
  // REDONDO
  // ---------------------------------------------------

  if (
    formaSuministro === "redondo"
  ) {

    peso =
      calcularPesoRedondo(
        dimensiones.diametro,
        dimensiones.largo,
        densidad
      );

  }


  // ---------------------------------------------------
  // PLACA
  // ---------------------------------------------------

  if (
    formaSuministro === "placa"
  ) {

    peso =
      calcularPesoPlaca(
        dimensiones.largo,
        dimensiones.ancho,
        dimensiones.alto,
        densidad
      );

  }


  return redondearPeso(
    peso
  );

}


// =====================================================
// EXPORTACIÓN DE CONSTANTES
// =====================================================

export {
  MM3_A_CM3,
};
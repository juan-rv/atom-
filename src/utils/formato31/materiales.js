import { PROPIEDADES_MECANICAS } from "./propiedadesMecanicas";
export const MATERIALES = [

  // ===================================================
  // 1. AISI 4140
  // ===================================================

  {
    id: "aisi_4140",
    nombre: "AISI 4140 / SAE 4140",
    densidad: 7.85,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 0.3534, maximo: 0.4601 },
      { elemento: "Mn", minimo: 0.6975, maximo: 1.0700 },
      { elemento: "Si", minimo: 0.1395, maximo: 0.3745 },
      { elemento: "Cr", minimo: 0.7440, maximo: 1.1770 },
      { elemento: "Mo", minimo: 0.1395, maximo: 0.2675 },
      { elemento: "P", minimo: 0, maximo: 0.03745 },
      { elemento: "S", minimo: 0, maximo: 0.04280 },
    ],
  },


  // ===================================================
  // 2. AISI 1020
  // ===================================================

  {
    id: "aisi_1020",
    nombre: "AISI 1020 / SAE 1020",
    densidad: 7.85,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 0.1581, maximo: 0.2461 },
      { elemento: "Mn", minimo: 0.2790, maximo: 0.6420 },
      { elemento: "Si", minimo: 0, maximo: 0.4280 },
      { elemento: "P", minimo: 0, maximo: 0.0428 },
      { elemento: "S", minimo: 0, maximo: 0.0535 },
    ],
  },


  // ===================================================
  // 3. AISI 1045
  // ===================================================

  {
    id: "aisi_1045",
    nombre: "AISI 1045 / SAE 1045",
    densidad: 7.85,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 0.3906, maximo: 0.5350 },
      { elemento: "Mn", minimo: 0.5580, maximo: 0.9630 },
      { elemento: "Si", minimo: 0, maximo: 0.4280 },
      { elemento: "P", minimo: 0, maximo: 0.0428 },
      { elemento: "S", minimo: 0, maximo: 0.0535 },
    ],
  },


  // ===================================================
  // 4. ALUMINIO 7075-T6
  // ===================================================

  {
    id: "aluminio_7075_t6",
    nombre: "Aluminio 7075-T6",
    densidad: 2.81,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "Zn", minimo: 4.7430, maximo: 6.5270 },
      { elemento: "Mg", minimo: 1.9530, maximo: 3.1030 },
      { elemento: "Cu", minimo: 1.1160, maximo: 2.1400 },
      { elemento: "Cr", minimo: 0, maximo: 0.2461 },
      { elemento: "Si", minimo: 0, maximo: 0.4280 },
      { elemento: "Fe", minimo: 0, maximo: 0.5350 },
      { elemento: "Mn", minimo: 0, maximo: 0.3210 },
      { elemento: "Ti", minimo: 0, maximo: 0.2140 },
    ],
  },


  // ===================================================
  // 5. ALUMINIO 7050-T6
  // ===================================================

  {
    id: "aluminio_7050_t6",
    nombre: "Aluminio 7050-T6",
    densidad: 2.83,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "Zn", minimo: 5.3010, maximo: 7.1690 },
      { elemento: "Mg", minimo: 1.7670, maximo: 2.7820 },
      { elemento: "Cu", minimo: 1.8600, maximo: 2.7820 },
      { elemento: "Zr", minimo: 0.0744, maximo: 0.1605 },
      { elemento: "Si", minimo: 0, maximo: 0.1284 },
      { elemento: "Fe", minimo: 0, maximo: 0.1605 },
      { elemento: "Mn", minimo: 0, maximo: 0.1070 },
      { elemento: "Ti", minimo: 0, maximo: 0.0642 },
    ],
  },


  // ===================================================
  // 6. ALUMINIO 2024-T6
  // ===================================================

  {
    id: "aluminio_2024_t6",
    nombre: "Aluminio 2024-T6",
    densidad: 2.78,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "Cu", minimo: 3.5340, maximo: 5.2430 },
      { elemento: "Mg", minimo: 1.1160, maximo: 1.9260 },
      { elemento: "Mn", minimo: 0.2790, maximo: 0.9630 },
      { elemento: "Si", minimo: 0, maximo: 0.5350 },
      { elemento: "Fe", minimo: 0, maximo: 0.5350 },
      { elemento: "Cr", minimo: 0, maximo: 0.1070 },
      { elemento: "Ti", minimo: 0, maximo: 0.1605 },
      { elemento: "Zn", minimo: 0, maximo: 0.2675 },
    ],
  },


  // ===================================================
  // 7. ALUMINIO 6061-T6
  // ===================================================

  {
    id: "aluminio_6061_t6",
    nombre: "Aluminio 6061-T6",
    densidad: 2.70,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "Mg", minimo: 0.7440, maximo: 1.2840 },
      { elemento: "Si", minimo: 0.3720, maximo: 0.8560 },
      { elemento: "Cu", minimo: 0.1395, maximo: 0.4280 },
      { elemento: "Cr", minimo: 0.0372, maximo: 0.3745 },
      { elemento: "Fe", minimo: 0, maximo: 0.7490 },
      { elemento: "Mn", minimo: 0, maximo: 0.1605 },
      { elemento: "Ti", minimo: 0, maximo: 0.1605 },
      { elemento: "Zn", minimo: 0, maximo: 0.2675 },
    ],
  },


  // ===================================================
  // 8. AISI 304
  // ===================================================

  {
    id: "aisi_304",
    nombre: "AISI 304",
    densidad: 8.00,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 0, maximo: 0.0856 },
      { elemento: "Cr", minimo: 16.7400, maximo: 21.4000 },
      { elemento: "Ni", minimo: 7.4400, maximo: 11.2350 },
      { elemento: "Mn", minimo: 0, maximo: 2.1400 },
      { elemento: "Si", minimo: 0, maximo: 1.0700 },
      { elemento: "P", minimo: 0, maximo: 0.04815 },
      { elemento: "S", minimo: 0, maximo: 0.03210 },
    ],
  },


  // ===================================================
  // 9. AISI 316
  // ===================================================

  {
    id: "aisi_316",
    nombre: "AISI 316",
    densidad: 8.00,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 0, maximo: 0.0856 },
      { elemento: "Cr", minimo: 14.8800, maximo: 19.2600 },
      { elemento: "Ni", minimo: 9.3000, maximo: 14.9800 },
      { elemento: "Mo", minimo: 1.8600, maximo: 3.2100 },
      { elemento: "Mn", minimo: 0, maximo: 2.1400 },
      { elemento: "Si", minimo: 0, maximo: 1.0700 },
      { elemento: "P", minimo: 0, maximo: 0.04815 },
      { elemento: "S", minimo: 0, maximo: 0.03210 },
    ],
  },


  // ===================================================
  // 10. DF2 / AISI O1
  // ===================================================

  {
    id: "df2_aisi_o1",
    nombre: "DF2 / AISI O1",
    densidad: 7.81,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 0.7905, maximo: 1.0700 },
      { elemento: "Mn", minimo: 0.9300, maximo: 1.4980 },
      { elemento: "Si", minimo: 0, maximo: 0.5350 },
      { elemento: "Cr", minimo: 0.3720, maximo: 0.6420 },
      { elemento: "W", minimo: 0.3720, maximo: 0.6420 },
      { elemento: "V", minimo: 0, maximo: 0.3210 },
      { elemento: "P", minimo: 0, maximo: 0.0321 },
      { elemento: "S", minimo: 0, maximo: 0.0321 },
    ],
  },


  // ===================================================
  // 11. XW10 / AISI A2
  // ===================================================

  {
    id: "xw10_aisi_a2",
    nombre: "XW10 / AISI A2",
    densidad: 7.70,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 0.8835, maximo: 1.1235 },
      { elemento: "Cr", minimo: 4.4640, maximo: 5.8850 },
      { elemento: "Mo", minimo: 0.8370, maximo: 1.2840 },
      { elemento: "V", minimo: 0.1395, maximo: 0.3745 },
      { elemento: "Mn", minimo: 0, maximo: 0.6420 },
      { elemento: "Si", minimo: 0, maximo: 0.4280 },
      { elemento: "P", minimo: 0, maximo: 0.0321 },
      { elemento: "S", minimo: 0, maximo: 0.0321 },
    ],
  },


  // ===================================================
  // 12. XW41 / AISI D2
  // ===================================================

  {
    id: "xw41_aisi_d2",
    nombre: "XW41 / AISI D2",
    densidad: 7.70,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 1.3020, maximo: 1.7120 },
      { elemento: "Cr", minimo: 10.2300, maximo: 13.9100 },
      { elemento: "Mo", minimo: 0.6510, maximo: 1.2840 },
      { elemento: "V", minimo: 0.6510, maximo: 1.0700 },
      { elemento: "Mn", minimo: 0, maximo: 0.6420 },
      { elemento: "Si", minimo: 0, maximo: 0.6420 },
      { elemento: "P", minimo: 0, maximo: 0.0321 },
      { elemento: "S", minimo: 0, maximo: 0.0321 },
    ],
  },


  // ===================================================
  // 13. BRONCE SAE 660 / C93200
  // ===================================================

  {
    id: "bronce_sae_660",
    nombre: "Bronce SAE 660 / C93200",
    densidad: 8.91,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "Cu", minimo: 75.3300, maximo: 90.9500 },
      { elemento: "Sn", minimo: 5.8590, maximo: 8.0250 },
      { elemento: "Pb", minimo: 5.5800, maximo: 8.5600 },
      { elemento: "Zn", minimo: 1.8600, maximo: 4.2800 },
      { elemento: "Fe", minimo: 0, maximo: 0.2140 },
      { elemento: "Ni", minimo: 0, maximo: 0.5350 },
      { elemento: "P", minimo: 0, maximo: 0.1605 },
      { elemento: "S", minimo: 0, maximo: 0.0856 },
      { elemento: "Sb", minimo: 0, maximo: 0.3745 },
      { elemento: "Si", minimo: 0, maximo: 0.00321 },
    ],
  },


  // ===================================================
  // 14. NYLON 6/10
  // ===================================================

  {
    id: "nylon_610",
    nombre: "Nylon 6/10",
    densidad: 1.08,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 63.281757, maximo: 72.808043 },
      { elemento: "H", minimo: 9.957606, maximo: 11.455634 },
      { elemento: "N", minimo: 9.224577, maximo: 10.613193 },
      { elemento: "O", minimo: 10.536900, maximo: 12.123100 },
    ],
  },


  // ===================================================
  // 15. BAQUELITA
  // ===================================================

  {
    id: "baquelita",
    nombre: "Baquelita",
    densidad: 1.40,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 73.6560, maximo: 84.8510 },
      { elemento: "H", minimo: 5.2545, maximo: 6.1525 },
      { elemento: "O", minimo: 13.9035, maximo: 16.2105 },
    ],
  },


  // ===================================================
  // 16. POLIURETANO
  // ===================================================

  {
    id: "poliuretano",
    nombre: "Poliuretano",
    densidad: 1.20,
    unidadDensidad: "g/cm³",

    composicionQuimica: [
      { elemento: "C", minimo: 57.7809, maximo: 66.4581 },
      { elemento: "H", minimo: 4.70115, maximo: 5.40885 },
      { elemento: "N", minimo: 5.3754, maximo: 6.1746 },
      { elemento: "O", minimo: 25.08117, maximo: 28.85683 },
    ],
  },

];

// Agregar automáticamente las propiedades mecánicas
// a cada material según su ID.
MATERIALES.forEach((material) => {
  const propiedades = PROPIEDADES_MECANICAS[material.id];

  if (propiedades) {
    material.propiedadesMecanicas = propiedades;
  }
});
// =====================================================
// OBTENER MATERIAL POR ID
// =====================================================

export function obtenerMaterial(
  materialId
) {

  return MATERIALES.find(
    (material) =>
      material.id === materialId
  );

}


// =====================================================
// OBTENER TODOS LOS MATERIALES
// =====================================================

export function obtenerMateriales() {

  return MATERIALES;

}
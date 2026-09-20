// =====================================================
// PROPIEDADES MECÁNICAS DE REFERENCIA
// =====================================================
//
// IMPORTANTE:
// Estos valores son referencias técnicas y no sustituyen
// el certificado de material ni la especificación del lote.
//
// Para aceros de herramientas se utilizan referencias en
// condición recocida cuando se indica expresamente.
//
// Para polímeros se conservan propiedades propias del
// material; no se convierte Shore D a HB de forma artificial.
//
// =====================================================

export const PROPIEDADES_MECANICAS = {

  // ===================================================
  // AISI 4140
  // Referencia: condición normalizada
  // ===================================================

  aisi_4140: {
    traccion: {
      minimo: 1020,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 655,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 17.7,
      unidad: "%",
    },

    durezaHB: {
      minimo: 302,
      unidad: "HB",
    },
  },


  // ===================================================
  // AISI 1020
  // Referencia: condición recocida
  // ===================================================

  aisi_1020: {
    traccion: {
      minimo: 395,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 295,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 36.5,
      unidad: "%",
    },

    durezaHB: {
      minimo: 111,
      unidad: "HB",
    },
  },


  // ===================================================
  // AISI 1045
  // Referencia: cold drawn
  // ===================================================

  aisi_1045: {
    traccion: {
      minimo: 515,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 485,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 10,
      unidad: "%",
    },

    durezaHB: {
      minimo: 170,
      unidad: "HB",
    },
  },


  // ===================================================
  // AISI 304
  // Referencia: condición recocida
  // ===================================================

  aisi_304: {
    traccion: {
      minimo: 515,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 205,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 40,
      unidad: "%",
    },

    durezaHB: {
      minimo: 201,
      unidad: "HB",
    },
  },


  // ===================================================
  // AISI 316
  // Referencia: condición recocida
  // ===================================================

  aisi_316: {
    traccion: {
      minimo: 515,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 205,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 60,
      unidad: "%",
    },

    durezaHB: {
      minimo: 149,
      unidad: "HB",
    },
  },


  // ===================================================
  // ALUMINIO 7075-T6
  // ===================================================

  aluminio_7075_t6: {
    traccion: {
      minimo: 572,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 503,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 11,
      unidad: "%",
    },

    durezaHB: {
      minimo: 150,
      unidad: "HB",
    },
  },


  // ===================================================
  // ALUMINIO 7050
  // Referencia: 7050-T7451
  // ===================================================

  aluminio_7050_t6: {
    traccion: {
      minimo: 524,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 469,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 11,
      unidad: "%",
    },

    durezaHB: {
      minimo: 140,
      unidad: "HB",
    },
  },


  // ===================================================
  // ALUMINIO 2024-T6
  // ===================================================

  aluminio_2024_t6: {
    traccion: {
      minimo: 427,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 345,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 5,
      unidad: "%",
    },

    durezaHB: {
      minimo: 125,
      unidad: "HB",
    },
  },


  // ===================================================
  // ALUMINIO 6061-T6
  // ===================================================

  aluminio_6061_t6: {
    traccion: {
      minimo: 310,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 276,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 12,
      unidad: "%",
    },

    durezaHB: {
      minimo: 95,
      unidad: "HB",
    },
  },


  // ===================================================
  // O1 / DF2
  // Referencia: O1 recocido
  // ===================================================

  df2_aisi_o1: {
    traccion: {
      minimo: 640,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 400,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 20,
      unidad: "%",
    },

    durezaHB: {
      minimo: 190,
      unidad: "HB",
    },
  },


  // ===================================================
  // A2 / XW10
  // Referencia: A2 recocido
  // ===================================================

  xw10_aisi_a2: {
    traccion: {
      minimo: 710,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 350,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 21,
      unidad: "%",
    },

    durezaHB: {
      minimo: 210,
      unidad: "HB",
    },
  },


  // ===================================================
  // D2 / XW41
  // Referencia: D2 recocido
  // ===================================================

  xw41_aisi_d2: {
    traccion: {
      minimo: 760,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 470,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 16,
      unidad: "%",
    },

    durezaHB: {
      minimo: 230,
      unidad: "HB",
    },
  },


  // ===================================================
  // BRONCE SAE 660 / C93200
  // ===================================================

  bronce_sae_660: {
    traccion: {
      minimo: 240,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 125,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 20,
      unidad: "%",
    },

    durezaHB: {
      minimo: 65,
      unidad: "HB",
    },
  },


  // ===================================================
  // NYLON 6/10
  // ===================================================
  //
  // NO se asigna durezaHB porque las referencias para
  // Nylon 610 se expresan normalmente en Shore D,
  // Rockwell u otras escalas.
  //
  // ===================================================

  nylon_610: {
    traccion: {
      minimo: 127,
      unidad: "MPa",
    },

    fluencia: {
      minimo: 82.8,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 28.1,
      unidad: "%",
    },
  },


  // ===================================================
  // BAQUELITA
  // ===================================================
  //
  // Referencia de un compuesto fenólico específico.
  // La baquelita no tiene una única formulación universal.
  //
  // ===================================================

  baquelita: {
    traccion: {
      minimo: 90,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 1.5,
      unidad: "%",
    },
  },


  // ===================================================
  // POLIURETANO
  // ===================================================
  //
  // Referencia TPU.
  // Los valores dependen fuertemente del grado.
  //
  // ===================================================

  poliuretano: {
    traccion: {
      minimo: 38.6,
      unidad: "MPa",
    },

    elongacion: {
      minimo: 590,
      unidad: "%",
    },
  },

};
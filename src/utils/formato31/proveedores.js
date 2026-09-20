// =====================================================
// CATÁLOGO DE PROVEEDORES - FORMATO 3.1
// =====================================================

export const PROVEEDORES = [
  {
    id: "acefer",
    nombre: "ACEFER Y CIA SAS",
    nit: "860511559",
  },

  {
    id: "axxecol",
    nombre: "AXXECOL",
    nit: "860528410",
  },

  {
    id: "plasticosHerramientas",
    nombre: "PLASTICOS Y HERRAMIENTAS (METAL-PLAST)",
    nit: "900703308",
  },

  {
    id: "hierrosMetalesFuturo",
    nombre: "HIERROS Y METALES DEL FUTURO",
    nit: "901705651",
  },

  {
    id: "lasAmericasHierrosAceros",
    nombre: "LAS AMERICAS HIERROS Y ACEROS",
    nit: "901700256",
  },

  {
    id: "laminasCortesBogota",
    nombre: "LAMINAS Y CORTES BOGOTA",
    nit: "800162648",
  },

  {
    id: "suminox",
    nombre: "SUMINOX DE ACERO SAS",
    nit: "900421677",
  },

  {
    id: "suimtec",
    nombre: "SUIMTEC",
    nit: "900729924",
  },

  {
    id: "universalCauchosHurtado",
    nombre: "UNIVERSAL DE CAUCHOS HURTADO SA",
    nit: "830085540",
  },
];

// =====================================================
// OBTENER PROVEEDOR POR ID
// =====================================================

export function obtenerProveedor(id) {
  return (
    PROVEEDORES.find(
      (proveedor) => proveedor.id === id
    ) || null
  );
}

// =====================================================
// OBTENER TEXTO PARA EL EXCEL
// =====================================================
//
// Formato requerido:
//
// NOMBRE PROVEEDOR ; NIT: XXXXX
//
// Ejemplo:
//
// SUMINOX DE ACERO SAS ; NIT: 900421677
// =====================================================

export function obtenerProveedorFormatoExcel(id) {
  const proveedor = obtenerProveedor(id);

  if (!proveedor) {
    return "";
  }

  return `${proveedor.nombre} ; NIT: ${proveedor.nit}`;
}
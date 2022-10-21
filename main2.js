/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
const divisasDB = [
  {
    nombre: "dolar",
    symbol: "usd",
    tipoCambio: {
      clp: 938,
      eur: 1.04,
      gbp: 0.9,
      ars: 149.19,
      cny: 7.12,
      usd: 1,
    },
  },
  {
    nombre: "euro",
    symbol: "eur",
    tipoCambio: {
      clp: 914,
      usd: 1.03,
      gbp: 0.88,
      ars: 145.39,
      cny: 6.93,
      eur: 1,
    },
  },
  {
    nombre: "peso chileno",
    symbol: "clp",
    tipoCambio: {
      eur: 0.0011,
      usd: 0.0011,
      gbp: 0.0011,
      ars: 0.16,
      cny: 0.0076,
      clp: 1,
    },
  },
  {
    nombre: "peso argentino",
    symbol: "ars",
    tipoCambio: {
      clp: 6.29,
      usd: 0.0067,
      gbp: 0.01,
      eur: 0.0069,
      cny: 0.05,
      ars: 1,
    },
  },
  {
    nombre: "libra esterlina",
    symbol: "gbp",
    tipoCambio: {
      clp: 1040,
      usd: 1.11,
      eur: 1.14,
      ars: 165.4,
      cny: 7.89,
      gbp: 1,
    },
  },
  {
    nombre: "yuan",
    symbol: "cny",
    tipoCambio: {
      clp: 131.86,
      usd: 0.14,
      gbp: 0.13,
      ars: 20.97,
      eur: 0.14,
      yuan: 1,
    },
  },
];

const containerFrom = document.getElementById("selectFrom");
const divisaSymbol = divisasDB.map((x) => `<option>${x.symbol.toUpperCase()}</option>`);
containerFrom.innerHTML = ["<option disabled selected>Select an option</option>", ...divisaSymbol];

const containerTo = document.getElementById("selectTo");
containerTo.innerHTML = ["<option disabled selected>Select an option</option>", ...divisaSymbol];

const solicitarDatos = () => {
  const opciones = [];
  const divisa1 = prompt("Escriba la divisa origen:").toLowerCase();
  const divisa2 = prompt("Escriba la divisa destino:").toLowerCase();
  const cantidad = parseFloat(prompt("Ingrese cantidad:"));
  opciones.push(divisa1);
  opciones.push(divisa2);
  opciones.push(cantidad);

  return opciones; // [divisa1, divisa2, cantidad]
};

const convert = (datosConvert) => {
  const nombreDivisa = divisasDB.find((x) => x.nombre == datosConvert[0])
    || divisasDB.find((e) => e.symbol == datosConvert[0]);
  if (nombreDivisa) {
    for (const key in nombreDivisa.tipoCambio) {
      if (key == datosConvert[1]) {
        const totalConvert = nombreDivisa.tipoCambio[key] * datosConvert[2];
        alert(`la cantidad de ${datosConvert[0]} es igual a ${totalConvert.toLocaleString("es-CL")}`);
      }
    }
  }
};

let repetir = false;
do {
  const datosConvert = solicitarDatos();
  convert(datosConvert);
  const respuesta = prompt("Desea realizar otra conversion?\n1 - Si\n2 - No");
  if (respuesta === "1") {
    repetir = true;
  } else {
    repetir = false;
  }
} while (repetir);

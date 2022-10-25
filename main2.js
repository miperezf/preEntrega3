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
const option = document.getElementsByClassName("option");
const amount = document.querySelector("#amount");
amount.value = "";
const buttonConvert = document.querySelector("#button_amount");

const containerTo = document.getElementById("selectTo");
containerTo.innerHTML = ["<option disabled selected>Select an option</option>", ...divisaSymbol];

const valorSelect = {};

const saveLocalStorage = () => {
  const valorSelectJson = JSON.stringify(valorSelect);
  localStorage.setItem("valorSelect", valorSelectJson);
};

const convert = (e) => {
  const nombreDivisa = divisasDB.find((x) => x.symbol == valorSelect.from.toLowerCase());
  if (nombreDivisa) {
    for (const key in nombreDivisa.tipoCambio) {
      if (key == valorSelect.to.toLowerCase()) {
        const totalConvert = nombreDivisa.tipoCambio[key] * parseInt(valorSelect.cantidad, 10);
        saveLocalStorage();
        alert(`la cantidad de ${valorSelect.from} es igual a ${totalConvert.toLocaleString("es-CL")} ${valorSelect.to}`);
      }
    }
  }
};

containerFrom.addEventListener("change", () => {
  const valorOptionFrom = containerFrom.value;
  valorSelect.from = valorOptionFrom;
});

containerTo.addEventListener("change", () => {
  const valorOptionTo = containerTo.value;
  valorSelect.to = valorOptionTo;
});

amount.addEventListener("keyup", () => {
  valorSelect.cantidad = amount.value;
});

buttonConvert.addEventListener("click", (e) => {
  convert(e);
});

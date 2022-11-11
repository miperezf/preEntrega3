/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */

const containerFrom = document.getElementById("selectFrom");
const option = document.getElementsByClassName("option");
const amountField = document.querySelector("#amount");
amountField.value = "";
const buttonConvert = document.querySelector("#button_amount");
const resultContainer = document.querySelector(".result_container");
const containerTo = document.getElementById("selectTo");

const valorSelect = {};
const symbolsArray = [];

const saveLocalStorage = () => {
  const valorSelectJson = JSON.stringify(valorSelect);
  localStorage.setItem("valorSelect", valorSelectJson);
};
SlickLoader.enable();
const getSymbol = async () => {
  const myHeaders = new Headers();
  myHeaders.append("apikey", "0d7f6RMH0xgyOIt8vMnKw61EmtwREKvu");

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };
  try {
    const response = await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions);
    const result = await response.json();
    const data = result.symbols;
    return data;
  } catch (error) {
    return error;
  }
};
SlickLoader.disable();
const funcionSymbol = async () => {
  const resultSymbols = await getSymbol();
  const divisaSymbol = [];
  // eslint-disable-next-line guard-for-in
  for (const key in resultSymbols) {
    divisaSymbol.push(`<option>${key}</option>`);
  }
  containerFrom.innerHTML = ["<option disabled selected>Select an option</option>", ...divisaSymbol];
  containerTo.innerHTML = ["<option disabled selected>Select an option</option>", ...divisaSymbol];
};
funcionSymbol();

const getData = async (to, from, amount) => {
  const myHeaders = new Headers();
  myHeaders.append("apikey", "0d7f6RMH0xgyOIt8vMnKw61EmtwREKvu");

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };
  try {
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions);
    const result = await response.json();
    const data = result.result;
    return data;
  } catch (error) {
    return error;
  }
};

const ejecutar = async () => {
  const result = await getData(valorSelect.to, valorSelect.from, valorSelect.cantidad);
  resultContainer.innerHTML = `${amountField.value} ${valorSelect.from} es igual a ${result.toLocaleString("de-DE")} ${valorSelect.to}`;
};

containerFrom.addEventListener("change", () => {
  const valorOptionFrom = containerFrom.value;
  valorSelect.from = valorOptionFrom;
});

containerTo.addEventListener("change", () => {
  const valorOptionTo = containerTo.value;
  valorSelect.to = valorOptionTo;
});

amountField.addEventListener("keyup", () => {
  valorSelect.cantidad = amountField.value;
});

buttonConvert.addEventListener("click", (e) => {
  ejecutar();
});

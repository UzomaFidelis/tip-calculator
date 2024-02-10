// get HTML elements
const billInput = document.getElementById("bill");
const customTip = document.getElementById("custom");
const numOfPersonsInput = document.getElementById("num-of-persons");
const radioInputs = document.querySelectorAll(".tip-set__radio");
const resetBtn = document.querySelector(".reset");
const tipPerPerson = document.getElementById("tip-per-person");
const totalPerPerson = document.getElementById("total-per-person");

// radios array from node list
const radiosArray = [...radioInputs];

// feedback elements
const billInputFeedback = document.querySelector(".bill__feedback");
const numOfPersonsInputFeedback = document.querySelector(
  ".num-of-persons__feedback"
);

// Functions
const uncheckRadios = () => {
  [...radioInputs].forEach((radio) => {
    radio.checked = false;
  });
};

const tipChosen = () => {
  return radiosArray.some((radio) => radio.checked) || customTip.value;
};

const validateInput = (elem, formInputFeedback) => {
  if (elem.target.value && elem.target.value == 0) {
    formInputFeedback.style.display = "block";
    formInputFeedback.setAttribute('aria-hidden', 'false');
    elem.target.style.border = "2px solid hsl(0, 100%, 70%)";
  } else {
    formInputFeedback.style.display = "none";
    formInputFeedback.setAttribute('aria-hidden', 'true')
    elem.target.style.border = "none";
  }
};

const readyToCalculate = () => {
  if (
    billInput.value &&
    billInput.checkValidity() &&
    numOfPersonsInput.value &&
    numOfPersonsInput.checkValidity() &&
    numOfPersonsInput.value != 0 &&
    customTip.checkValidity() &&
    tipChosen()
  ) {
    return true;
  } else {
    return false;
  }
};

const calculate = () => {
  if (readyToCalculate()) {
    // enable reset button
    resetBtn.disabled = false;

    // calculate logic here
    const checkedRadio = radiosArray.find((radio) => radio.checked);
    const tipPercent =
      (checkedRadio ? Number(checkedRadio.value) : Number(customTip.value)) /
      100;
    const bill = Number(billInput.value);
    const persons = Number(numOfPersonsInput.value);

    tipPerPerson.textContent = `$${((bill * tipPercent) / persons).toFixed(2)}`;
    totalPerPerson.textContent = `$${(
      (bill + bill * tipPercent) /
      persons
    ).toFixed(2)}`;
  }
};

const reset = () => {
  billInput.value = "";
  radioInputs.forEach((radio) => {
    radio.checked = false;
  });
  numOfPersonsInput.value = "";
  customTip.value = "";
  tipPerPerson.textContent = "$0.00";
  totalPerPerson.textContent = "$0.00";
};

// Add event listeners
billInput.addEventListener("input", (e) => {
  if (e.target.reportValidity()) {
    calculate();
  }
});

numOfPersonsInput.addEventListener("input", (e) => {
  validateInput(e, numOfPersonsInputFeedback);
  if (e.target.reportValidity()) {
    calculate();
  }
});

customTip.addEventListener("focus", () => {
  uncheckRadios();
});

customTip.addEventListener("input", (e) => {
  if (e.target.reportValidity()) {
    calculate();
  }
});

radiosArray.forEach((radio) => {
  radio.addEventListener("click", calculate);
});

resetBtn.addEventListener("click", reset);

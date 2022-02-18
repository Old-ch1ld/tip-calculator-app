'use strict';

const bill = document.querySelector('#element-box__input--bill');
const numPeople = document.querySelector('#element-box__input--people');
const customTipPercent = document.querySelector('[contenteditable]');
const errorNumPeople = document.querySelector('.element-box__error');
const showingTip = document.querySelector('.money-box__money-amount--tip');
const showingTotal = document.querySelector('.money-box__money-amount--total');
let currentTipPercent;

function calculateTipAndTotal(tipPercent) {
  currentTipPercent = +tipPercent;
  let totalTip = currentTipPercent * +bill.value;

  if (!tipPercent) {
    currentTipPercent = +customTipPercent.textContent / 100;
    totalTip = +bill.value * currentTipPercent;
  }
  if (!checkError(numPeople)) return;
  showingTipAndTotal(totalTip, numPeople.value, bill.value);
}

function reCalculateTipAndTotal() {
  calculateTipAndTotal(currentTipPercent);
}

function showingTipAndTotal(totalTip, numPeople, billVal) {
  const tipPerPerson = (totalTip / +numPeople).toFixed(2);
  const totalPerPerson = ((+billVal / +numPeople) + +tipPerPerson).toFixed(2);

  showingTip.textContent = `$${tipPerPerson}`;
  showingTotal.textContent = `$${totalPerPerson}`;
}

function checkError(numPeople) {
  if (!numPeople.value || +numPeople.value === 0) {
    numPeople.style.borderColor = 'red';
    errorNumPeople.textContent = `Can't be zero`;
    return false;
  }
  numPeople.style.borderColor = 'hsl(189, 41%, 97%)';
  errorNumPeople.textContent = ``;
  return true;
}

function reset() {
  bill.value = null;
  numPeople.value = null;
  customTipPercent.textContent = 'Custom';
  showingTip.textContent = '0.00';
  showingTotal.textContent = '0.00';
}
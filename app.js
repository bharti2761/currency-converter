const countryList = {
  AED: "AE",
  AFN: "AF",
  ALL: "AL",
  AMD: "AM",
  ANG: "CW", // Updated to Curacao
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  BTN: "BT",
  BWP: "BW",
  BYN: "BY", // Updated obsolete BYR to BYN
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  EGP: "EG",
  ERN: "ER",
  ETB: "ET",
  EUR: "EU", // Changed FR to EU for general Eurozone flags
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRU: "MR", // Updated obsolete MRO to MRU
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  SSP: "SS",
  STN: "ST", // Updated obsolete STD to STN
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VES: "VE", // Updated obsolete VEF to VES
  VND: "VN",
  VUV: "VU",
  WST: "WS",
  XAF: "CM",
  XCD: "AG",
  XOF: "SN",
  XPF: "NC",
  YER: "YE",
  ZAR: "ZA",
  ZMW: "ZM", // Updated obsolete ZMK to ZMW
  ZWL: "ZW"  // Updated obsolete ZWD to ZWL
};

// flag= 'https://flagsapi.com/US/flat/64.png'
let msg = document.querySelector('.msg')
let btn =  document.querySelector('#btn')
let selects = document.querySelectorAll('select')
let amount = document.querySelector('#amount')
let fromCountry = document.querySelector('.from select')
let f = 'USD'
let t = 'INR'

for(let select of selects){
  for(currency in countryList){
    let newOption = document.createElement('option')
    newOption.innerText = `${currency}`
    newOption.value = `${currency}`
    select.append(newOption)
      if(select.name == 'from' && newOption.innerText === "USD"){
        newOption.setAttribute('selected','')
      }
      if(select.name == 'to' && newOption.innerText === "INR"){
        newOption.setAttribute('selected','')
      }
    
}
select.addEventListener('change',function(e){
      e.target.name == 'from'
        ? f = e.target.value
        : t = e.target.value
      
      let parent = e.target.parentNode
      let img = parent.querySelector('img')
      img.src= `https://flagsapi.com/${countryList[e.target.value]}/flat/64.png`
    })
}
function calculateExhangeRate(from,to,amount){
  let totamt = ((to/from) * amount).toFixed(2)
  msg.innerHTML =`${amount} ${f} = ${totamt} ${t}`

}
function getexchangeRate(amount){
  let url = 'https://v6.exchangerate-api.com/v6/700f5bb2adbd27b245c57c14/latest/USD';
  let promise = fetch(url)
  promise
  .then((response)=>{
    let data = response.json()
    return data
  })
  .then((data)=>{
    let from = data.conversion_rates[f]
    let to = data.conversion_rates[t]
    calculateExhangeRate(from,to,amount)
  })
  .catch((error)=>{
    console.log('error')
  })
}
function getAmt(){
  amt = amount.value
  if(amt == "" || amt < 1 || isNaN(amt)){
    amt = 1;
    amount.value = '1'
  }
  getexchangeRate(amt)
}
btn.addEventListener('click',(e)=>{
  e.preventDefault();
  getAmt();
})
window.addEventListener('load',()=>{
  getAmt()
})

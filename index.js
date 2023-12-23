const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const message = document.querySelector(".msg")
// const img = document.querySelector("img");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;        
        newOption.value = currCode;        
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag =(element)=>{
    console.log(element)
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
    console.log(newsrc)
}

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        alert("Please Enter Valid Amount")
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    

    let final = amtVal * rate;
    message.innerText = `${amtVal} ${fromCurr.value} = ${final} ${toCurr.value}`
})
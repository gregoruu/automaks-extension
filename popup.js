document.getElementById("submitBtn").addEventListener("click", maksud);



function maksud(){
    let nrmark=document.getElementById("nrmark").value.trim();
    if (nrmark===""){
        return;
    }
    fetchRegMaks(nrmark);
    fetchAastaMaks(nrmark);   
}
function fetchRegMaks(nrmark){
    let regmaksApi=`https://apimsm.transpordiamet.ee/msm/regTasu/${nrmark}`;
    fetch(regmaksApi)
        .then(response=>{
            if (response.ok === false) {
                return;
            }
            return response.json();
        })
        .then(data=>{
            console.log(data);
            let totalPrice=`${data.totalPrice} €`;
            let co2Price=`${data.co2Price} €`;
            let massPrice=`${data.massPrice} €`;
            let basePrice=`${data.basePrice} €`;
            let ageCoef=data.ageCoef;


            let result=`
                <p><strong>Registreerimistasu:</strong> ${totalPrice}</p>
                <p><strong>CO₂-heitmete tasu:</strong> ${co2Price}</p>
                <p><strong>Massi põhine tasu:</strong> ${massPrice}</p>
                <p><strong>Baastasu:</strong> ${basePrice}</p>
                <p><strong>Vanuse koefitsient:</strong> ${ageCoef}</p>
            `;
            displayResult("regContainer",result);
        })
}
function fetchAastaMaks(nrmark){
    let aastamaksApi=`https://avalik.emta.ee/msm-public/v1/vehicle-tax/calculate-by-reg-nr?regNr=${nrmark}&showRegFee=false`;
    fetch(aastamaksApi)
        .then(response=>{
            if (response.ok === false) {
                return;
            }
            return response.json();
        })               
            let totalPrice = `${data.yearlyFee.totalPrice} €`;
            let co2Price = `${data.yearlyFee.co2Price} €`;
            let massPrice = `${data.yearlyFee.massPrice} €`;
            let basePrice = `${data.yearlyFee.basePrice} €`;
        
            let result = `
                <p><strong>Kogusumma:</strong> ${totalPrice}</p>
                <p><strong>CO₂-heitmete tasu:</strong> ${co2Price}</p>
                <p><strong>Massi põhine tasu:</strong> ${massPrice}</p>
                <p><strong>Baastasu:</strong> ${basePrice}</p>
            `;
            displayResult("aastaContainer", result);
    }



function displayResult(containerId, content) {
    const resultContainer = document.getElementById(containerId);
    if (resultContainer) {
        resultContainer.innerHTML = content;
        resultContainer.style.visibility = 'visible';
    }}
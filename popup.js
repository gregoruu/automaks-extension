document.getElementById("submitBtn").addEventListener("click", returnText);

function returnText(){
    let nrmark=document.getElementById("nrmark").value.trim();

    let apiUrl=`https://apimsm.transpordiamet.ee/msm/regTasu/${nrmark}`;
    if (nrmark===""){
        return;
    }
    fetch(apiUrl)
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
            displayResult(result);
        })

}
function displayResult(content){
    let resultContainer=document.getElementById("resultContainer");
    resultContainer.innerHTML=content;
}

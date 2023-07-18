const newPatient=document.querySelector(".new-patient");
const patientList=document.querySelector(".patient-list");
const serviceList=document.querySelector(".service-list");

const firstContainer=document.querySelector(".first-container");
const secondContainer=document.querySelector(".second-container");
const thirdContainer=document.querySelector(".third-container");
const fourthContainer=document.querySelector(".fourth-container");

const mainDiv=document.querySelector(".main-div");

const backMainFromNP=document.querySelector(".back-NP");
const backMainFromPL=document.querySelector(".back-PL");
const backMainFromSL=document.querySelector(".back-SL");

const servicesDiv=document.querySelector(".services-div");
const serviceDiv=document.querySelectorAll(".service-div");

const transactionsDiv=document.querySelector(".transactions-div");
const transactionDiv=document.querySelectorAll(".transaction-div");
const Table=document.querySelectorAll(".transaction-table");

const addServiceName=document.getElementById("service-name-input")
const addServicePrice=document.getElementById("service-price-input")
const addServiceButton=document.querySelector(".add-service-btn");
const deleteServiceButton=document.querySelectorAll(".del-service");
const deleteLastTransactionsButton=document.querySelector(".del-chosen-trans");
const savePatientButton=document.querySelector(".save-patient");

const teeth=document.querySelectorAll(".tooth-container");
const transactionTable=document.querySelectorAll(".transaction-table-row");
const tbody=document.querySelector(".tbody");

const inputPatientName=document.querySelector(".patient-name")
const inputPatientPhone=document.querySelector(".patient-phone");
const patientListBody=document.querySelector(".patient-list-body");
const patientListBodyPart=document.querySelectorAll(".patient-list-body-part");

let transactionsArr=[];
let transactionPriceArr=[];
/////////////////////////////////////////////////////////////////////////////////
// STYLE FUNCTIONS
newPatient.addEventListener("click",()=>{
    mainDiv.classList.toggle("slide-new-patient");
    
});

backMainFromNP.addEventListener("click",()=>{
    mainDiv.classList.toggle("slide-new-patient");
    

});

patientList.addEventListener("click",()=>{
    mainDiv.classList.toggle("slide-patient-list")
    
});
backMainFromPL.addEventListener("click",()=>{
    mainDiv.classList.toggle("slide-patient-list")
    
});
serviceList.addEventListener("click",()=>{
    mainDiv.classList.toggle("slide-service-list")
   
});
backMainFromSL.addEventListener("click",()=>{
    mainDiv.classList.toggle("slide-service-list")
   
});
// STYLE FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////
// İŞLEM EKLEME ÇIKARMA LOCALSTORAGE KAYDETME SİLME
let serviceNameArr=[];
let servicePriceArr=[];
let serviceListArr=[];
let listArr=[];
let isUpdated=false;

function getServicesFromLocalStorage(){
    if(localStorage.getItem("serviceNames")){
        serviceNameArr=JSON.parse(localStorage.getItem("serviceNames"));
        servicePriceArr=JSON.parse(localStorage.getItem("servicePrices"));
    }else{
        serviceNameArr=["Diş Çekimi","Çene Operasyon"];
        servicePriceArr=["500","3000"];
    };

};
function addServicesToLocalStorage(){
    serviceListArr=[serviceNameArr,servicePriceArr];
    const arrayNames=["serviceName","servicePrice"];
    arrayNames.forEach((arrayName,index)=>{
        localStorage.setItem(
            `${arrayName}s`,
            JSON.stringify(serviceListArr[index])
        );
    });
};
function createServiceDiv(index){
    const newDiv=document.createElement("div");
    newDiv.classList.add("service-div");
    const newI=document.createElement("i");
    newI.classList.add("fa-solid", "fa-times","del-service");
    newI.addEventListener("click",()=>{
        serviceNameArr.splice(index,1);
        servicePriceArr.splice(index,1);
        updateServiceList();
        newI.parentElement.remove();
        updateTransactionsDiv();
    });
    const newP=document.createElement("p");
    newP.classList.add("service-name");
    const newP2=document.createElement("p");
    newP2.classList.add("service-price");
    newP.textContent=serviceNameArr[index];
    newP2.textContent=servicePriceArr[index];
    newDiv.append(newI,newP,newP2);
    servicesDiv.appendChild(newDiv);
    
};
function updateServiceList(){
    if(!isUpdated){
        getServicesFromLocalStorage();
    }
    isUpdated=true;
    servicesDiv.textContent="";

      for (index=0;index<=serviceNameArr.length;index++){
        if(index<=serviceNameArr.length){
            createServiceDiv(index);
              
        }; 
      };  
    addServicesToLocalStorage();
    
};

updateServiceList();

addServiceButton.addEventListener("click",()=>{
    if(addServiceName.value&&addServicePrice.value){
        serviceNameArr.push(addServiceName.value);
    servicePriceArr.push(addServicePrice.value);
    updateServiceList();
    updateTransactionsDiv();
    remainingSize();
    }else{
        alert("Lütfen Bilgileri Doldurunuz!!");
    };
});
// İŞLEM EKLEME ÇIKARMA LOCALSTORAGE KAYDETME SİLME
/////////////////////////////////////////////////////////////////////////////////
// YENİ HASTA KAYDI OLUŞTURMA İŞLEMLERİ
function updateTransactionsDiv(){
    transactionsDiv.innerHTML="";
    serviceNameArr.forEach((abcdef,i)=>{
        createTransaction(i);
    });
};

function createTransaction(i){
    const newDivT=document.createElement("div");
    newDivT.classList.add("transaction-div");
    const newPT=document.createElement("p");
    newPT.classList.add("transaction-name");
    newPT.innerText=serviceNameArr[i];
    const newP2T=document.createElement("p");
    newP2T.classList.add("transaction-price");
    newP2T.innerText=servicePriceArr[i];
    newDivT.append(newPT,newP2T);
    newDivT.addEventListener("click",()=>{
        if(tbody.hasChildNodes()){
            const newTransactionTableNameTd=document.createElement("td");
            newTransactionTableNameTd.innerText=newDivT.firstChild.innerText;
            tbody.lastChild.lastChild.lastChild.firstChild.appendChild(newTransactionTableNameTd);
            const newTransactionTablePriceTd=document.createElement("td");
            newTransactionTablePriceTd.innerText=newDivT.lastChild.innerText;
            tbody.lastChild.lastChild.lastChild.lastChild.appendChild(newTransactionTablePriceTd);
            transactionsArr[(transactionsArr.length-1)].push(`${newPT.textContent} ${newP2T.textContent}`);
            transactionPriceArr.push(newP2T.textContent);
            savedPatientTransactionArr[savedPatientTransactionArr.length-1].push(`${newPT.textContent} ${newP2T.textContent}`)
            
        }else{
            alert("Diş Seçmediniz!");
        };
       
    });
    transactionsDiv.appendChild(newDivT);
};

updateTransactionsDiv();

    teeth.forEach((tooth)=>{
        tooth.addEventListener("click",()=>{
            
            const newTransTableRow=document.createElement("tr");
            newTransTableRow.classList.add("transacion-table-row");
            const newToothTd=document.createElement("td");
            newToothTd.classList.add("tooth-tooth");
            newToothTd.innerText=tooth.innerText;
            const newTransactionTd=document.createElement("td");
            const newTable=document.createElement("table");
            newTable.classList.add("transaction-table")
            const newTransactionTr=document.createElement("tr");
            newTransactionTr.classList.add("transaction-table-name");
            const newTransactionTr2=document.createElement("tr");
            newTransactionTr2.classList.add("transaction-table-price");
            newTable.append(newTransactionTr,newTransactionTr2);
            newTransactionTd.appendChild(newTable);
            newTransTableRow.appendChild(newToothTd);
            newTransTableRow.appendChild(newTransactionTd);
            tbody.appendChild(newTransTableRow);
            const newArr= new Array (`${tooth.innerText}`);
            transactionsArr.push(newArr);
            const newArr2= new Array (`${tooth.innerText}`)
            savedPatientTransactionArr.push(newArr2);
        });
    });

   deleteLastTransactionsButton.addEventListener("click",()=>{
        tbody.lastChild.remove();
        savedPatientTransactionArr.pop();
        transactionPriceArr.pop();
        
   });
    
    
// YENİ HASTA KAYDI OLUŞTURMA İŞLEMLERİ
///////////////////////////////////////////////////////////////////////////////////
// HASTAYI KAYDETME İŞLEMLERİ

savePatientButton.addEventListener("click",()=>{
    if(tbody.hasChildNodes()&&inputPatientName.value&&inputPatientPhone.value){
        savedPatientNameArr.push(`${inputPatientName.value}`);
        savedPatientPhoneArr.push(`${inputPatientPhone.value}`);
        savedPatientTransactionsArr.push(`${savedPatientTransactionArr.join(" - ")}`);
        savedPatientCountArr.push(`${patientListBody.children.length}`)
        let totalPrice=transactionPriceArr.map(Number);
            let total=0;
            for (let i=0;i<totalPrice.length;i++){
            total+=totalPrice[i];
            };
            savedPatientTotalArr.push(total);
        savePatient();
         mainDiv.classList.toggle("slide-patient-list");
         thirdContainer.classList.toggle("when-slide");
         mainDiv.classList.toggle("slide-new-patient");
         secondContainer.classList.toggle("when-slide");
         savedPatientTransactionArr=[];
         transactionPriceArr=[];
         updatePatientList();
         remainingSize();
         tbody.innerText="";
         inputPatientName.value="";
         inputPatientPhone.value="";
    }else{
        alert("Lütfen doldurulması gerekli alanları doldurunuz!");
    };
    
})
function savePatient(index){
    newTr=document.createElement("tr");
    newTr.classList.add("patient-list-body-part");
    const newTdCount=document.createElement("td");
    newTdCount.innerText=`#${savedPatientCountArr[index]}`
    newTdCount.addEventListener("click",()=>{
        savedPatientCountArr.splice(index,1);
        savedPatientNameArr.splice(index,1);
        savedPatientPhoneArr.splice(index,1);
        savedPatientTransactionsArr.splice(index,1);
        savedPatientTotalArr.splice(index,1);
        updatePatientList();
        newTdCount.parentElement.remove();
    });
    const newTdName=document.createElement("td");
    newTdName.innerText=savedPatientNameArr[index];
    const newTdPhone=document.createElement("td");
    newTdPhone.innerText=savedPatientPhoneArr[index];
    const newTdTransactions=document.createElement("td");
    newTdTransactions.innerText=savedPatientTransactionsArr[index];
    const newTdTotal=document.createElement("td");
    
    newTdTotal.innerText=`${savedPatientTotalArr[index]}₺`;
    newTr.append(newTdCount,newTdName,newTdPhone,newTdTransactions,newTdTotal);
    patientListBody.appendChild(newTr);
    
    
    
    
};

// HASTAYI KAYDETME İŞLEMLERİ
///////////////////////////////////////////////////////////////////////////////////
//KAYITLI HASTAYI LOCALSTORAGE KAYITLAYIP ORADAN ÇEKMEK
let isPatientsUpdated=false;
let savedPatientsArr=[];
let savedPatientCountArr=[];
let savedPatientNameArr=[];
let savedPatientPhoneArr=[];
let savedPatientTransactionsArr=[];
let savedPatientTransactionArr=[];
let savedPatientTotalArr=[];


function getPatientsFromLocalStorage(){
    if(localStorage.getItem("patientCounts")){
        savedPatientCountArr=JSON.parse(localStorage.getItem("patientCounts"));
        savedPatientNameArr=JSON.parse(localStorage.getItem("patientNames"));
        savedPatientPhoneArr=JSON.parse(localStorage.getItem("patientPhones"));
        savedPatientTransactionsArr=JSON.parse(localStorage.getItem("patientTransactions"));
        savedPatientTotalArr=JSON.parse(localStorage.getItem("patientTotals"));
    }else{
        savedPatientCountArr=["1"]
        savedPatientNameArr=["Doğancan Saçıkara"]
        savedPatientPhoneArr=["05309102282"]
        savedPatientTransactionsArr=["3-2 Diş Çekimi 500₺"]
        savedPatientTotalArr=["500₺"]
    }
}


function addPatientsToLocalStorage(){
    savedPatientsArr=[savedPatientCountArr,savedPatientNameArr,savedPatientPhoneArr,savedPatientTransactionsArr,savedPatientTotalArr];
    const infoPatientArrays=["patientCounts","patientNames","patientPhones","patientTransactions","patientTotals"];
    infoPatientArrays.forEach((info,index)=>{
        localStorage.setItem(
            info,
            JSON.stringify(savedPatientsArr[index])
        );
    });
};

function updatePatientList(){
    if(!isPatientsUpdated){
        getPatientsFromLocalStorage();
    }
    isPatientsUpdated=true;
    patientListBody.textContent="";

    for(index=0;index<=savedPatientCountArr.length;index++){
        if(index<=savedPatientCountArr.length){
            savePatient(index);
        };

    };
    addPatientsToLocalStorage();
    
};

updatePatientList();

//KAYITLI HASTAYI LOCALSTORAGE KAYITLAYIP ORADAN ÇEKMEK
const fullStorage=5*1024;
const serviceSize=0.2;
const patientSize=0.7;
const remainingBtn=document.querySelector(".remaining-btn");
const calcRemaining=document.querySelector(".calc-remaining");
const remaining=document.querySelector(".remaining");


function remainingSize(){
    var _lsTotal = 0,
    _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
        continue;
        };
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
    
    };

    let usedStorage=(_lsTotal / 1024).toFixed(2);
    let remainingStorage=fullStorage-usedStorage;
    let howManyPatient=Math.round(remainingStorage/patientSize);
    let howManyService=Math.round(remainingStorage/serviceSize);
    remaining.textContent=`Kalan Hasta Girme Hakkı: ${howManyPatient} -- Kalan İşlem Girme Hakkı: ${howManyService}`;
    };

remainingSize();





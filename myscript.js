/*Esercizio facoltativo: Strong Password Generator
nome repo: (essendo facoltativo, non serve una repo)
Consegna
Scrivi una funzione per generare una password, la cui lunghezza è definita dall’utente.
La password può essere formata da lettere minuscole, maiuscole, numeri e simboli (es: !, ?, &, %, $, ecc).
BONUS 1:
Realizzare una piccola web application e rendere utilizzabile il programma tramite un’interfaccia grafica
BONUS 2:
l’utente può scegliere se permettere la ripetizione di uno o più caratteri all’interno della password o se devono essere tutti caratteri diversi
BONUS 3:
L’utente può scegliere quali tipologie di caratteri utilizzare tra lettere, numeri e simboli
BONUS 4:
Aggiungere qualche validazione all’interfaccia o controllo logico, come ad esempio controllare che l’utente non richieda una password più lunga del numero dei caratteri disponibili (se tutti diversi)*/



//title(top+bottom) (contenitore)
title = document.getElementById('title');
title.innerHTML='<h3 id="titleT">Strong Password Generator</h3><h1 id="titleB">Genera una password sicura</h1>';

//la lunghezza della password (contenitore)
lunghezzaPassword = document.getElementById('lunghezzaPassword');
lunghezzaPassword.innerHTML+='<div class="box col-12"><input type="number" class="number col-12 text-center my-5" min="13" max="20"></div>';

//Consenti ripetizioni di uno o più caratteri(si/no)
caratteri = document.getElementById('caratteri');
caratteri.innerHTML+=`
    <div class="d-flex flex-row">
    <form>
        <div class="d-flex flex-row justify-content-center align-items-center mx-2">
            <input class="choices mx-2" type="radio" id="si" name="fav_language" value="Si" checked>
            <label for="si">Si</label>
        </div>
        <div class="d-flex flex-row justify-content-center align-items-center mx-2">
            <input class="choices mx-2" type="radio" id="no" name="fav_language" value="No">
            <label for="no">No</label>
        </div>
    </form> 
    </div>`;

// Getting DOM Elements
const generaPasswordButto = document.getElementById('generaPasswordButto')
const lettereElement = document.getElementById('lettere');
const numeriElement = document.getElementById('numeri');
const simboliElement = document.getElementById('simboli');
const length = document.querySelector('.number');
const form = document.getElementById('passwordGeneratorForm');
const passwordDispaly = document.getElementById('passwordDispaly');
const ripetizione = document.getElementById('si');
const nonRipetizione = document.getElementById('no');


//Generating character codes for the application
const lettereCharCodes = arrayFromLowToHigh(65, 90)
.concat(arrayFromLowToHigh(97, 122));
const numeriCharCodes = arrayFromLowToHigh(48, 57);
const simboliCharCodes = arrayFromLowToHigh(33, 47)
.concat(arrayFromLowToHigh(58, 64)
.concat(91, 96).concat(123, 126));

//Character Code Generating Function
function arrayFromLowToHigh(low, high){
    const array = [];
    console.log(array)
    for (let i=low; i<=high; i++){
        array.push(i);
    }
    return array;
}


//The password Generating Function
let generaPassword= (lunghezzaPasswordNumber,includeNumeri, includeLettere, includeSimboli) =>{
    let charCodes = [];
    if(includeLettere) charCodes = charCodes.concat(lettereCharCodes);
    if(includeNumeri) charCodes = charCodes.concat(numeriCharCodes);
    if(includeSimboli) charCodes = charCodes.concat(simboliCharCodes);

    if(nonRipetizione.checked){//no
    const passwordCharacters = [];
    while (passwordCharacters.length < lunghezzaPasswordNumber){
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        if(!arrayIncludeValure(passwordCharacters, characterCode)){
            passwordCharacters.push(String.fromCharCode(characterCode)); 
            if(includeNumeri && !includeLettere && !includeSimboli || !includeNumeri && !includeLettere && !includeSimboli ){
                alert("Con i criteri selezionati non è possibile generare la password desiderata");
                return
            }  
        }
    }
    console.log(passwordCharacters);
    return passwordCharacters.join('');
};
    if(ripetizione.checked){//si
        const passwordCharacters = []
        for  (let i=0; i<lunghezzaPasswordNumber;  i++){
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];  
        passwordCharacters.push(String.fromCharCode(characterCode));
            
    }
    console.log(passwordCharacters);
    return passwordCharacters.join('');
    
    }
}


//checking if there are characters with the same value
function arrayIncludeValure(arrayValue, value) {
    for (let i = 0; i < arrayValue.length; i++) {
        console.log(arrayValue)
        console.log(String.fromCharCode(value))
        if (arrayValue[i] == String.fromCharCode(value)) {
            return true;
        }
    }
    return false;
}

//checking the options that are selected and setting the password
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lunghezzaPasswordNumber = length.value;
    const includeLettere = lettereElement.checked; 
    const includeNumeri = numeriElement.checked;
    const includeSimboli = simboliElement.checked;  
    const password = generaPassword(lunghezzaPasswordNumber,includeNumeri, includeLettere, includeSimboli);
    console.log(password)
    passwordDispaly.innerHTML = password;
});





// seleçao de elementos
const generatePasswordButton = document.querySelector("#generate-password")
const generatePasswordElement = document.querySelector("#generated-password")
const openCloseGenatorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numberInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")
const popUP = document.querySelector("#pop-up")
// funçoes
const getLetterLowerCase =() =>{
    return String.fromCharCode(Math.floor(Math.random()* 26)+ 97);

};

const getLetterUpperCase =() =>{
    return String.fromCharCode(Math.floor(Math.random()* 26)+ 65);

};

const getNumber = () =>{
    return Math.floor(Math.random() * 10).toString();
}

const getSymbol = () =>{
    const symbols ="{}()[]=<>/,.!@#$%-*+\|";
    return symbols[Math.floor(Math.random()*symbols.length)]; 
}

const generatePassword = (getLetterLowerCase,getLetterUpperCase,getSymbol,getNumber)=>{
    popUP.classList.add("hide");
    let password =""
    const passWordLength = +lengthInput.value;
    if (passWordLength > 20){
        popUP.classList.remove("hide");
        setTimeout(() => {
            popUP.classList.add("hide");
        },2000)
        return;
    }

    const generator = [];

    if(lettersInput.checked){
        generator.push(getLetterLowerCase,getLetterUpperCase);
    }
    if(numberInput.checked){
        generator.push(getNumber);
    }
    if(symbolsInput.checked){
        generator.push(getSymbol);
    }
 
    if(generator.length===0){
       return;
    }

    for(i = 0; i < passWordLength;i = i + generator.length){
        generator.forEach(()=>{

            const ramdomValue = generator[Math.floor(Math.random() * generator.length)]();

           password += ramdomValue;
        });
    }
    password = password.slice(0,passWordLength);
    
    generatePasswordElement.style.display = "block"
    generatePasswordElement.querySelector("h4").innerText = password;
}
// eventos
generatePasswordButton.addEventListener("click",()=>{
    generatePassword(getLetterLowerCase,getLetterUpperCase,getSymbol,getNumber);
})

openCloseGenatorButton.addEventListener("click",(e)=>{
    generatePasswordContainer.classList.toggle("hide");
})

copyPasswordButton.addEventListener("click",(e)=>{
    e.preventDefault


    const password = generatePasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Copiado com sucesso"

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar"
        },1000)
    });
});
let input = document.querySelector(".input");
let buttons = document.querySelectorAll("button");

function substituicao(input) {
    return input
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100")
}

function updateInput(content) {
    input.value += content;
}

function  quantityNumbers(string, startChar, startCharIndex) {
    let str = String(string)
    if (startCharIndex === undefined) startCharIndex = str.indexOf(startChar);

    const blockedChars = ['+', '-', '*', '/']
    let i;
    for (i = startCharIndex+1; !blockedChars.includes(str.charAt(i)) && i < str.length; i++) {}
    return i-startCharIndex;
}

function calculate() {
    let correctedInput = substituicao(input.value);
    while (correctedInput.includes('√')) {
        const rootIndex = correctedInput.indexOf('√');
        const numbersQtd = quantityNumbers(correctedInput, '√', rootIndex);

        correctedInput = correctedInput.substring(0, rootIndex) + 
        "Math.sqrt(" + correctedInput.substring(rootIndex + 1, rootIndex + numbersQtd) + 
        ")" + correctedInput.substring(rootIndex + numbersQtd);
    }
    try {
        const result = new Function('return ' + correctedInput)();
        input.value = result !== undefined ? result : "";
    } catch {
        input.value = "Error";
    }
}

function clearInput() {
    input.value = "";
}

function deleteLastChar() {
    input.value = input.value.slice(0, -1);
}

buttons.forEach(button => {
    button.addEventListener("click", function (event) {
        const buttonText = event.target.textContent.trim();

        switch (buttonText) {
            case "=":
                calculate();
                break;
            case "C":
                clearInput();
                break;
            case "DEL":
                deleteLastChar();
                break;
            default:
                updateInput(buttonText);
                break;
        }
    });
});

function limparDisplay() {
    document.getElementById('display').value = ""
}
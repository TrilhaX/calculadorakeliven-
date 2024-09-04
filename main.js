let input = document.querySelector(".input");
let buttons = document.querySelectorAll("button");

function substituicao(input) {
    return input
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
}

function updateInput(content) {
    input.value += content;
}

function calculate() {
    try {
        let correctedInput = substituicao(input.value);
        input.value = parseInt(eval(correctedInput)) || "";
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
    button.addEventListener("click", function(event) {
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

function limparDisplay(){
    document.getElementById('display').value = ""
}

substituicao()

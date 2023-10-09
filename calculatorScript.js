// document.addEventListener(
//     "keydown",
//     (event) => {
//         var name = event.key;
//         var code = event.code;
//         // Alert the key name and key code on keydown
//         alert(`Key pressed ${name} \r\n Key code value: ${code}`);
//     },
//     false
// );

let number = [];
let addedNumber = [];

let buttonTable = [
    "7",
    "8",
    "9",
    "/",
    "+/-",
    "4",
    "5",
    "6",
    "x",
    "MR",
    "1",
    "2",
    "3",
    "-",
    "C",
    "0",
    ".",
    "CE",
    "+",
    "=",
];

const createButton = () => {
    for (let i = 0; i < buttonTable.length; i++) {
        const WholeButtonsContainer = document.querySelector(
            "#calculator-buttons-container"
        );
        const buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", `buttons-${i + 1} button`);
        const buttonGenerated = document.createElement("button");
        buttonGenerated.setAttribute(
            "class",
            `buttons-content-${i + 1} button-content`
        );
        buttonGenerated.setAttribute("id", `buttons-content-${i + 1}`);
        buttonGenerated.innerText = buttonTable[i];

        WholeButtonsContainer.appendChild(buttonContainer);
        buttonContainer.appendChild(buttonGenerated);

        isNumberButton(buttonGenerated);
        isOperatorButton(buttonGenerated);
        isDecimalPointButton(buttonGenerated);
        isCButton(buttonGenerated);
        isCEButton(buttonGenerated);
        isMPlusButton(buttonGenerated);
        isMRButton(buttonGenerated);
        isEqualButton(buttonGenerated);
    }
};

const isNumberButton = (button) => {
    button.addEventListener("click", () => {
        const buttonListened = button.innerText;
        const isNumeric = (num) => /^\d/.test(num);
        if (isNumeric(buttonListened)) {
            number.push(buttonListened);
            let totalNumber = number.join("");

            if (isNumeric(addedNumber[addedNumber.length - 1])) {
                document.getElementById(
                    "calculator-screen-numbers"
                ).textContent =
                    addedNumber[addedNumber.length - 1] + totalNumber;
            } else {
                document.getElementById(
                    "calculator-screen-numbers"
                ).textContent = totalNumber;
            }
        }
    });
};

const isDecimalPointButton = (button) => {
    button.addEventListener("click", () => {
        const buttonListened = button.innerText;
        const isDecimalPoint = (num) => /^\./.test(num);
        if (isDecimalPoint(buttonListened)) {
            const isNumberPresent = (num) => /^\d/.test(num);
            if (!number.includes(".") && isNumberPresent(number)) {
                number.push(buttonListened);
                let totalNumber = number.join("");
                document.getElementById(
                    "calculator-screen-numbers"
                ).textContent = totalNumber;
            }
        }
    });
};

const isOperatorButton = (button) => {
    button.addEventListener("click", () => {
        const buttonListened = button.innerText;
        const isOperator = (num) => /^[+\-x/]$/.test(num);
        if (isOperator(buttonListened)) {
            if (number) {
                const isLastEntryNumber = (num) => /^\d/.test(num);
                const isLastEntryOperator = (num) => /^[+\-x/]$/.test(num);

                if (isLastEntryNumber(number)) {
                    addedNumber.push(number.join(""));
                }

                if (isLastEntryNumber(addedNumber[addedNumber.length - 1])) {
                    /* eslint-disable */
                    switch (buttonListened) {
                        case "/":
                            addedNumber.push("/");
                            console.log(addedNumber);
                            document.getElementById(
                                "calculator-screen-numbers"
                            ).textContent = "/";
                            number = [];
                            break;
                        case "x":
                            addedNumber.push("*");
                            console.log(addedNumber);
                            document.getElementById(
                                "calculator-screen-numbers"
                            ).textContent = "x";
                            number = [];
                            break;
                        default:
                            addedNumber.push(buttonListened);
                            console.log(addedNumber);
                            document.getElementById(
                                "calculator-screen-numbers"
                            ).textContent = buttonListened;
                            number = [];
                    }
                }

                if (isLastEntryOperator(addedNumber[addedNumber.length - 1])) {
                    addedNumber.pop(addedNumber.length - 1);
                    addedNumber.push(buttonListened);
                    console.log(addedNumber);
                    document.getElementById(
                        "calculator-screen-numbers"
                    ).textContent = buttonListened;
                    number = [];
                }
            }
        }
    });
};

const isCButton = (button) => {
    button.addEventListener("click", () => {
        const buttonListened = button.innerText;
        const isC = (num) => /^C($|[^a-zA-Z])/.test(num);
        if (isC(buttonListened)) {
            number = [];
            addedNumber = [];
            document.getElementById("calculator-screen-numbers").textContent =
                "Hello";
        }
    });
};

const isCEButton = (button) => {
    button.addEventListener("click", () => {
        const buttonListened = button.innerText;
        const isCE = (num) => /^CE/.test(num);
        if (isCE(buttonListened)) {
            const isNumberPresent = (num) => /^\d/.test(num);
            if (isNumberPresent) {
                number = [];
                document.getElementById(
                    "calculator-screen-numbers"
                ).textContent = addedNumber[addedNumber.length - 1];
            }
        }
    });
};

const isEqualButton = (button) => {
    button.addEventListener("click", () => {
        const buttonListened = button.innerText;
        if (buttonListened === "=" || buttonListened === "Enter") {
            addedNumber.push(number.join(""));
            let result = addedNumber.join("");
            let parsedResult = parseFloat(eval(result).toFixed(9));
            if (
                Number.isNaN(parsedResult) ||
                parsedResult === Infinity ||
                parsedResult === -Infinity
            ) {
                document.getElementById(
                    "calculator-screen-numbers"
                ).textContent = "rst, impsble rslt";
                number = [];
                addedNumber = [];
            } else {
                document.getElementById(
                    "calculator-screen-numbers"
                ).textContent = parsedResult;
                console.log(result);
                addedNumber = [];
                addedNumber.push(parsedResult);
                number = [];
            }
        }
    });
};

const isMPlusButton = (button) => {
    button.addEventListener("click", () => {
        const buttonListened = button.innerText;
        const screenContent = document.getElementById(
            "calculator-screen-numbers"
        ).textContent;
        if (screenContent === "push ag if -nbr") {
            if (buttonListened === "+/-" && number[0]) {
                addedNumber.push("-");
                let totalNumber = number.join("");
                console.log(totalNumber);
                document.getElementById(
                    "calculator-screen-numbers"
                ).textContent = `-${totalNumber}`;
            }
        }
        if (screenContent !== "push ag if -nbr") {
            if (buttonListened === "+/-" && number[0]) {
                document.getElementById(
                    "calculator-screen-numbers"
                ).textContent = "push ag if -nbr";
            }
        }
    });
};

const isMRButton = (button) => {
    button.addEventListener("click", () => {
        const buttonListened = button.innerText;
        if (buttonListened === "MR") {
            addedNumber.push(number.join(""));
            let result = addedNumber.join("");
            number = [];
            document.getElementById("calculator-screen-numbers").textContent =
                result;
        }
    });
};

createButton();

document.addEventListener("keydown", (event) => {
    if (
        event.key === "0" ||
        event.key === "1" ||
        event.key === "2" ||
        event.key === "3" ||
        event.key === "4" ||
        event.key === "5" ||
        event.key === "6" ||
        event.key === "7" ||
        event.key === "8" ||
        event.key === "9"
    ) {
        number.push(event.key);
        console.log(number);
        let totalNumber = number.join("");
        console.log(totalNumber);

        const isNumeric = (num) => /^\d/.test(num);
        if (isNumeric(addedNumber[addedNumber.length - 1])) {
            document.getElementById("calculator-screen-numbers").textContent =
                addedNumber[addedNumber.length - 1] + totalNumber;
        } else {
            document.getElementById("calculator-screen-numbers").textContent =
                totalNumber;
        }
    }

    if (event.key === "." || event.key === ",") {
        const isNumberPresent = (num) => /^\d/.test(num);
        if (!number.includes(".") && isNumberPresent(number)) {
            number.push(".");
            let totalNumber = number.join("");
            document.getElementById("calculator-screen-numbers").textContent =
                totalNumber;
        }
    }

    if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
    ) {
        if (number) {
            const isLastEntryNumber = (num) => /^\d/.test(num);
            const isLastEntryOperator = (num) => /^[+\-x/]$/.test(num);

            if (isLastEntryNumber(number)) {
                addedNumber.push(number.join(""));
            }

            if (isLastEntryNumber(addedNumber[addedNumber.length - 1])) {
                addedNumber.push(event.key);
                console.log(addedNumber);
                if (event.key === "*") {
                    document.getElementById(
                        "calculator-screen-numbers"
                    ).textContent = "X";
                } else {
                    document.getElementById(
                        "calculator-screen-numbers"
                    ).textContent = event.key;
                }
                number = [];
            }

            if (isLastEntryOperator(addedNumber[addedNumber.length - 1])) {
                addedNumber.pop(addedNumber.length - 1);
                addedNumber.push(event.key);
                console.log(addedNumber);
                if (event.key === "*") {
                    document.getElementById(
                        "calculator-screen-numbers"
                    ).textContent = "X";
                } else {
                    document.getElementById(
                        "calculator-screen-numbers"
                    ).textContent = event.key;
                }
                number = [];
            }
        }
    }

    if (event.key === "=" || event.key === "Enter") {
        addedNumber.push(number.join(""));
        let result = addedNumber.join("");
        let parsedResult = parseFloat(eval(result).toFixed(9));
        if (
            Number.isNaN(parsedResult) ||
            parsedResult === Infinity ||
            parsedResult === -Infinity
        ) {
            document.getElementById("calculator-screen-numbers").textContent =
                "rst, impsble rslt";
            number = [];
            addedNumber = [];
        } else {
            document.getElementById("calculator-screen-numbers").textContent =
                parsedResult;
            console.log(result);
            addedNumber = [];
            addedNumber.push(parsedResult);
            number = [];
        }
    }

    if (event.key === "Escape") {
        number = [];
        addedNumber = [];
        document.getElementById("calculator-screen-numbers").textContent =
            "HELLO";
    }
});

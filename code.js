const BLACKLISTED_KEY_CODES = [38,40,37,39,18,20,17,16,9,27,144];

let userInput
let terminalOutput
let terminal
let keyboard
let windowTerminal

const app = () => {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("output");
    terminal = document.getElementById("terminal");
    keyboard = document.getElementById("keyboard");
    windowTerminal = document.getElementById("window");
    keyboard.focus();
    if (screen.width < 991){
        keyboard.addEventListener("keyup", key);
    }
    else{
        document.addEventListener('keypress', key);
    }
    document.addEventListener("keydown", backSpace);
};

const exec = function execCommand(input) {
    let output;

    if (input.length === 0) {
        return;
    }

    terminalOutput.innerHTML += `<div><span class="prompt-terminal">42sh$ </span><span class="command">${input}</span></div>`;

    switch (input) {
        case 'help':
            output = "Available commands : help, clear, date, status, exit";
            break;
        case 'clear':
            terminalOutput.innerHTML = "";
            return;
        case 'date':
            output = new Date().toString();
            break;
        case 'status':
            output = "This website is currently unavailable!";
            break;
        case 'exit':
            windowTerminal.parentNode.removeChild(windowTerminal);
            return;
        default:
            output = `<p>${input}: command not found</p>`;
    }

    terminalOutput.innerHTML += `<div class="output">${output}</div>`;
    terminal.scrollTop = terminal.scrollHeight;
};

let str = '';
const key = function keyEvent(event) {
    let currentKey = event.key;
    keyboard.focus();
    keyboard.innerHTML = event.target.value;
    if (BLACKLISTED_KEY_CODES.includes(event.keyCode)) {
        return
    }
    if (!currentKey || currentKey === "Unidentified" || screen.width < 991) {
        currentKey = event.target.value;
    }
    if (event.key === "Enter") {
        exec(userInput.innerHTML);
        userInput.innerHTML = "";
        currentKey = "";
        event.target.value = "";
        str = '';
    }
    else{
        if(screen.width < 991){
            str = currentKey;
        }else{
            str += currentKey;
        }
        event.preventDefault();
        userInput.innerHTML = str;
    }
}

const backSpace = function backSpace(e){
    if (e.keyCode === 8) {
        userInput.innerHTML = userInput.innerHTML.slice(
            0,
            userInput.innerHTML.length - 1
        );
        str = str.slice(
            0,
            str.length - 1
        );
    }
}

document.addEventListener("DOMContentLoaded", app);
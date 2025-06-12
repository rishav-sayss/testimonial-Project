const displaycontener = document.querySelector(".dispaly-password");
const datacopymassage = document.querySelector(".data-copy-massage");
const copybutton = document.querySelector(".copy-button");
const datalengthnumber = document.querySelector(".data-length-number");
const slider = document.querySelector(".slider");
const Uppercase = document.querySelector(".Upper-case");
const Lowercase = document.querySelector(".Lower-case");
const symbolschcek = document.querySelector(".symbols");
const numbers = document.querySelector(".numbers");
const dataindecater = document.querySelector(".data-indicater");
const generate = document.querySelector(".generate-button");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = `!@#$%^&*():"{},.?/[]'`;

let password = "";
let passwordlength = 10;
let checkcount = 0;

handleslider();
setindigeter("#ccc")

function handleslider() {
    slider.value = passwordlength;
    datalengthnumber.innerText = passwordlength;
    const min  = slider.min;
    const max  = slider.max;
    slider.style.backgroundSize = ( (passwordlength - min) * 100/(max-min)) + "% 100%";  
}

function setindigeter(color) {
    dataindecater.style.backgroundColor = color;
}

function getrndinteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generaterndnumber() {
    return getrndinteger(0, 9);
}

function generatelowercase() {
    return String.fromCharCode(getrndinteger(97, 123));
}

function generateuppercase() {
    return String.fromCharCode(getrndinteger(65, 91));
}

function generatesymbols() {
    let random = getrndinteger(0, symbols.length);
    return symbols.charAt(random);
}

function calcstrength() {
    const hasUpper = Uppercase.checked;
    const hasLower = Lowercase.checked;
    const hasNum = numbers.checked;
    const hasSym = symbolschcek.checked;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
        setindigeter("#0f0");
    } else if ((hasUpper || hasLower) && (hasNum || hasSym) && passwordlength >= 6) {
        setindigeter("#ff0");
    } else {
        setindigeter("#f00");
    }
}

async function copycontent() {
    try {
        await navigator.clipboard.writeText(displaycontener.value);
        datacopymassage.innerText = "copied";
    } catch (e) {
        datacopymassage.innerText = "failed";
    }
    datacopymassage.classList.add("active");
    setTimeout(() => {
        datacopymassage.classList.remove("active");
    }, 2000);
}

function sufflepassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

function handlecheckboxchange() {
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) checkcount++;
    });
    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleslider();
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", handlecheckboxchange);
});

slider.addEventListener("input", (e) => {
    passwordlength = e.target.value;
    handleslider();
});

copybutton.addEventListener("click", () => {
    if (passwordlength > 0) copycontent();
});

generate.addEventListener("click", () => {
    if (checkcount === 0) return;

    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleslider();
    }

    password = "";
    let funarr = [];

    if (Uppercase.checked) funarr.push(generateuppercase);
    if (Lowercase.checked) funarr.push(generatelowercase);
    if (numbers.checked) funarr.push(generaterndnumber);
    if (symbolschcek.checked) funarr.push(generatesymbols);

    for (let i = 0; i < funarr.length; i++) {
        password += funarr[i]();
    }

    for (let i = 0; i < passwordlength - funarr.length; i++) {
        let randIndex = getrndinteger(0, funarr.length);
        password += funarr[randIndex]();
    }

    password = sufflepassword(Array.from(password));
    displaycontener.value = password;
    calcstrength();
});

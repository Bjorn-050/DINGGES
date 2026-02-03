// SCHERM SELECTORS
const schermen = document.querySelectorAll('.scherm:not(#scherm-ja)'); // intro-schermen
const main = document.querySelector('main');
const jaKnop = document.getElementById('ja');
const neeKnop = document.getElementById('nee');
const schermJa = document.getElementById('scherm-ja');

// ----- Intro-schermen -----
let huidigeIndex = 0;

function volgendeScherm() {
    schermen[huidigeIndex].classList.remove('actief');
    huidigeIndex++;

    if (huidigeIndex < schermen.length) {
        schermen[huidigeIndex].classList.add('actief');
    } else {
        main.classList.add('actief');
    }
}

// Start de intro automatisch met click-optie
function startIntro() {
    const delay = 2500;
    schermen.forEach((_, i) => {
        setTimeout(() => {
            volgendeScherm();
        }, delay * (i + 1));
    });
}

// Klikken op intro-schermen versnelt door naar volgende
schermen.forEach(scherm => {
    scherm.addEventListener('click', volgendeScherm);
});

startIntro();

// Nee-knop gedrag
const neeTeksten = [
    "Nee💔",
    "Ehm… nee?",
    "Misschien?🥺",
    "Weet je het zeker?",
    "Denk nog eens na!?🤔",
    "Ben je héél zeker??😳",
    "Toch maar ja zeggen??😏",
    "Alsjeblieft, alsjeblieft🙏🏻",
    "Oke oke... misschien dan🥺"
];

let huidigeTekstIndex = 0;
let neeKlikken = 0;
let jaWidth = 7;   // em
let jaHeight = 4;  // em

neeKnop.textContent = neeTeksten[huidigeTekstIndex];

neeKnop.addEventListener('click', (e) => {
    e.preventDefault();
    neeKlikken++;

    if (neeKlikken <= 8) {
        huidigeTekstIndex = (huidigeTekstIndex + 1) % neeTeksten.length;
        neeKnop.textContent = neeTeksten[huidigeTekstIndex];
    } else {
        neeKnop.textContent = "😢";
    }

    // JA-knop groter maken tot max 2x
    if (jaWidth < 14) {
        jaWidth += 0.7;
        jaHeight += 0.4;
        jaKnop.style.width = jaWidth + "em";
        jaKnop.style.height = jaHeight + "em";
    }
});

// JA-knop gedrag
jaKnop.addEventListener('click', () => {
    // Verstuur e-mail via EmailJS
    emailjs.send("service_o5hsqrs", "template_c81fpma", {
        antwoord: "JA!! 🎉",
        naam: "Jassie"
    })
    .then(() => {
        console.log("E-mail verzonden!");
    })
    .catch((err) => {
        console.error("Fout bij verzenden:", err);
    });

    main.classList.remove('actief');
    schermJa.classList.add('actief');
});



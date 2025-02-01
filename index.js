// Countries Data (Merged from countries.js)
const countries = {
        "am-ET": "Amharic",
        "ar-SA": "Arabic",
        "be-BY": "Bielarus",
        "bem-ZM": "Bemba",
        "bi-VU": "Bislama",
        "bjs-BB": "Bajan",
        "bn-IN": "Bengali",
        "bo-CN": "Tibetan",
        "br-FR": "Breton",
        "bs-BA": "Bosnian",
        "ca-ES": "Catalan",
        "cop-EG": "Coptic",
        "cs-CZ": "Czech",
        "cy-GB": "Welsh",
        "da-DK": "Danish",
        "dz-BT": "Dzongkha",
        "de-DE": "German",
        "dv-MV": "Maldivian",
        "el-GR": "Greek",
        "en-GB": "English",
        "es-ES": "Spanish",
        "et-EE": "Estonian",
        "eu-ES": "Basque",
        "fa-IR": "Persian",
        "fi-FI": "Finnish",
        "fn-FNG": "Fanagalo",
        "fo-FO": "Faroese",
        "fr-FR": "French",
        "gl-ES": "Galician",
        "gu-IN": "Gujarati",
        "ha-NE": "Hausa",
        "he-IL": "Hebrew",
        "hi-IN": "Hindi",
        "hr-HR": "Croatian",
        "hu-HU": "Hungarian",
        "id-ID": "Indonesian",
        "is-IS": "Icelandic",
        "it-IT": "Italian",
        "ja-JP": "Japanese",
        "kk-KZ": "Kazakh",
        "km-KM": "Khmer",
        "kn-IN": "Kannada",
        "ko-KR": "Korean",
        "ku-TR": "Kurdish",
        "ky-KG": "Kyrgyz",
        "la-VA": "Latin",
        "lo-LA": "Lao",
        "lv-LV": "Latvian",
        "men-SL": "Mende",
        "mg-MG": "Malagasy",
        "mi-NZ": "Maori",
        "ms-MY": "Malay",
        "mt-MT": "Maltese",
        "my-MM": "Burmese",
        "ne-NP": "Nepali",
        "niu-NU": "Niuean",
        "nl-NL": "Dutch",
        "no-NO": "Norwegian",
        "ny-MW": "Nyanja",
        "ur-PK": "Pakistani",
        "pau-PW": "Palauan",
        "pa-IN": "Panjabi",
        "ps-PK": "Pashto",
        "pis-SB": "Pijin",
        "pl-PL": "Polish",
        "pt-PT": "Portuguese",
        "rn-BI": "Kirundi",
        "ro-RO": "Romanian",
        "ru-RU": "Russian",
        "sg-CF": "Sango",
        "si-LK": "Sinhala",
        "sk-SK": "Slovak",
        "sm-WS": "Samoan",
        "sn-ZW": "Shona",
        "so-SO": "Somali",
        "sq-AL": "Albanian",
        "sr-RS": "Serbian",
        "sv-SE": "Swedish",
        "sw-SZ": "Swahili",
        "ta-LK": "Tamil",
        "te-IN": "Telugu",
        "tet-TL": "Tetum",
        "tg-TJ": "Tajik",
        "th-TH": "Thai",
        "ti-TI": "Tigrinya",
        "tk-TM": "Turkmen",
        "tl-PH": "Tagalog",
        "tn-BW": "Tswana",
        "to-TO": "Tongan",
        "tr-TR": "Turkish",
        "uk-UA": "Ukrainian",
        "uz-UZ": "Uzbek",
        "vi-VN": "Vietnamese",
        "wo-SN": "Wolof",
        "xh-ZA": "Xhosa",
        "yi-YD": "Yiddish",
        "zu-ZA": "Zulu",
        "zh-CN": "Mandarin Chinese",
        "mr-IN": "Marathi",
        "sd-PK": "Sindhi",
        "mai-IN": "Maithili",
        "bho-IN": "Bhojpuri",
        "jv-ID": "Javanese",
        "af-ZA": "Afrikaans",
};

// Select Elements
const fromText = document.querySelector(".from-text"),
      toText = document.querySelector(".to-text1"),
      toText2 = document.querySelector(".to-text2"),
      exchangeIcon1 = document.querySelector(".exchange1"),
      exchangeIcon2 = document.querySelector(".exchange2"),
      selectTags = document.querySelectorAll("select"),
      translateBtn = document.querySelector(".translate-btn");

// Populate Language Options
selectTags.forEach((tag, id) => {
    for (let code in countries) {
        let selected = (id === 0 && code === "en-GB") || (id > 0 && code === "hi-IN") ? "selected" : "";
        let option = `<option ${selected} value="${code}">${countries[code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Swap Languages
exchangeIcon1.addEventListener("click", () => swapLanguages(1));
exchangeIcon2.addEventListener("click", () => swapLanguages(2));

function swapLanguages(index) {
    let tempText = fromText.value;
    let tempLang = selectTags[0].value;

    if (index === 1) {
        fromText.value = toText.value;
        toText.value = tempText;
        selectTags[0].value = selectTags[1].value;
        selectTags[1].value = tempLang;
    } else {
        fromText.value = toText2.value;
        toText2.value = tempText;
        selectTags[0].value = selectTags[2].value;
        selectTags[2].value = tempLang;
    }
}

// Translate Text
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    if (!text) return;

    let translateFrom = selectTags[0].value,
        translateTo1 = selectTags[1].value,
        translateTo2 = selectTags[2].value;

    translateText(text, translateFrom, translateTo1, toText);
    translateText(text, translateFrom, translateTo2, toText2);
});

function translateText(text, from, to, outputElement) {
    outputElement.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        outputElement.value = data.responseData.translatedText;
    });
}

// Copy to Clipboard
document.querySelectorAll(".copy-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let textArea = index === 0 ? fromText : index === 1 ? toText : toText2;
        navigator.clipboard.writeText(textArea.value).then(() => {
            alert("Copied: " + textArea.value);
        });
    });
});

// Text-to-Speech (Volume Up)
document.querySelectorAll(".volume-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let textArea = index === 0 ? fromText : index === 1 ? toText : toText2;
        let lang = index === 0 ? selectTags[0].value : index === 1 ? selectTags[1].value : selectTags[2].value;

        if (textArea.value.trim() !== "") {
            let utterance = new SpeechSynthesisUtterance(textArea.value);
            utterance.lang = lang;
            speechSynthesis.speak(utterance);
        } else {
            alert("No text available for speech!");
        }
    });
});

// Speech-to-Text (Microphone)
const microphoneIcon = document.getElementById("microphone-icon");
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = selectTags[0].value;

recognition.onresult = (event) => {
    fromText.value = event.results[0][0].transcript;
};

microphoneIcon.addEventListener("click", () => recognition.start());

// Dark Mode Toggle
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => document.body.classList.toggle("dark-mode"));


// Save Translations
const saveBtn = document.querySelector(".save-btn"),
      translationsList = document.querySelector(".translations-list"),
      translationDetail = document.querySelector(".translation-detail");

const saveTranslation = () => {
    if (!fromText.value.trim() || !toText.value.trim() || !toText2.value.trim()) {
        alert("No translation available to save.");
        return;
    }

    const saved = JSON.parse(localStorage.getItem("translations")) || [];
    saved.push({ from: fromText.value, to1: toText.value, to2: toText2.value });

    localStorage.setItem("translations", JSON.stringify(saved));
    alert("Translation saved successfully!");
    loadSavedTranslations();
};

// Load Saved Translations
const loadSavedTranslations = () => {
    const saved = JSON.parse(localStorage.getItem("translations")) || [];
    translationsList.innerHTML = "";

    saved.forEach((translation, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>From:</strong> ${translation.from} <br>
            <strong>To 1:</strong> ${translation.to1} <br>
            <strong>To 2:</strong> ${translation.to2}
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        listItem.addEventListener("click", () => viewTranslationDetails(translation));
        translationsList.appendChild(listItem);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = event.target.getAttribute("data-index");
            const saved = JSON.parse(localStorage.getItem("translations")) || [];
            saved.splice(index, 1);
            localStorage.setItem("translations", JSON.stringify(saved));
            loadSavedTranslations();
            translationDetail.style.display = "none";
        });
    });
};

window.addEventListener("load", loadSavedTranslations);

const viewTranslationDetails = (translation) => {
    translationDetail.innerHTML = `
        <h3>Translation Details</h3>
        <p><strong>From:</strong> ${translation.from}</p>
        <p><strong>To 1:</strong> ${translation.to1}</p>
        <p><strong>To 2:</strong> ${translation.to2}</p>
    `;
    translationDetail.style.display = "block";
};

// Attach event listener to save button
saveBtn.addEventListener("click", saveTranslation);

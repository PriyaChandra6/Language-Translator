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
    "fr-FR": "French",
    "gu-IN": "Gujarati",
    "hi-IN": "Hindi",
    "id-ID": "Indonesian",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "ko-KR": "Korean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "ru-RU": "Russian",
    "sv-SE": "Swedish",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "th-TH": "Thai",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "ur-PK": "Urdu",
    "vi-VN": "Vietnamese",
    "zh-CN": "Mandarin Chinese"
};

// Select Elements
const fromText = document.querySelector(".from-text"),
      toText = document.querySelector(".to-text1"),
      toText2 = document.querySelector(".to-text2"),
      exchageIcon = document.querySelector(".exchange1"),
      exchageIcon2 = document.querySelector(".exchange2"),
      selectTag = document.querySelectorAll("select"),
      translateBtn = document.querySelector(".translate-btn");

// Populate Language Options
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Swap Translation
exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

exchageIcon2.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText2.value;
    toText2.value = tempText;
    selectTag[0].value = selectTag[2].value;
    selectTag[2].value = tempLang;
});

// Clear Output if Input is Empty
fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
        toText.value = "";
        toText2.value = "";
    }
});

// Translate Text (Both Outputs)
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value,
        translateTo2 = selectTag[2].value;

    if (!text) return;

    // First Translation
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl1 = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl1).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    });

    // Second Translation
    toText2.setAttribute("placeholder", "Translating...");
    let apiUrl2 = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo2}`;
    fetch(apiUrl2).then(res => res.json()).then(data => {
        toText2.value = data.responseData.translatedText;
    });
});

// Speech-to-Text
const microphoneIcon = document.getElementById("microphone-icon");
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = selectTag[0].value;

recognition.onresult = (event) => {
    fromText.value = event.results[0][0].transcript;
};

recognition.onerror = (error) => {
    alert("Speech recognition error: " + error.error);
};

microphoneIcon.addEventListener("click", () => {
    recognition.start();
});

// Dark Mode Toggle
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

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

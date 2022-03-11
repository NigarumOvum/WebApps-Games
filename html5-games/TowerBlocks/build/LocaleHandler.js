const browserLanguage = (window.navigator.userLanguage || window.navigator.language).toLowerCase();

console.log("Current browser lang", browserLanguage);

i18nIsLoaded = false;


Importi18nScript();


function TranslateText(id, htmlElem) {
    if (i18nIsLoaded === false) {
        console.log("i18n is null, retrying...");
        setTimeout(() => {
            return TranslateText(id, htmlElem);
        }, 1000)
    } else {

        for (let i = 0; i < i18n.length; i++) {
            const element = i18n[i];

            if (element.id == id) {
                if (browserLanguage === "ja") {
                    htmlElem.innerText = element.ja;
                }
                else if (browserLanguage === "en-us") {
                    htmlElem.innerText = element.en;
                }
                else {
                    console.warn("Language not supported: " + browserLanguage);
                    htmlElem.innerText = element.en;
                }

            }
        }
    }
}



function TranslateAllPage() {
    console.log("Translating all page...");

    const i18nElems = document.getElementsByClassName("i18nElem");
    Translate(i18nElems);
}


function TranslateDynamicElem(elementClassName = "") {
    console.log("Translating specific element...", elementClassName);

    if (elementClassName.length == 0) {
        console.warn("element className is empty");
    }

    const specificElem = document.querySelectorAll(elementClassName);

    Translate(specificElem);
}


function Translate(elements) {
    console.log("Translating text...");

    for (i = 0; i < elements.length; i++) {
        let string = elements[i].innerText.toLowerCase();
        TranslateText(string, elements[i]);
    }
}

function Importi18nScript() {
    console.log("Importing i18n script...");

    const script = document.createElement("script");
    script.src = "./i18n.js";
    script.type = "text/javascript";
    const head = document.getElementsByTagName("head");
    window
    head[head.length - 1].appendChild(script).onload = () => {
        console.log("i18n loaded");
        i18nIsLoaded = true;
        TranslateAllPage();
    };
}
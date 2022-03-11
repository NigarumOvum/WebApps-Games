translation = {
    "start": {
        "en-us": "start",
        "ja": "スタート",
    },
    "controls": {
        "en-us": "controls",
        "ja": "操作"
    },
    "keyboard": {
        "en-us": "keyboard",
        "ja": "キーボード"
    },
    "touch": {
        "en-us": "touch",
        "ja": "タッチ"
    },
    "Leap Motion Controller": {
        "en-us": "leap motion contoroller",
        "ja": "Leap モーションコントローラー"
    },
    "gamepad": {
        "en-us": "gamepad",
        "ja": "ゲームパッド"
    },
    "quality": {
        "en-us": "quality",
        "ja": "解像度"
    },
    "low": {
        "en-us": "low",
        "ja": "低い"
    },
    "high": {
        "en-us": "high",
        "ja": "高い"
    },
    "very high": {
        "en-us": "very high",
        "ja": "とても高い"
    },
    "hud": {
        "en-us": "hud",
        "ja": "hud"
    },
    "on": {
        "en-us": "on",
        "ja": "オン"
    },
    "off": {
        "en-us": "off",
        "ja": "オフ"
    },
    "credits": {
        "en-us": "credits",
        "ja": "クレジット"
    },
    "hexgldesc": {
        "en": "HexGL is a futuristic, fast-paced racing game",
        "ja": "HexGLは、未来的でハイペースなレーシングゲームです。"
    },
    "hexgltutorial": {
        "en": "Tap & hold to accelerate\nSwipe to move left and right",
        "ja": "タップ長押しで加速\n左右にスワイプして操作"
    }
};

function LowerJSON(json) {
    let newJson = {};
    Object.keys(json).forEach(function (key) {
        let newKey = key;
        if (typeof key === 'string')
            newKey = key.toLowerCase();
        if (typeof json[key] === 'string')
            newJson[newKey] = json[key].toLowerCase();
        else
            newJson[newKey] = LowerJSON(json[key]);
    });
    return newJson;
}

browserLanguage = (window.navigator.userLanguage || window.navigator.language).toLowerCase();

elements = document.getElementsByClassName('string');

translation = LowerJSON(translation);

function TranslateText() {
    for (i = 0; i < elements.length; i++) {
        let string = elements[i].innerText.toLowerCase();
        let newString = "";
        if (translation[string]) {
            if (translation[string][browserLanguage])
                newString = translation[string][browserLanguage];
            else
                newString = string;
        }
        else {
            sections = string.split(":");
            for (j = 0; j < sections.length; j++) {
                sections[j] = sections[j].trim();
                if (translation[sections[j]])
                    newString += translation[sections[j]][browserLanguage];
                else
                    newString += sections[j];

                if (j != sections.length - 1)
                    newString += ": ";
            }
        }
        elements[i].innerText = newString;
    }
}




// const test = {
//     "start": {
//         "en": "Start",
//         "ja": "スタート"
//     },
//     "controls": {
//         "en": "Controls",
//         "ja": "操作"
//     },
//     "keyboard": {
//         "en": "Keyboard",
//         "ja": "キーボード"
//     },
//     "touch": {
//         "en": "Touch",
//         "ja": "タッチ"
//     },
//     "Leap Motion Controller": {
//         "en": "Leap Motion Controller",
//         "ja": "Leap モーションコントローラー"
//     },
//     "gamepad": {
//         "en": "Gamepad",
//         "ja": "ゲームパッド"
//     },
//     "quality": {
//         "en": "Quality",
//         "ja": "解像度"
//     },
//     "low": {
//         "en": "Low",
//         "ja": "低い"
//     },
//     "medium": {
//         "en": "Medium",
//         "ja": "普通"
//     },
//     "high": {

//         "en": "High",
//         "ja": "高い"
//     },
//     "veryhigh": {
//         "en": "Very High",
//         "ja": "とても高い"
//     },
//     "hud": {

//         "en": "HUD",
//         "ja": "HUD"
//     },
//     "on": {
//         "en": "On",
//         "ja": "オン"
//     },
//     "off": {
//         "en": "Off",
//         "ja": "オフ"
//     },
//     "credits": {
//         "en": "Credits",
//         "ja": "クレジット"
//     },
//     "hexgl": {
//         "en": "HexGL",
//         "ja": "HexGL"
//     },
//     "hexgldesc": {
//         "en": "HexGL is a futuristic, fast-paced racing game",
//         "ja": "HexGLは、未来的でハイペースなレーシングゲームです。"
//     },
//     "hexgltutorial": {
//         "en": "Tap & hold to accelerate\nSwipe to move left and right",
//         "ja": "タップ長押しで加速\n左右にスワイプして操作"
//     }
// }
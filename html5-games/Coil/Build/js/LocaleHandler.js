translation = {
	"Enclose the blue orbs before they explode. Gain bonus points by enclosing multiple orbs at once." : {
		"ja" : "青いオーブを円で囲んで爆発を防ごう。一度に複数の青いオーブを囲い込むことでボーナスポイントが加算させます。",
		"en-us" : "Enclose the blue orbs before they explode. Gain bonus points by enclosing multiple orbs at once.",
	 },
	"SCORE:" : {
		"ja" : "スコア:",
		"en-us" : "SCORE:",
	 },
	"Coil is an addictive HTML5 game where you have to defeat your enemies by enclosing them in your trail." : {
		"ja" : "「Coil」はプレイしたら最後、病みつきになってしまうほど楽しいHTML5ゲームです。あたなの行く手に光る青いオーブを囲って敵を倒そう！",
		"en-us" : "Coil is an addictive HTML5 game where you have to defeat your enemies by enclosing them in your trail.",
	 },
	"TIME:" : {
		"ja" : "時間:",
		"en-us" : "TIME:",
	 },
	"ENERGY:" : {
		"ja" : "エネルギー:",
		"en-us" : "ENERGY:",
	 },
	"MULTIPLIER:" : {
		"ja" : "乗数:",
		"en-us" : "MULTIPLIER:",
	 },
	"Your Score:" : {
		"ja" : "あなたのスコア:",
		"en-us" : "Your Score:",
	 },
	"Instructions" : {
		"ja" : "遊び方",
		"en-us" : "Instructions",
	 },
	"Start Game" : {
		"ja" : "ゲームを開始",
		"en-us" : "Start Game",
	 },
}

function LowerJSON(json) {
    let newJson = {};
    Object.keys(json).forEach(function(key) {
        let newKey = key;
        if (typeof key === 'string')
            newKey = key.toLowerCase();
        if (typeof json[key] === 'string')
            newJson[newKey] = json[key];
        else
            newJson[newKey] = LowerJSON(json[key]);
    });
    return newJson;
}

browserLanguage = (window.navigator.userLanguage || window.navigator.language).toLowerCase();

elements = document.getElementsByClassName('string');

translation = LowerJSON(translation);

function TranslateText() {
    for (i = 0;i < elements.length;i++){
        let string  = elements[i].innerText.toLowerCase();
        let newString = "";
        if (translation[string]){
            if (translation[string][browserLanguage])
                newString = translation[string][browserLanguage];
            else
                newString = string;
        }
        else{
            sections = string.split(":");
            for (j = 0;j < sections.length;j++){
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

function TranslationOf(text){
    return translation[text.toLowerCase()][browserLanguage];
}

TranslateText();
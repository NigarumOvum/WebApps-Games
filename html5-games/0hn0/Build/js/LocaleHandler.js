translation = {
	"Select a size" : {
		"ja" : "サイズを選択",
		"en-us" : "Select a size",
	 },
	"NumberCanBeEntered" : {
		"ja" : "NumberCanBeEntered",
		"en-us" : "NumberCanBeEntered",
	 },
	"Can you fill out the remaining dots?" : {
		"ja" : "残りの点を埋めてみよう。",
		"en-us" : "Can you fill out the remaining dots?",
	 },
	"This one should be easy..." : {
		"ja" : "これは簡単なはずです...",
		"en-us" : "This one should be easy...",
	 },
	"Select a size to play..." : {
		"ja" : "サイズを選択してプレイ",
		"en-us" : "Select a size to play...",
	 },
	"To make it see three dots it needs two more..." : {
		"ja" : "点を3つにするには後2つ必要です。。。",
		"en-us" : "To make it see three dots it needs two more...",
	 },
	"Loading" : {
		"ja" : "ロード中",
		"en-us" : "Loading",
	 },
	"Their numbers tell how many" : {
		"ja" : "青い点に記載の数字は他に点がいくつあるかを示します。",
		"en-us" : "Their numbers tell how many",
	 },
	"But red dots block their view!" : {
		"ja" : "赤い点は視界を遮ります。",
		"en-us" : "But red dots block their view!",
	 },
	"Play" : {
		"ja" : "プレイ",
		"en-us" : "Play",
	 },
	"How to play" : {
		"ja" : "遊び方",
		"en-us" : "How to play",
	 },
	"It's 0h h1's companion!" : {
		"ja" : "「0h h1」と同系統のゲームです！",
		"en-us" : "It's 0h h1's companion!",
	 },
	"So this 2 can only see dots on the right" : {
		"ja" : "この「2」は右方向しか見えません",
		"en-us" : "So this 2 can only see dots on the right",
	 },
	"About" : {
		"ja" : "ゲームについて",
		"en-us" : "About",
	 },
	"Two dots. These. Tap to make them blue" : {
		"ja" : "点が2つ。。。タップして青色に",
		"en-us" : "Two dots. These. Tap to make them blue",
	 },
	"This one doesnt seem right" : {
		"ja" : "これは正しくないようです",
		"en-us" : "This one doesnt seem right",
	 },
	"Looking further in one direction would exceed this number" : {
		"ja" : "一方向に集中すると答えが見えてくるかも",
		"en-us" : "Looking further in one direction would exceed this number",
	 },
	"Blue dots can see others in their own row and column" : {
		"ja" : "青い点は、自分の行と列にある他の点を見ることができます。",
		"en-us" : "Blue dots can see others in their own row and column",
	 },
	"This number cant see enough" : {
		"ja" : "この数字が見えている点の数が足りません",
		"en-us" : "This number cant see enough",
	 },
	"One specific dot is included in all solutions imaginable" : {
		"ja" : "考えられるすべての問題解決に1つ特定のドットが含まれています",
		"en-us" : "One specific dot is included in all solutions imaginable",
	 },
	"This number can see all its dots" : {
		"ja" : "この数字はすべての点を見ることができます",
		"en-us" : "This number can see all its dots",
	 },
	"This number sees a bit too much" : {
		"ja" : "この数字は見えている点の数が多すぎます",
		"en-us" : "This number sees a bit too much",
	 },
	"A blue dot should always see at least one other" : {
		"ja" : "青い点は少なくとも他の点が2つ見える必要があります",
		"en-us" : "A blue dot should always see at least one other",
	 },
	"Now close its path. Tap twice for a red dot" : {
		"ja" : "視界を遮ります。２回タップして赤点に変えます",
		"en-us" : "Now close its path. Tap twice for a red dot",
	 },
	"0h n0 is a little logic game where you have to fill out an entire grid of dots in order to satisfy the game's rules" : {
		"ja" : "「0h n0」は、ゲームのルールを満たすようマスに点を配置する論理ゲームです。",
		"en-us" : "0h n0 is a little logic game where you have to fill out an entire grid of dots in order to satisfy the game's rules",
	 },
	"This 1 should see only one. It already does - below!" : {
		"ja" : "この「1」は1つしか見えません。注意：すてに下に見えています",
		"en-us" : "This 1 should see only one. It already does - below!",
	 },
	"So its other path can be closed. Go ahead..." : {
		"ja" : "他のパスが遮っても良さそうです。どうぞ。。。",
		"en-us" : "So its other path can be closed. Go ahead...",
	 },
	"Only one direction remains for this number to look in" : {
		"ja" : "この数字は後一方向見るだけで大丈夫",
		"en-us" : "Only one direction remains for this number to look in",
	 },
	"You can now continue your previous game" : {
		"ja" : "前のゲームを続行することができます",
		"en-us" : "You can now continue your previous game",
	 },
	"These dont seem right" : {
		"ja" : "正しくないようです",
		"en-us" : "These dont seem right",
	 },
	"This 3 cant see left or right. But it does see a dot above" : {
		"ja" : "この「3」は左右が見えません。しかし上の点は視認できます",
		"en-us" : "This 3 cant see left or right. But it does see a dot above",
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

translation = LowerJSON(translation);

function TranslateText() {
	elements = document.getElementsByClassName('string');

    for (i = 0;i < elements.length;i++){
        let string  = elements[i].innerText.toLowerCase().trim();
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
	if (translation && translation[text.toLowerCase()] && translation[text.toLowerCase()][browserLanguage])
    	return translation[text.toLowerCase()][browserLanguage];
	return text;
}

TranslateText();
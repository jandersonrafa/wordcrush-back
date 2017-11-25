var keyWordHelpService = require('./keyWordHelpService');
var numberKeywordGameService = require('./numberKeywordGameService');
var randomService = require('./randomService');
var btoa = require('btoa')

module.exports = {

	findSettings: function (res) {
		keyWordHelpService.findAll().then((listKeyWordHelp) => {
			numberKeywordGameService.load().then((listNumber) => {
				var number = listNumber[0] ? listNumber[0].nrQuantityKeyword : 0

				// Random keywords
				var listKeywordHelpWithHelp = keyWordHelpService.getListKeywordsWithHelp(listKeyWordHelp)
				if (!number || listKeywordHelpWithHelp.length < number) {
					throw new Error("Não é possível iniciar o jogo!");
				}
				var listRandomKeywordHelp = randomService.randomFromArray(listKeywordHelpWithHelp, number)
				var listRandomKeywords = listRandomKeywordHelp.map((key) => key.dsKeyword)
				var maxSizeWords = keyWordHelpService.maxSizeWord(listRandomKeywords)
				var positionsMatriz = maxSizeWords * maxSizeWords
				var listCharactersKeywords = listRandomKeywords.join("").split("")
				var listAlphabetich = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")
				var listRandomCharacters = randomService.randomRepeatFromArray(listAlphabetich, positionsMatriz - listCharactersKeywords.length)

				var listAllCharacteres = listRandomCharacters.concat(listCharactersKeywords)
				var listRandomAllCharacters = randomService.randomFromArray(listAllCharacteres, listAllCharacteres.length)

				// 

				var mapCharacters = []
				while (listRandomAllCharacters.length) {
					var list = listRandomAllCharacters.splice(0, maxSizeWords)
					mapCharacters.push(list.map((kw) => { return { character: kw, selected: false } }));
				}

				var settings = {
					nrQuantityKeyword: number,
					listRandomKeywordHelp: listRandomKeywordHelp,
					mapCharacters: mapCharacters
				}
				res.json(btoa(JSON.stringify(settings)));
			})
		})
	},

};
var keyWordHelpService = require('./keyWordHelpService');
var numberKeywordGameService = require('./numberKeywordGameService');


module.exports = {

	findSettings: function (res) {
		keyWordHelpService.findAll().then((listKeyWordHelp) => {
			numberKeywordGameService.load().then((listNumber) => {
				var number = listNumber[0] ? listNumber[0].nrQuantityKeyword : 0
				
				// Random keywords
				var listKeywordWithHelp = keyWordHelpService.getListKeywordsWithHelp(listKeyWordHelp)
				if (!number || listKeywordWithHelp.length < number) {
					throw new Error("Não é possível iniciar o jogo!");
				}
				var listRandomKeywordHelp = keyWordHelpService.randomKeywords(listKeywordWithHelp, number)
				var maxSizeWords = keyWordHelpService.maxSizeWord(listKeywordWithHelp)
				// 
				var listCharacters = []

				var settings = {
					nrQuantityKeyword: number,
					listRandomKeywordHelp: listRandomKeywordHelp,
					listCharacters: listCharacters
				}
				res.json(settings);
			})
		})
	},

};
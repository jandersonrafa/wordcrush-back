var sobekService = require('./sobekService');
var keyWordHelpService = require('./keyWordHelpService');
var utilService = require('./utilService');

module.exports = {

	importText: function (text) {
		sobekService.send(text)
			.then(function (keyword) {
				var listKeyword = keyword.split('\n');
				var listKeywordHelp = listKeyword.map((key) => {
					var word = utilService.removeSpecialCharacter(key)
					return {
						dsKeyword: word.toUpperCase()
					}
				}).filter((kh) => {
					var blPalavraCompostaOuComTraco = kh.dsKeyword.indexOf("-") > -1 || kh.dsKeyword.indexOf(" ") > -1
					return kh.dsKeyword && !blPalavraCompostaOuComTraco
				})
				keyWordHelpService.deleteAll()
				keyWordHelpService.saveList(listKeywordHelp)
				console.log("success")
			}).catch(function (err) {
				console.log("error")
			});

		console.log("importar");
	}
};
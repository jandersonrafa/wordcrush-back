var KeywordHelp = require('../models/KeywordHelp');

module.exports = {

	saveList: function (listKeywordHelp) {
		KeywordHelp.insertMany(listKeywordHelp, function (err, key) {
			if (err) {
				res.send(err);
			} else {
				console.log("asdsad")
			}
		});
	},

	deleteAll: function () {
		KeywordHelp.remove({}, function (err) {
			if (err) {
				console.log("erro ao excluir keywords")
			} else {
				console.log("excluido todos keywords")
			}
		});
	},

	delete: function (id) {
		KeywordHelp.remove({
			_id: id
		}, function (err, todo) {
			if (err) {
				res.send(err);
			}
		});
	},

	findAll: function () {
		return KeywordHelp.find().exec()
	},
	
	getListKeywordsWithHelp: function(listKeywordHelp) {
		return listKeywordHelp.filter((key) => key.dsHelp != null).map((key) => key.dsKeyword)
	},

	randomKeywords: function (listKeyword, number) {
		function random_item(items) {
			return items[Math.floor(Math.random() * items.length)];
		}
		var listRandomKeywordHelp = []
		
		for (i = 0; i < number; i++) {
			var random = random_item(listKeyword)
			listKeyword.splice(random, 1)
			listRandomKeywordHelp.push(random)
		}
		return listRandomKeywordHelp;
	},

	maxSizeWord: function (listKeyword) {
		var maxSizeWord = 0
		listKeyword.forEach((word) => {
			if (word.length > maxSizeWord) {
				maxSizeWord = word.length;
			}
		})
		return maxSizeWord;
	}

};
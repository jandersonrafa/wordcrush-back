module.exports = {

	randomFromArray: function (list, number) {
		var cloneList = list.slice(0);
		function random_item(items) {
			return items[Math.floor(Math.random() * items.length)];
		}
		var listRandomKeywordHelp = []
		
		for (i = 0; i < number; i++) {
			var random = random_item(cloneList)
			var position = cloneList.indexOf(random);
			cloneList.splice(position, 1)
			listRandomKeywordHelp.push(random)
		}
		return listRandomKeywordHelp;
	},

	randomRepeatFromArray: function (list, number) {
		var cloneList = list.slice(0);
		function random_item(items) {
			return items[Math.floor(Math.random() * items.length)];
		}
		var listRandomKeywordHelp = []
		
		for (i = 0; i < number; i++) {
			var random = random_item(cloneList)
			listRandomKeywordHelp.push(random)
		}
		return listRandomKeywordHelp;
	}
};
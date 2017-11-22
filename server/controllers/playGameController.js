var playGameService = require("../services/playGameService")

module.exports = function (app) {
	const BASE_URL = '/api/play-game';

	app.get(BASE_URL + '/find-settings', function (req, res) {
		playGameService.findSettings(res)
	});

};
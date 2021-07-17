const { RC } = require("../../constants/response_codes");
const { db_find } = require("../../db/find");
const { secret_dbCollections } = require("../../secret/secret");
const { auth_che_checkAuth } = require("../authorization/check-auth/check-auth");
const { responsePattern } = require("../response-pattern");

const convertForSearch = (text) => {
	const pattern = [
		/[АаFf]/,
		/[Бб\<\,]/,
		/[ВвDd]/,
		/[ГгUu]/,
		/[ДдLl]/,
		/[ЕеTt]/,
		/[Ёё\~\`]/,
		/[Жж\:\;]/,
		/[ЗзPp]/,
		/[ИиBb]/,
		/[ЙйQq]/,
		/[КкRr]/,
		/[ЛлKk]/,
		/[МмVv]/,
		/[НнYy]/,
		/[ОоJj]/,
		/[ПпGg]/,
		/[РрHh]/,
		/[СсCc]/,
		/[ТтNn]/,
		/[УуEe]/,
		/[ФфAa]/,
		/[Хх\{\[]/,
		/[ЦцWw]/,
		/[ЧчXx]/,
		/[ШшIi]/,
		/[ЩщOo]/,
		/[Ъъ\}\]]/,
		/[ЫыSs]/,
		/[ЬьMm]/,
		/[Ээ\/\']/,
		/[Юю\>\.]/,
		/[ЯяZz]/
	];
	let resultString = /^/;
	for (let i = 0; i < text.length; i++) {
		const element = text[i];
		result = pattern.find(pattern => pattern.test(element));
		if (result === undefined) {
			result = new RegExp(element);
		}
		resultString = new RegExp(resultString.source + result.source);
	}
	return(RegExp(resultString.source + '[А-Яа-я0-9A-Za-z]*'));
}

async function sco_search(data, res){
	const user = await auth_che_checkAuth({...data.cookies}, res)
	if (user.code === RC.SUCCESS){
		const searchRequest = data.body.title;
		const scoresResult = await db_find(secret_dbCollections.scores, {
			draft: false,
			$or: [
				{title: {$regex: convertForSearch(searchRequest)}},
				{composer: {$regex: convertForSearch(searchRequest)}},
			]}, {});
		if (scoresResult.code === RC.SUCCESS) {
			const resultData = scoresResult.body.map(element => {
				return {
					id: element._id,
					title: element.title,
					composer: element.composer,
					parts: element.parts,
				}
			})
			return responsePattern(scoresResult.code, resultData);
		}
		return responsePattern(scoresResult.code)

	}
	return responsePattern(user.code);
}
module.exports.sco_search= sco_search;

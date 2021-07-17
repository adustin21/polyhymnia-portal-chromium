const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');const { secret_cookieSecretKey } = require('./secret/secret');
const https = require('https');
const fs = require('fs');
const fileupload = require('express-fileupload');
const app = express();
const port = 3000;

const { auth_acc_create } = require('./actions/authorization/account/create');
const { auth_acc_signIn } = require('./actions/authorization/account/sign-in');
const { auth_acc_signOut } = require('./actions/authorization/account/sign-out');
const { auth_acc_modify } = require('./actions/authorization/account/modify');
const { us_getData } = require('./actions/user/get-data');
const { man_req_modify } = require('./actions/manage/requests/get');
const { man_req_verify } = require('./actions/manage/requests/verify');
const { man_sco_dra_get } = require('./actions/manage/scores/draft/get');
const { man_sco_dra_create } = require('./actions/manage/scores/draft/create');
const { man_sco_sco_create } = require('./actions/manage/scores/score/create');
const { man_sco_dra_fil_upload } = require('./actions/manage/scores/draft/file-upload');
const { man_sco_dra_fils_delete } = require('./actions/manage/scores/draft/delete-files');
const { sco_getData } = require('./actions/scores/get-data');
const { sco_search } = require('./actions/scores/search');
const { sco_getScore } = require('./actions/scores/get-score');
const { sco_delete } = require('./actions/manage/scores/score/delete');
const { PROJECT_SETTINGS } = require('./setting');
const { man_add_create } = require('./actions/manage/adds/create');
const { ads_getAds } = require('./actions/ads/get-ads');


let key = fs.readFileSync(__dirname + '/key.pem');
let cert = fs.readFileSync(__dirname + '/cert.pem');
let httpsOptions = {
  key: key,
  cert: cert
};

app.use(express.json());
app.use(cookieParser(secret_cookieSecretKey));
app.use(fileupload());

const corsOptions = {
	origin:
	// 'http://127.0.0.1:5500',
	'http://localhost:3001',
	optionsSuccessStatus: 200,
	credentials: true,
}

app.options('*', cors(corsOptions));

app.post('/authorization/account/create', cors(corsOptions), async (req, res) => {
	const result = await auth_acc_create(req, res);
	res.send(
		result
	)
})

app.post('/authorization/account/sign-in', cors(corsOptions), async (req, res) => {
	const result = await auth_acc_signIn(req, res);
	res.send(
		result
	)
})

app.post('/authorization/account/sign-out', cors(corsOptions), async (req, res) => {
	const result = await auth_acc_signOut(req, res)
	res.send(
		result
	)
})

app.post('/authorization/account/modify', cors(corsOptions), async (req, res) => {
	const result = await auth_acc_modify(req, res)
	res.send(
		result
	)
})

app.post('/manage/requests/get', cors(corsOptions), async (req, res) => {
	const result = await man_req_modify(req, res);
	res.send(
		result
	)
})

app.post('/manage/requests/verify', cors(corsOptions), async (req, res) => {
	const result = await man_req_verify(req, res);
	res.send(
		result
	)
})

app.post('/manage/scores/draft/get', cors(corsOptions), async (req, res) => {
	const result = await man_sco_dra_get(req, res);
	res.send(
		result
	)
})

app.post('/manage/scores/draft/create', cors(corsOptions), async (req, res) => {
	const result = await man_sco_dra_create(req, res);
	res.send(
		result
	)
})

app.post('/manage/scores/file/load', cors(corsOptions), async (req, res) => {
	const result = await man_sco_dra_fil_upload(req, res);
	res.send(
		result
	)
})

app.post('/manage/score/draft/files/delete', cors(corsOptions), async (req, res) => {
	const result = await man_sco_dra_fils_delete(req, res);
	res.send(
		result
	)
})

app.post('/manage/scores/score/create', cors(corsOptions), async (req, res) => {
	const result = await man_sco_sco_create(req, res);
	res.send(
		result
	)
})

app.post('/ads/ad/create', cors(corsOptions), async (req, res) => {
	const result = await man_add_create(req, res);
	res.send(
		result
	)
})

app.post('/user/data/get', cors(corsOptions), async (req, res) => {
	const result = await us_getData(req, res);
	res.send(
		result
	)
})

app.post('/scores/data/get', cors(corsOptions), async (req, res) => {
	const result = await sco_getData(req, res);
	res.send(
		result
	)
})

app.post('/scores/score/get', cors(corsOptions), async (req, res) => {
	const result = await sco_getScore(req, res);
	res.send(
		result
	)
})

app.post('/scores/data/delete', cors(corsOptions), async (req, res) => {
	const result = await sco_delete(req, res);
	res.send(
		result
	)
})

app.post('/scores/data/search', cors(corsOptions), async (req, res) => {
	const result = await sco_search(req, res);
	res.send(
		result
	)
})

app.post('/ads/get', cors(corsOptions), async (req, res) => {
	const result = await ads_getAds(req, res);
	res.send(
		result
	)
})

app.get(/\/fileloader\/[\w]+/, cors(corsOptions), (req, res) => {
	let needPath = req.path.toString().slice(12);
	let middlePath = '/data-store/scores/'
	switch (needPath.slice(0, 4)) {
		case 'img/':
			middlePath = '/data-store/images/'
			needPath = needPath.slice(4)
		default:
			break;
	}
	try {
		const file = `${PROJECT_SETTINGS.PATH}${middlePath}${needPath}`;
		res.download(file, err => {
			if (err) {
				if(!res.headersSent){
				res.status(404);
				res.send("Фал не найден")
				}
			}else{
				if(!res.headersSent){
					res.status(200);
					res.send("Загрузка начнется в течении 30 секунд, пожалуйста ожидайте");
				}
			}
		});
	} catch (error) {
		res.status(404);
		res.send("Фал не найден")
	}
})


let server = https.createServer(httpsOptions, app)

server.listen(port, () => {
	console.log(`Example app listening at https://localhost:${port}`)
})

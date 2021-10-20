const jwt = require("jsonwebtoken");
const sign = "y4 n0 qu13r0 m45 t4r34 pl15";
const ObjectIdType = require('mongodb').ObjectID;
const Database = require('../models/database.model.js');

function validateToken(req, res, next){
  let token = req.get("x-auth");
	if (token) {
		jwt.verify(token, sign, (err, decoded) => {
			if (err) {
				console.log(err.name);
				res.status(401).send({ error: "Token no válido" });
			} else {
				req.userId = decoded.idUser;
				next();
			}
		});
	} else {
		res.status(401).send({ error: "falta token" });
	}
}

function isLoggedIn(req, res, next){
	let token = req.get("x-auth");
	if (token) {
		jwt.verify(token, sign, (err, decoded) => {
			if (err) {
				console.log(err.name);
				res.status(401).send({ error: "Token no válido" });
			} else {
				req.userId = decoded.idUser;
				const userLogins = new Database('userLogins');
				userLogins.find({ userId: ObjectIdType(req.userId), token: token}, {}).toArray().then((result) => {
					if (result.length === 0){
						res.status(401).send({ error: "not logged in" });
					}
					else{
						next();
					}
				})
				.catch((err) => {
					res.status(500).send({ err });
				});
			}
		});
	} else {
		res.status(401).send({ error: "falta token" });
	}
}

module.exports = {validateToken, sign, isLoggedIn};
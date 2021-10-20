const jwt = require("jsonwebtoken");
const sign = "y4 n0 qu13r0 m45 t4r34 pl15";
const {ObjectId} = require('bson')

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

module.exports = {validateToken, sign};
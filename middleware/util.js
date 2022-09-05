import jwt from 'jsonwebtoken';

export default (userid) => {
	const token = jwt.sign(userid, process.env.JWT_SECRET);
	// const token = jwt.sign(userid, "MYBUDSECRET");
	return token;
};

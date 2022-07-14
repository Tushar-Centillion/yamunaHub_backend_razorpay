import { sign } from 'jsonwebtoken';
require('dotenv').config({ path: 'src/config/.env' });

const secret = process.env.JWT_ACCOUNT_ACTIVATION;

const generateJWTToken = (id, expiry) => {
	return sign({ sub: id }, 'SECRET', { expiresIn: '72h' });
};

export default generateJWTToken;

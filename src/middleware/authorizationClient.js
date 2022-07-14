import { clientService } from '../mongoServices';
import { CONSTANTS } from '../constants';
import { errorLogger, jwtVerify } from '../utils';
import { Mongoose } from 'mongoose';
const {
	RESPONSE_MESSAGE: { AUTHMIDDLEWARE },
	STATUS_CODE: { UNAUTHORIZED },
} = CONSTANTS;

const authorizationClient = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw new Error(AUTHMIDDLEWARE.TOKENNOTFOUND);
		const token =
			authorization && authorization.startsWith('Bearer ')
				? authorization.slice(7, authorization.length)
				: authorization;
		const verifyToken = jwtVerify(token);

		if (!verifyToken) throw new Error(AUTHMIDDLEWARE.TOKENINVALID);

		const currentDate = Math.floor(Date.now() / 1000);

		if (currentDate > verifyToken?.exp) {
			throw new Error(AUTHMIDDLEWARE.SESSIONEXPIRY);
		}
		const { payload } = await clientService.findAllQuery({
			_id: verifyToken.sub,
		});
		if (payload.length == 1) {
			const endpoint = req.route.path;
			let splitBaseUrl = req.baseUrl.split('/');
			const baseUrl = splitBaseUrl[splitBaseUrl.length - 1];
			let urlPath = baseUrl + endpoint;
			const permissions = payload[0]?.role?._id;

			// const checkPermissions = permissions
			// 	.map((x) => x.path === urlPath)
			// 	.indexOf(true);

			// if (checkPermissions === -1) {
			// 	throw new Error(AUTHMIDDLEWARE.UNAUTHORIZED);
			// } else {
			// 	req.currentUser = payload[0];
			next();
			// }
		} else {
			throw new Error(AUTHMIDDLEWARE.UNAUTHORIZED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res
			.status(UNAUTHORIZED)
			.send({ success: false, message: error.message });
	}
};

export default authorizationClient;

import { errorLogger } from '../utils';
import { CONSTANTS } from '../constants';
import Razorpay from 'razorpay';
import axios from 'axios';
import crypto from 'crypto';
require('dotenv').config({ path: 'src/config/.env' });
const {
	STATUS_CODE: { SUCCESS, FAILED },
	RESPONSE_MESSAGE: { DATATYPE, FAILEDRESPONSE, ADMINUSER },
} = CONSTANTS;

const CreateRefund = async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
			key_secret: process.env.RAZORPAY_KEY_SECRET, // YOUR RAZORPAY SECRET
		});
		const { paymentId, amount, note } = req.body;
		console.log('req.body', req.body);
		const refund = instance.payments.refund(paymentId, {
			amount: Number(amount) * 100,
			speed: 'normal',
			notes: {
				notes_key_1: note,
			},
			receipt: 'Receipt No. 31',
		});

		// console.log('refund', refund);
	} catch (error) {
		// console.log('error', error);
		res.status(500).send(error);
	}
};

export default { CreateRefund };

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

const post = async (req, res) => {
	try {
		// console.log('inside function 000<< ', req.body);
		console.log('process.env.RAZORPAY_KEY_ID', process.env.RAZORPAY_KEY_ID);
		console.log(
			'process.env.RAZORPAY_KEY_SECRET',
			process.env.RAZORPAY_KEY_SECRET,
		);
		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
			key_secret: process.env.RAZORPAY_KEY_SECRET, // YOUR RAZORPAY SECRET
		});
		const options = {
			amount: Number(req.body.order.grandTotal * 100),
			currency: req.body.currency,
		};
		const order = await instance.orders.create(options);
		var RazorpayId = order.id;
		delete order.id;
		const url = 'http://143.110.186.132:1454/api/Order/CreateOrder';

		const client = axios.create({
			headers: {
				'Content-Type': 'application/json',
			},
		});
		req.body.order.RazorpayId = RazorpayId;

		// console.log('payloadData', req.body);
		if (!order) return res.status(500).send('Some error occured');
		const { data } = await client.post(url, req.body);
		if (data.status) {
			var payload = {
				...order,
				RazorpayId: RazorpayId,
				orderID: data.data.id,
				OrderNo: data.data.orderNo,
			};
			res.json(payload);
		}
	} catch (error) {
		console.log('error', error);
		res.status(500).send(error);
	}
};

const payment = async (req, res) => {
	try {
		const {
			orderCreationId,
			razorpayPaymentId,
			razorpayOrderId,
			razorpaySignature,
		} = req.body;
		console.log('req.body', req.body);

		const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
		shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
		const digest = shasum.digest('hex');

		if (digest !== razorpaySignature)
			return res.status(400).json({ msg: 'Transaction not legit!' });

		if (razorpayPaymentId) {
			var PaymentData = await checkPayment(razorpayPaymentId);
			if (PaymentData.captured) {
				const url = 'http://143.110.186.132:1454/api/Payment/CreatePayment';

				const client = axios.create({
					headers: {
						'Content-Type': 'application/json',
					},
				});
				req.body.paymentStatus = razorpayPaymentId ? 'success' : 'panding';
				const { data } = await client.post(url, req.body);
				res.json({
					msg: 'success',
					data: data,
				});
			} else {
				res.status(500).send('Payment failed');
			}
		}
	} catch (error) {
		console.log('error', error);
		res.status(500).send(error);
	}
};
const checkPayment = async (paymentID) => {
	const checkPaymentUrl = `https://api.razorpay.com/v1/payments/${paymentID}`;
	console.log(
		'process.env.BASE64_KEYANDSECRET',
		process.env.BASE64_KEYANDSECRET,
	);
	const client = axios.create({
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + process.env.BASE64_KEYANDSECRET,
		},
	});
	const { data } = await client.get(checkPaymentUrl);
	return data;
};
export default { payment, post };

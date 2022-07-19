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
		console.log('req.body', req.body);
		if (req.body) {
			const { amount, paymentObject } = req.body;
			var paymentId = paymentObject[0].razorpayPaymentId;
			console.log('paymentId', paymentId);
			var payload = {
				amount: Number(amount),
			};
			let RefundUrl = `https://api.razorpay.com/v1/payments/${paymentId}/refund`;
			const client = axios.create({
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Basic ' + process.env.BASE64_KEYANDSECRET,
				},
			});
			const { data } = await client.post(RefundUrl, payload);
			console.log('data', data);
			if (data) {
				var payloadRefund = {
					userId: req.body.userId,
					orderId: req.body.orderId,
					paymentId: req.body.paymentObject[0].id,
					refundDate: new Date(),
					razorpayRefundId: data.id ? data.id : '',
					entity: data.id,
					amount: data.amount,
					currency: data.currency,
					razorpayPayment_Id: req.body.paymentObject[0].razorpayPaymentId,
					note: req.body.note,
					status: data.status ? data.status : '',
					batch_Id: data.batch_Id ? data.batch_Id : '',
					speed_Requested: data.speed_Requested ? data.speed_Requested : '',
				};
				console.log('payloadRefund', payloadRefund);
				let AspRefundUrl = `http://143.110.186.132:1454/api/Refund/CreateRefund`;
				const clientasp = axios.create({
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const dataasp = await clientasp.post(AspRefundUrl, payloadRefund);
				console.log('dataasp', dataasp);
				if (dataasp.status == 200) res.json({ status: true });
			}
		}
		// console.log('refund', refund);
	} catch (error) {
		console.log('error', error);
		res.status(500).send(error);
	}
};
const getByidRefund = async (req, res) => {
	try {
		console.log('req.body', req.body);

		if (req.body.paymentId) {
			let AspRefundUrl = `http://143.110.186.132:1454/api/Refund/GetRefundByPaymentId/${req.body.paymentId}`;
			const clientasp = axios.create({
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const GetData = await clientasp.get(AspRefundUrl);
			if (GetData.data.status) {
				var { razorpayRefundId } = GetData.data?.data;
				console.log('razorpayRefundId', razorpayRefundId);
				var getRefund = `https://api.razorpay.com/v1/refunds/${razorpayRefundId}`;
				const Refund = axios.create({
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Basic ' + process.env.BASE64_KEYANDSECRET,
					},
				});
				const { data } = await Refund.get(getRefund);
				var payload = {
					...data,
					price: data.amount / 100,
				};
				res.status(200).send(payload);
			} else {
				res.status(500).send('order recode not found!');
			}
		}
	} catch (error) {
		console.log('error', error);
		res.status(500).send(error);
	}
};

export default { CreateRefund, getByidRefund };

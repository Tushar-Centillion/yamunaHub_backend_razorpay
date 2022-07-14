import { Schema, model, Types } from 'mongoose';
const PaymenttypeSchema = new Schema(
	{
		OrderId: {
			Type: String,
		},
		OrderNo: {
			type: Number,
			default: null,
		},
		UserId: {
			type: String,
			default: null,
		},
		IPAddress: {
			type: String,
			default: null,
		},
		PaymentDate: {
			type: Date,
			Default: null,
		},
		PaymentTotal: {
			type: Number,
		},
		PaymentType: {
			type: String,
		},
		PaymentDescription: {
			type: String,
		},
		PaymentStatus: {
			type: String,
		},

		createdBy: {
			type: Types.ObjectId,
			trim: true,
			max: 2000,
			default: null,
		},
		isEnabled: {
			type: Boolean,
			required: true,
			default: true,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
		deletedBy: {
			type: Types.ObjectId,
			default: null,
		},
		IsDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

module.exports = new model('Payments', PaymenttypeSchema);

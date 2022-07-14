import { Schema, model, Types } from 'mongoose';
const OrdertypeSchema = new Schema(
	{
		OrderNo: {
			type: Number,
			default: null,
		},
		UserId: {
			type: Types.ObjectId,
			default: null,
		},
		OrderStatus: {
			type: String,
			default: null,
		},
		GrandTotal: {
			type: Number,
			default: null,
		},
		CGST: {
			type: Number,
			default: null,
		},
		SGST: {
			type: Number,
			default: null,
		},
		IGST: {
			type: Number,
			default: null,
		},
		DiscountPercent: {
			type: Number,
			default: null,
		},
		AddressId: {
			type: String,
			default: null,
		},
		PaymentType: {
			type: String,
			default: null,
		},
		ShippingMethod: {
			type: String,
			default: null,
		},
		PurchaseDate: {
			type: Date,
			default: null,
		},
		DeliveryDate: {
			type: Date,
			default: null,
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

module.exports = new model('Orders', OrdertypeSchema);

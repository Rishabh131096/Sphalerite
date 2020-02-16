const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const Processes = Object.freeze({
	FullWash: 'fullWash',
	Stenter: 'stenter',
	Reprocess: 'reprocess',
	Dyeing: 'dyeing',
	Embossing: 'embossing',
	FullProcess: 'fullProcess',
	RFD: 'RFD',
	Coating: 'coating',
});

const Status = Object.freeze({
	Recieved: 'recieved',
	Processing: 'processing',
	Completed: 'completed',
	Delivered: 'delivered',
});

const OrdersSchema = mongoose.Schema({
	inDate: {
		day: Number,
		month: Number,
		year: Number
	},
	outDate: {
		day: Number,
		month: Number,
		year: Number
	},
	partyName: String,
	challanIn: String,
	challanOut: String,
	processName: {
		type: String,
		enum: Object.values(Processes)
	},
	rate: Number,
	processStatus: {
		type: String,
		enum: Object.values(Status)
	},
	qtyIn: Number,
	qtyOut: Number,
	eWayBill: String,
	remarks: String,
	balance: Number,
	taxable: Number,
	gst: Number,
	amount: Number,
	invoiceNum: Number,

}, {
	timestamps: true
});

OrdersSchema.plugin(autoIncrement.plugin, {
	model: 'Order',
	field: 'jobCard'
});

module.exports = mongoose.model('Order', OrdersSchema);
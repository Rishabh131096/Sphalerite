module.exports = (app) => {
	
	const order = require('../controllers/orders.controller.js');
	
	//ORDERS
	
	//Get all orders
	app.get('/order/findAll', order.findAll);
	
	//Get one order by job card number
	app.get('/order/findByJobCardNum/:jobCard', order.findOne);
	
	//Delete by job card number
	app.delete('/order/deleteByJobCard/:jobCard', order.delete);
	
	//Delete by _id
	app.delete('/order/deleteById/:_id', order.deleteById);
	
	//Update by job card number
	app.put('/order/update', order.update);

	//Create new order
	app.post('/order/createNewOrder', order.create);

	//View for Quantity In Page
	app.get('/order/quantityIn', order.quantityInView);

	//Update Process Status to "Processing"
	app.put('/order/processingUpdate', order.processingUpdate);

	//Update Process Status to "Delivered"
	app.put('/order/deliveringUpdate', order.deliveredUpdate);

	//View for Processing Page
	app.get('/order/processing', order.processingView);

	//View for Quantity Out Page
	app.get('/order/quantityOut', order.quantityOutView);

	//View for Accounts Page
	app.get('/order/accounts', order.accountsView);

}
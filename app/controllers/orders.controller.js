const Order = require('../models/orders.model.js');
const {
    Processes
} = require('../models/orders.model.js');
const moment = require('moment');
const mongoose = require('mongoose');

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }

    // Create an Order
    const order = new Order({
        inDate: req.body.inDate,
        partyName: req.body.partyName,
        challanIn: req.body.challanIn,
        processName: req.body.processName,
        qtyIn: req.body.qtyIn,
        processStatus: 'recieved',
        
        rate: null,
        challanOut: null,
        outDate: null,
        qtyOut: null,
        eWayBill: null,
        remarks: null,
        balance: null,
        taxable: null,
        gst: null,
        amount: null,
        invoiceNum: null,
    });

    // Save Order in the database
    order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Order.find()
        .then(order => {
            res.send(order);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// Find a single order with a job card
exports.findOne = (req, res) => {
    Order.findOne({
            "jobCard": req.params.jobCard
        })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with Job Card: " + req.params.jobCard
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with Job Card: " + req.params.jobCard
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with Job Card: " + req.params.jobCard
            });
        });
};

// Update an order identified by the job card in the request
exports.update = (req, res) => {
    var tempObj = req.body;
    Order.findOneAndUpdate({
        "jobCard": req.body.jobCard
    }, tempObj, {
        new: true
    }).then(order => {
        if (!order) {
            return res.status(404).send({
                message: "Order not found with Job Card: " + req.body.jobCard
            });
        }
        res.send(order);
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with Job Card: " + req.body.jobCard
            });
        }
        return res.status(500).send({
            message: "Could not delete order with Job Card: " + req.body.jobCard
        });
    });
};

// Delete an order with the specified job card in the request
exports.delete = (req, res) => {
    Order.findOneAndDelete({
            "jobCard": req.params.jobCard
        })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with Job Card: " + req.params.jobCard
                });
            }
            res.send({
                message: "Order with Job Card: " + req.params.jobCard + " deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Order not found with Job Card: " + req.params.jobCard
                });
            }
            return res.status(500).send({
                message: "Could not delete order with Job Card: " + req.params.jobCard
            });
        });
};

// Delete an order with the specified _id in the request
exports.deleteById = (req, res) => {
    Order.findByIdAndRemove(req.params._id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id: " + req.params._id
                });
            }
            res.send({
                message: "Order with id: " + req.params._id + " deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Order not found with id: " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete order with id: " + req.params._id
            });
        });
};

// View for Quantity In Page
exports.quantityInView = (req, res) => {
    Order.find({
            "processStatus": "recieved"
        })
        .then(order => {
            res.send(order);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// Update Processing Information
exports.processingUpdate = (req, res) => {
    var tempObj = req.body;
    tempObj.processStatus = "processing";
    Order.findOneAndUpdate({
        "jobCard": req.body.jobCard
    }, tempObj, {
        new: true
    }).then(order => {
        if (!order) {
            return res.status(404).send({
                message: "Order not found with Job Card: " + req.body.jobCard
            });
        }
        res.send(order);
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with Job Card: " + req.body.jobCard
            });
        }
        return res.status(500).send({
            message: "Could not delete order with Job Card: " + req.body.jobCard
        });
    });
};

// Update Status to "Completed"
exports.completedProcessUpdate = (req, res) => {
    var tempObj = req.body;
    tempObj.processStatus = "completed";
    Order.findOneAndUpdate({
        "jobCard": req.body.jobCard
    }, tempObj, {
        new: true
    }).then(order => {
        if (!order) {
            return res.status(404).send({
                message: "Order not found with Job Card: " + req.body.jobCard
            });
        }
        res.send(order);
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with Job Card: " + req.body.jobCard
            });
        }
        return res.status(500).send({
            message: "Could not delete order with Job Card: " + req.body.jobCard
        });
    });
};

// Update Status to "Delivered"
exports.deliveredUpdate = (req, res) => {
    var tempObj = Order.findOne({
            "jobCard": req.body.jobCard
        })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with Job Card: " + req.params.jobCard
                });
            }
            tempObj = order;
            var tempTaxable = tempObj.rate * tempObj.qtyOut;
            var tempGst = tempTaxable * 0.05;
            var updatedObj = {
                "processStatus": "delivered",
                "balance": tempObj.qtyOut - tempObj.qtyIn,
                "taxable": tempTaxable,
                "gst": tempGst,
                "amount": tempGst + tempTaxable
            };

            console.log(tempObj.qtyIn);

            Order.findOneAndUpdate({
                "jobCard": req.body.jobCard
            }, updatedObj, {
                new: true
            }).then(order => {
                if (!order) {
                    return res.status(404).send({
                        message: "Order not found with Job Card: " + req.body.jobCard
                    });
                }
                res.send(order);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Order not found with Job Card: " + req.body.jobCard
                    });
                }
                return res.status(500).send({
                    message: "Could not delete order with Job Card: " + req.body.jobCard
                });
            });

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with Job Card: " + req.params.jobCard
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with Job Card: " + req.params.jobCard
            });
        });


};

// View for Processing Page
exports.processingView = (req, res) => {
    Order.find({
            "processStatus": "processing"
        })
        .then(order => {
            res.send(order);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// View for Quantity Out Page
exports.quantityOutView = (req, res) => {
    Order.find({
            "processStatus": "delivered"
        })
        .then(order => {
            res.send(order);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// View for Accounts Page
exports.accountsView = (req, res) => {
    Order.find({
            "processStatus": "delivered"
        })
        .then(order => {
            res.send(order);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};
const Order = require('../model/OrderSchema');

const saveOrder = (req, resp) => {
    const order = new Order({
        customer: req.body.customer,
        items: req.body.items,
        total: req.body.total
    });
    order.save().then(response => {
        resp.status(201).json({state: true, message: 'Saved'});
    }).catch(error => {
        resp.status(500).json(error);
    });
}

const getAllOrders = (req, resp) => {
    Order.find().then(response => {
        resp.status(200).json({state: false, data: response});
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })
}

module.exports = {saveOrder, getAllOrders}
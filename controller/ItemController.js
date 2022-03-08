const Item = require('../model/ItemSchema');

const saveItem = (req, resp) => {
    const tempItem = new Item({
        code: req.body.code,
        description: req.body.description,
        unitPrice: req.body.unitPrice,
        qtyOnHand: req.body.qtyOnHand
    });
    Item.findOne({code: req.body.code}).then(response => {
        if(response == null){
            tempItem.save().then(response => {
                resp.status(201).json({state: true, message: 'Saved'});
            }).catch(error => {
                resp.status(500).json({state: false, message: 'Try Again'});
            })
        }else {
            resp.status(400).json({state: false, message: 'Already Exists'});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })

}
const updateItem = (req, resp) => {
    Item.updateOne({code: req.body.code}, {$set: {
            description: req.body.description,
            unitPrice: req.body.unitPrice,
            qtyOnHand: req.body.qtyOnHand
        }}).then(response => {
        if(response.modifiedCount>0){
            resp.status(201).json({state: true, message: 'Updated'});
        }else {
            resp.status(400).json({state: false, message: 'Try Again'});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })
}
const deleteItem = (req, resp) => {
    Item.deleteOne({code: req.headers.code}).then(response => {
        if(response.deletedCount>0){
            resp.status(201).json({state: true, message: 'Deleted'});
        }else {
            resp.status(400).json({state: false, message: 'Try Again'});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })
}
const searchItem = (req, resp) => {
    Item.findOne({code: req.headers.code}).then(response => {
        if(response == null){
            resp.status(400).json({state: false, message: 'Empty Result'});
        }else {
            resp.status(200).json({state: false, data: response});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })
}
const getAllItems = (req, resp) => {
    Item.find().then(response => {
        resp.status(200).json({state: false, data: response});
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })
}

module.exports = {saveItem, updateItem, deleteItem, searchItem, getAllItems}
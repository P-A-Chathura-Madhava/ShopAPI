const Customer = require('../model/CustomerSchema');
const {response} = require("express");

const saveCustomer = (req, resp) => {
    const tempCustomer = new Customer({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary
    });
    Customer.findOne({id: req.body.id}).then(response => {
        if(response == null){
            tempCustomer.save().then(response => {
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
const updateCustomer = (req, resp) => {
    Customer.updateOne({id: req.body.id}, {$set: {
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
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
const deleteCustomer = (req, resp) => {
    Customer.deleteOne({id: req.headers.id}).then(response => {
        if(response.deletedCount>0){
            resp.status(201).json({state: true, message: 'Deleted'});
        }else {
            resp.status(400).json({state: false, message: 'Try Again'});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })
}
const searchCustomer = (req, resp) => {
    Customer.findOne({id: req.headers.id}).then(response => {
        if(response == null){
                resp.status(400).json({state: false, message: 'Empty Result'});
        }else {
            resp.status(200).json({state: false, data: response});
        }
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })
}
const getAllCustomers = (req, resp) => {
    Customer.find().then(response => {
            resp.status(200).json({state: false, data: response});
    }).catch(error => {
        resp.status(500).json({state: false, message: 'Try Again'});
    })
}

module.exports = {saveCustomer, updateCustomer, deleteCustomer, searchCustomer, getAllCustomers}
const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
    addAddress: async (req, res) => {

        const newAddress = new Address({
            userId: req.user.id,
            addressLine1: req.body.addressLine1,
            postalCode: req.body.postalCode,
            default: req.body.default,
            deliveryInstructions: req.body.deliveryInstructions,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });

        try {
            if(req.body.default === true){
                await Address.updateMany({userId: req.user.id},{default: false})
            }

            await newAddress.save();
            res.status(201).json({status: true, message: "Address successfully added"});
        } catch (error) {
           res.status(500).json({status: false, message: error.message}); 
        }
    },

    getAddresses: async (req, res) => {
        try {
            const addresses = await Address.find({userId: req.user.id});

            res.status(200).json(addresses);
        } catch (error) {
          res.status(500).json({stats: false, message: error.message});  
        }
    },

    deleteAddress: async (req, res)=> {
        try {
            await Address.findByIdAndDelete(req.params.id);

            res.status(200).json({status: true, message: "Address successfully deleted"});
        } catch (error) {
            res.status(500).json({status: false, message: error.message}); 
        }
    }
}
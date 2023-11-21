const { Brand } = require("../model/Brand")

exports.fetchBrands = async (req, res) => {
    const brands = await Brand.find({}).exec()
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(400).json(err));
}


exports.createBrand = async (req, res) => {
    const brand = new Brand(req.body);
    const response = await brand.save()
        .then(doc => res.status(201).json(doc))
        .catch(err => res.status(400).json(err))
    console.log(response);
}
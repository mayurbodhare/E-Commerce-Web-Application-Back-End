const { Category } = require("../model/Category");

exports.fetchCategories = async (req, res) => {
    const categories = await Category.find({}).exec()
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(400).json(err));
}


exports.createCategory = async (req, res) => {
    const category = new Category(req.body);
    const response = await category.save()
        .then(doc => res.status(201).json(doc))
        .catch(err => res.status(400).json(err))
    console.log(response);
}
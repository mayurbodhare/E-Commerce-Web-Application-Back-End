const { Product } = require('../model/Product')

exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    const response = await product.save()
        .then(doc => res.status(201).json(doc))
        .catch(err => res.status(400).json(err))
    console.log(response);
}

exports.fetchAllProducts = async (req, res) => {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}

    let query = Product.find({});
    let totalProductsQuery = Product.find({});
    if(req.query.category){
        query =  query.find({category:req.query.category});
        totalProductsQuery =  totalProductsQuery.find({category:req.query.category});
    }
    if(req.query.brand){
        query =  query.find({brand:req.query.brand});
        totalProductsQuery =  totalProductsQuery.find({brand:req.query.brand});
    }
    // TODO: How to get sort on discounted Price not on Actual price
    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]:req.query._order})
        totalProductsQuery = totalProductsQuery.sort({[req.query._sort]:req.query._order})
    }

    const totalDocs = await totalProductsQuery.count().exec();

    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize*(page-1)).limit(pageSize);
    }
    
    const response = await query.exec()
        .then(doc => {
            res.set('X-Total-Count', totalDocs)
            res.status(200).json(doc)
        })
        .catch(err => res.status(400).json(err))
    console.log(response);
}

exports.fetchProductById = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(400).json(err))
}

exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true})
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(400).json(err))
}
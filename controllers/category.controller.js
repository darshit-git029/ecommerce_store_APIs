const db = require("../models");

//get all category data from table
exports.getcategoryData = async (req, res) => {
    try {
        const categories = await db.categories.findAll();

        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: 'error to get category data from table' });
    }
};

//get gategory data by id
exports.getcategoryDataById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const category = await db.categories.findOne({
            where: { id: [id] },
            include: [
                {
                    model: db.Product,
                    as: "categorys_product",
                }
            ]
        });

        if (!category) {
            return res.status(404).json({ message: 'Cannot find category with this ID' });
        }

        return res.status(200).json({ category });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving category data from the table' });
    }
};


//insert category data in table
exports.insertCategoryData = async (req, res) => {
    try {
        const {categorieName} = req.body
        if(!categorieName){
            return res.status(404).json({
                message:"Some parameaters are missing"
            })
        }
        const categories = await db.categories.create({  categorieName: req.body.categorieName });
        return res.status(200).json({ categories, message: "category data insertd successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'error to insert category data in table' });
    }
}

//update category data
exports.updateCategoryData = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const categories = await db.categories.update({ id: req.body.id, categorieName: req.body.categorieName }, { where: { id: id } });
        return res.status(200).json({ categories, message: "category data updated successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'error to update category data in table' });
    }
}

//delete category data from table
exports.deleteCategoryData = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const categories = await db.categories.destroy({
            where: { id: [id] }, include: [
                {
                    model: db.categories,
                    as: "categorys_product"
                }]
        })
        if (!categories) {
            return res.status(404).json({message : 'can not delete category data with this id'})
        }
        return res.status(200).json({ categories, message: ` ctaegory id ${id} data delete successfully` });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'error to delete category data from table' });
    }
}



const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [{
      model: Product,
      required: false,
    }],
  });

  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, {
    include: [{
      model: Product,
      required: false,
    }],
  });
  res.json(category);
});

router.post('/', async (req, res) => {
  // create a new category
  const newCat = await Category.create(req.body);
  res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updatedCategory = await Category.findByPk(req.params.id);
  await updatedCategory.update(req.body);
  await updatedCategory.save();
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.findByPk(req.params.id);
  deleteCategory.destroy();
  res.sendStatus(200);
});

module.exports = router;

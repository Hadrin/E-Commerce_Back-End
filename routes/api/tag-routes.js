const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: [{
      model: Product,
      required: false,
    }],
  });
  res.json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag = await Tag.findByPk(req.params.id, {
    include: [{
      model: Product,
      required: false,
    }],
  });
  res.json(tag);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
  res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.findByPk(req.params.id);
  await updateTag.update(req.body);
  await updateTag.save();
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = await Tag.findByPk(req.params.id);
  deleteTag.destroy();
  res.sendStatus(200);
});

module.exports = router;

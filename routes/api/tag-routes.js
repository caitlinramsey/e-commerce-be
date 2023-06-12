const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then((tagData) => {
    res.json(tagData);
  });
  //add products
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne(
    {
      where: {
        id: req.params.id
      },
    }
  ).then((tagData) => {
    res.json(tagData);
  }); //add product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.tagNames.length) {
        const tagNew = req.body.tagNames.map((tag_name) => {
          return {
            tag_name: tag.name
          };
        });
        return Tag.bulkCreate(tagNew)
      }
      // if no tags, respond
      res.status(200).json(tag);
    })
    .then(() => res.status(200).json())
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;

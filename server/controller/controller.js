var Dishdb = require("../model/model");

// create and save new dish
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  //new dish
  const dish = new Dishdb({
    dish: req.body.dish,
    category: req.body.category,
    description: req.body.description,
    ingredients: req.body.ingredients,
    diet: req.body.diet,
    allergens: req.body.allergens,
    price: req.body.price,
    availability: req.body.availability
  });

  // save dish in the database
  dish
    .save(dish)
    .then(data => {
      // res.send(data);
      res.redirect("/add-dish");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a create operation"
      });
    });
};

//retrive and return all dishes / retrive and return a single dish
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Dishdb.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `Not found dish with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: `Error retrieving dish with id ${id}` });
      });
  } else {
    Dishdb.find()
      .then(dish => {
        res.send(dish);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occur while retrieving dish information"
        });
      });
  }
};

// update a new identified dish by dish id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Dishdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update dish with id ${id}. Maybe dish not found`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error update dish information" });
    });

    console.log(req.body);
};

// delete a dish with especified dish id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Dishdb.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({ message: "Dish was deleted successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Could not delete dish with id ${id}` });
    });
};

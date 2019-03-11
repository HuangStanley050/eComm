exports.upLoad = (req, res, next) => {
  //console.log(req.file);
  const reqobj = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  };
  res.json(reqobj);
};

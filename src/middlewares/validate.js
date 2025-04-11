const validate = (fields) => (req, res, next) => {
  const errorMessages = [];

  const parts = {
    query: req.query,
    body: req.body,
    params: req.params,
  };

  Object.keys(fields).forEach((part) => {
    if (fields[part]) {
      console.log(parts[part]);
      const schema = fields[part];
      const { error } = schema.validate(parts[part] ?? {}, {
        abortEarly: false,
      });
      if (error) {
        error.details.forEach((err) =>
          errorMessages.push({ [part]: err.message })
        );
      }
    }
  });

  if (errorMessages.length > 0) {
    return res.status(400).send({ errors: errorMessages });
  }

  next();
};

module.exports = validate;

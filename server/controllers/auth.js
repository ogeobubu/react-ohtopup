const uuid = require("uuid");

exports.create = async (req, res) => {
  try {
    const { email, password, username, phone } = req.body;

    const createUser = {
      id: uuid.v4(),
      email,
      password,
      username,
      phone: +phone,
    };

    if (!email || !password || !username || !phone) {
      res.status(400).json({
        message: "All fields required!",
      });
    } else {
      res.status(200).json(createUser);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const loginUser = {
    email,
    password,
  };

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required.",
    });
  } else {
    return res.status(200).json(loginUser);
  }
};

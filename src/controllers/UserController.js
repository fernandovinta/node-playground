const User = require('../models/User');

module.exports = {

  async show(req, res) {
    try {
      const { userId } = req;
      const user = await User.findById(userId);
      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: "Can't get user information" });
    }
  }

};

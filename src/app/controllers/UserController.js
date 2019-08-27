import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { email, name, oldPassword } = req.body;

    const user = await User.findByPk(id);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail already registered' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { provider } = await user.update(req.body);

    return res.json({
      id,
      email,
      name,
      provider,
    });
  }
}

export default new UserController();

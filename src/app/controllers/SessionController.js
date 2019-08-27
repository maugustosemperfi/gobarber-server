import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, '4cb976565fd6d5f0061e52f4a4a7b2b9', { expiresIn: authConfig.expirensIn }),
    });
  }
}

export default new SessionControler();
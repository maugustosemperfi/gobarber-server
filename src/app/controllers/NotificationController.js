import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async getAll(req, res) {
    const { size } = req.query;
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort('createdAt')
      .limit(size ? size : 20);

    return res.json(notifications);
  }
}

export default new NotificationController();

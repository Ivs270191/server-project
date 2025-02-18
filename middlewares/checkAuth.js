import User from '../models/userModels.js';
import bcrypt from 'bcrypt';

export default async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password or email' });
    }
    req.user = user._doc;

    next();

}
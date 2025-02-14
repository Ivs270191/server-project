import bcrypt from 'bcrypt';
import User from '../models/userModels.js';

export const register = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            role
        })
        const { password: pass, ...userData } = user._doc;
        res.status(201).json(userData);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password or email' });
        }
        const { password: pass, ...userData } = user._doc;
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
};



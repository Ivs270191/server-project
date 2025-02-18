
export default async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(500).json({ error: 'not allowed' });
        }

        next();
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }



}
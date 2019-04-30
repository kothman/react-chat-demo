export default function(req: any, res: any, next: Function) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(401).json({ error: 'Not authorized as admin' });
}
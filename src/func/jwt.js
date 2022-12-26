import jwt  from 'jsonwebtoken';
export function valid_JWT(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return false;
    }
}

export function check_jwt(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = valid_JWT(token);
        if (decoded) {
            next();
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
}

export function generate_JWT(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1Y'
    });
}
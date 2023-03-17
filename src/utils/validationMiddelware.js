const userValidationMiddelware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const { details } = error;
            const message = details.map((err) => err.message);
            console.log('error', message);
            res.status(400).json({ error: message });
        } else {
            return next();
        }
    };
};

module.exports = { userValidationMiddelware };

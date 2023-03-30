const logger = (req, res, next) => {
    const { method, url } = req;
    console.log(`url: ${url}`);
    console.log(`Method: ${method}`);
    next();
};

module.exports = logger;

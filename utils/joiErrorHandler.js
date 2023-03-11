const joiErrorHandler = (err, req, res, next) => {
    if (err?.error?.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            message: err.error.toString(),
        });
    } else {
        // pass on to another error handler
        next(err);
    }
};

module.exports = joiErrorHandler;

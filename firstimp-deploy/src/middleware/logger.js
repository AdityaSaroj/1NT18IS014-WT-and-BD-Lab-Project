const logger = (req, res, next) => {
    const ip = req.connection.remoteAddress;
    // console.log(ip);
    console.log(`Endpoint hit:\t${req.url}\t${req.method}\t${ip}`);

    next();
};

module.exports = logger;

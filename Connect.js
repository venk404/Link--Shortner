const mongoose = require("mongoose")


async function ConnectwithDb(url)
{
    try {
        return mongoose.connect(url);
    } catch (error) {
        console.error('DB connection error:', error);
    }

}

module.exports = { ConnectwithDb };
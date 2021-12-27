const isConnected = async (database = database) => {
    try {
        await database.authenticate();
        console.log(`database is connected`);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = {
    isConnected
};

// return a list of attributes from a sequelize model
const getModelAttributes = (model) => {
    rawAttributes = model.rawAttributes;
    return Object.keys(rawAttributes);
};

module.exports = {
    getModelAttributes
};

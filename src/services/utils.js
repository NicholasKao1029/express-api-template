const errorMessages = require('../errors/messages.js');

/*
 * Assert all values exist in @attributes for @obj
 */
const assertAttributesAllLenient = (attributes, obj) => {
    const errorToThrow = new Error(errorMessages.missingCreationAttribute);
    // TODO: Fix to follow format below
    const objectKeys = new Set(Object.keys(obj));
    if (!_isSuperset(objectKeys, attributes)) {
        throw errorToThrow;
    }
    _assertAttributesExist(attributes, obj, errorToThrow);
};

/*
 * Assert object has all values and nothing more in creationAttributes
 */
const assertAttributesAll = (creationAttributes, obj) => {
    const errorToThrow = new Error(errorMessages.missingCreationAttribute);
    _assertContainsAllAttributes(creationAttributes, obj, errorToThrow);
};

/*
 * Assert object only has values from updatableAttributes
 */
const assertAttributesSubset = (updatableAttributes, obj) => {
    const errorToThrow = new Error(errorMessages.invalidUpdateAttribute);
    if (_isEmpty(obj)) {
        throw new Error(errorMessages.genericEmptyBody);
    }
    _assertAttributesExist(updatableAttributes, obj, errorToThrow);
};

/*
 * asserts object keys is subset of attributes
 */
const _assertAttributesExist = (attributes, obj, error) => {
    const keySet = new Set(Object.keys(obj));
    const attributeSet = new Set(attributes);

    if (!_isSuperset(attributeSet, keySet)) {
        throw error;
    }
};

/*
 * asserts object key set is equivalent to attributes set
 */
const _assertContainsAllAttributes = (attributes, obj, error) => {
    const keySet = new Set(Object.keys(obj));
    const attributeSet = new Set(attributes);

    if (!_eqSet(keySet, attributeSet)) {
        throw error;
    }
};

// https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality
const _eqSet = (aSet, bSet) => {
    if (aSet.size !== bSet.size) return false;
    for (const a of aSet) {
        if (!bSet.has(a)) {
            return false;
        }
    }
    return true;
};

const _isSuperset = (set, subset) => {
    for (const elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
};

const _isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

module.exports = {
    assertAttributesAll,
    assertAttributesSubset,
    assertAttributesAllLenient
};

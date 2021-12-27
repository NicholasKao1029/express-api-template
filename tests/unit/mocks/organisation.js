const { v4: uuidv4 } = require('uuid');

const listOrganisations = (amount = 5) => {
    const returnAmount = amount + 2;
    const loopAmount = Math.floor(Math.random() * returnAmount);
    const orgList = [];
    for (let step = 1; step < loopAmount; step++) {
        // NOTE: The use of uuidV4 is not neccessarily the case
        const generated = {
            id: step,
            name: `Random Org ${step}`,
            route_identifier: `random-org-${step}`,
            admin_id: uuidv4(),
            property_id: null,
            default_view_id: null,
            filter_view_id: null,
            date: '',
            join_code: uuidv4()
        };
        orgList.push(generated);
    }

    return orgList;
};

const singleOrg = () => {
    return {
        id: 18,
        name: 'SICKO MODE INCORP',
        route_identifier: 'sicko-mode-incorp',
        admin_id: 'rZJOnSelXseNs7WKFCr9NXOjWLp2',
        property_id: null,
        default_view_id: null,
        filter_view_id: null,
        date: '2021-02-06T02:47:45.615Z',
        join_code: '9Cd6WCPnAsNmCd0fe8Nap'
    };
};

module.exports = {
    listOrganisations,
    singleOrg
};

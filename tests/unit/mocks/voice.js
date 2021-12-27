const listVoice = (amount = 5) => {
    const voiceList = [
        {
            id: 1,
            name: 'en-US_MichaelV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        },
        {
            id: 2,
            name: 'en-GB_JamesV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        },
        {
            id: 3,
            name: 'en-US_EmilyV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        },
        {
            id: 4,
            name: 'en-US_LisaV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        },
        {
            id: 5,
            name: 'en-GB_KateV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        },
        {
            id: 6,
            name: 'en-US_HenryV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        },
        {
            id: 7,
            name: 'en-GB_CharlotteV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        },
        {
            id: 8,
            name: 'en-US_OliviaV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        },
        {
            id: 9,
            name: 'en-US_KevinV3Voice',
            user_facing_name: null,
            language: 'en',
            provider: 'ibm',
            neural: null,
            gender: null
        }
    ];

    const max = Math.min(10, amount);

    return voiceList.slice(0, max);
};

const singleVoice = () => {
    const voiceList = listVoice();

    const len = voiceList.length;

    return voiceList[Math.floor(Math.random() * len)];
};

module.exports = {
    listVoice,
    singleVoice
};

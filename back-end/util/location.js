const API_KEY = process.env.GOOGLE_API_KEY;

const getCoordsForAddress = async (address) => {
    return {
        lat: 40.7484474,
        lng: -73.9871516,
    };
};

module.exports = getCoordsForAddress;

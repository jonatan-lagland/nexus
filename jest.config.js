module.exports = {
    moduleNameMapper: {
        // ... @ path has to be manually configured with Jest
        "^@data/(.*)$": "<rootDir>/data/$1",
    },
};

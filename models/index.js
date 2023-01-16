const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./mysql";

const models = {
    usersModel: require(`${pathModels}/users`),
    clientsModel: require(`${pathModels}/clients`),
    EventsModel: require(`${pathModels}/Evento`),
    tracksModel: require(`${pathModels}/tracks`),
    storageModel: require(`${pathModels}/storage`),
}

module.exports = models;
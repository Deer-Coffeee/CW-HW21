import {launchServer} from "./src/timeControlServer.js";
console.log("MONGO_URL:", process.env.MONGO_URL);

launchServer();
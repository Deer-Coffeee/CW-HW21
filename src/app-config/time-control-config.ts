import confJson from '../../config/time-control-config.json' with {type:'json'}

import dotenv from "dotenv";
dotenv.config();

import {AccountingService} from "../services/AccountingService/AccountingService.js";
import {AccountingServiceMongoImpl} from "../services/AccountingService/AccountingServiceMongoImpl.js";


export interface AppConfig {
    port:number,
    skipPaths:string[],
    mongo_key:string,
    jwt:{
        secret:string,
        exp_time:string|number
    },
    accountingService: AccountingService

}

dotenv.config()
export const configuration:AppConfig = {
    ...confJson,

//=======here my.env=======\\
// mongo_key: process.env.MONGO_URL || '', <--------.env(delete)

    jwt:{
        secret: process.env.SECRET_JWT!,
        exp_time:60
    },
    accountingService: new AccountingServiceMongoImpl()
}
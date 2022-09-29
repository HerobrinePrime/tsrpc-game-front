import { WsClient } from "tsrpc-browser"
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto";

const getClient = (): WsClient<ServiceType> => {
    const client = new WsClient(serviceProto, {
        server: "ws://150.158.27.47:3000",
        // server: "ws://127.0.0.1:3000",
        json: true,
        // logger: console
    })

    return client
}

const connect = async (client: WsClient<ServiceType>): Promise<number> => {
    const v = await client.connect()
    if (!v.isSucc) {
        alert("= Client Connect Error =\n" + v.errMsg);
        return 0
    }
    console.log("Success");

    return 1
}

const join = async (client: WsClient<ServiceType>): Promise<string> => {
    const a = await client.callApi('Join', {})
    return a.res?.playerId as string
}

export {
    getClient,
    connect,
    join,
}
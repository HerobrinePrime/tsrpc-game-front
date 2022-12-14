import { ServiceType } from './../shared/protocols/serviceProto';
import { WsClient } from 'tsrpc-browser';
import { useLoop } from 'lingo3d-vue'
import { Ref, watchEffect } from 'vue'

export default (playerId: string, foxRef: Ref, client: WsClient<ServiceType>) => {

    const sync = useLoop(() => {
        const fox = foxRef.value
        if (!fox) return

        console.log( fox.rotationX, fox.rotationY, fox.rotationZ);
        // console.log(fox)
        
        client.sendMsg('UpdateStatus', {
            playerId,
            x: fox.x,
            y: fox.y,
            z: fox.z,
            animation: fox.animation,
            rotationX: fox.rotationX,
            rotationY: fox.rotationY,
            rotationZ: fox.rotationZ,
        })
    })

}
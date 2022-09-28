<template>
  <World>
    <Lingo3d version="1.34.4" />
    <Model :scale="300" src="/models/Grassland.glb" physics="map" name="map">
      <Find name="road" physics="map"></Find>
    </Model>

    <ThirdPersonCamera
      active
      mouseControl="drag"
      lockTargetRotation="dynamic-lock"
      enableDamping
      :inner-x="65"
      :inner-y="70"
      :inner-z="250"
      :inner-rotation-x="-5"
      :inner-rotation-y="3.5"
    >
      <Dummy
        ref="foxRef"
        src="/models/Fox.fbx"
        :animations="{
          idle: '/models/Idle.fbx',
          running: '/models/Walking.fbx',
        }"
        :y="-968.56"
        strideMode="free"
        strideMove
        physics="character"
        :metalnessFactor="-5"
      />
    </ThirdPersonCamera>

    <Dummy
        src="/models/Fox.fbx"
        :animations="{
          idle: '/models/Idle.fbx',
          running: '/models/Walking.fbx',
        }"
        :animation="player.animation"
        :x="player.x"
        :y="player.y"
        :z="player.z"
        :rotation-x="player.rotationX"
        :rotation-y="player.rotationY"
        :rotation-z="player.rotationZ"
        physics="character"
        :metalnessFactor="-5"
        v-for="(player) in thePlayers"
        :key="player.playerId"

       
      />

    <Setup skybox="/env/dreifaltigkeitsberg_4k.hdr" />
    <LingoEditor v-if="editorOn" />
  </World>
</template>

<script lang="ts" setup>
import {
  World,
  LingoEditor,
  Model,
  Setup,
  ThirdPersonCamera,
  Dummy,
  Find,
} from "lingo3d-vue";
import { ref, onMounted,reactive, computed } from "vue";

import playerSync from "./hooks/playerSync";
import keyActions from "./hooks/keyActions";
import { getClient, connect, join } from "./hooks/clientHandler";

const client = getClient();
const playerId = ref('');
const players = reactive(new Array<any>)

const foxRef = ref();

const inti = async (): Promise<void> => {
  const r = await connect(client);
  if (r === 1) {
    keyActions(foxRef);
    playerId.value = await join(client);
    playerSync(playerId.value, foxRef, client);
  }
};

const thePlayers = computed(()=>{
  return players.filter((ele)=>ele.playerId != playerId.value)
})

onMounted(() => {
  inti();
  client.listenMsg("Sync", (call) => {
    console.log(call.players);
    // call.players.forEach((ele: any,index:number)=> {
      
    //   // if(ele.playerId == playerId.value) return
    //   if(!players[index]) return players.push(ele)
    //   players[index] = ele
    // });
    call.players.forEach(playerState =>{
      const thePlayer =  players.find(renderedPlayer => renderedPlayer.playerId === playerState.playerId)
      //加入players
      if(!thePlayer){
        players.push(playerState)
      }
      //已有更新
      else{
        Object.assign(thePlayer,playerState)
      }
    })

    players.forEach((renderedPlayer,index,array) =>{
      if(call.players.findIndex(playerState => renderedPlayer.playerId === playerState.playerId) === -1){
        array.splice(index,1)
      }
    })
  });
});

const editorOn = ref(false);
</script>

<style lang="less" scoped></style>

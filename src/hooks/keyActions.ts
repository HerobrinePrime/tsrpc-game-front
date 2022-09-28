import {keyboard} from 'lingo3d-vue'
import {Ref} from 'vue'

export default (foxRef:Ref)=>{
    keyboard.onKeyPress = (_, keys) => {
        //   console.log(keys);
        
          const fox = foxRef.value;
          if (!fox) return;
        
          if (keys.has("w")) fox.strideForward = -5;
          else if (keys.has("s")) fox.strideForward = 5;
          else fox.strideForward = 0;
        
          if (keys.has("a")) fox.strideRight = 5;
          else if (keys.has("d")) fox.strideRight = -5;
          else fox.strideRight = 0;
        };
}
import { Ref } from 'vue';
export default (joyDisplay:Ref,fov:Ref)=>{
    if(window.innerWidth <= 992){
        joyDisplay.value = true
        fov.value = 100
    }
    else{
        joyDisplay.value = false
        fov.value = 75
    }

    window.addEventListener('resize',(e)=>{
        if(window.innerWidth <= 992){
            joyDisplay.value = true
            fov.value = 100
        } 
        else{
            joyDisplay.value = false
            fov.value = 75
        }
    })
}
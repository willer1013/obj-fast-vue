import { ref } from "vue";


const useState = (value)=>{
    let number=ref(value);
    const setNumber=(setValue)=>{
        number.value=setValue;
    }

    return [
        number,setNumber
    ]
}


export default useState;
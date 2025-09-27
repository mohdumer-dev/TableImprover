
export default function auLocal(localName,itemName,itemValue){

    const  oldLocal=JSON.parse(localStorage.getItem(localName))

    const newLocal={...oldLocal,[itemName]:itemValue}

    localStorage.setItem(localName,JSON.stringify(newLocal))
    
}
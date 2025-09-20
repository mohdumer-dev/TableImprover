export default function getData(localName,itemName){

    const  obj=JSON.parse(localStorage.getItem(localName))
    const data=obj[itemName]
    return data

}
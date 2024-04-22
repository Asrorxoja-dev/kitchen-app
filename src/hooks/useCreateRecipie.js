import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase/fireBaseConfig"
import {  useState } from "react"

function useCreateRecipie() {
    const [data, setData] = useState(null)

    const addNewDoc = async (recipie) =>{
        const docRef = await addDoc(collection(db, "recipies"), recipie)
        setData(docRef.id)
    } 
    
  return {data, addNewDoc}
}

export  {useCreateRecipie}
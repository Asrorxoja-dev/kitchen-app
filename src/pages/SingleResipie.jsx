import { useLoaderData } from "react-router-dom"
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/fireBaseConfig";

export const loader = async ({params}) =>{
  

  const docRef = doc(db, "recipies", params.id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log("No such document!");
  }

  return null;
}


function SingleResipie() {
  const data = useLoaderData();

 
  

  return (
    <div>
     {data && (
      <div className="object-cover rounded bg-slate-100  p-5 mb-10">
        <h1 className="text-4xl mb-5">Recipe elements</h1>
        <img src={data.image} alt="" className="w-full h-80 object-cover rounded mb-5" />
        <h1 className="text-4xl mb-5">{data.title}</h1>
        <h2 className="mb-5 text-2xl letter">Ingredients:{data.ingredients} {""}</h2>
        <h3 className="text-2xl mb-5">Cooking time: {data.cookingTime} minutes</h3>
        <h3 className="text-2xl mb-5">Method: {data.method}</h3>
        <Link className="bg-red-500 p-2  text-white flex justify-center mx-auto w-20 rounded px-4" to={'/'}>Back</Link>
      </div>
     )}
      
    </div>
  )
}

export default SingleResipie
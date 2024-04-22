import { Link } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase/fireBaseConfig"
import { useEffect } from "react"

function RecipiesList({recipes}) {
  useEffect(()=>{
    
  },[])
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
    {recipes.map((recipe) => (
      <div key={recipe.id} className="card w-100 bg-base-100 shadow-xl">
        <figure>
          <img
            src={recipe.image}
            className=":md-h-auto h-[200px] w-full object-cover"
            alt="food image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{recipe.title}</h2>
          <p className="line-clamp-3">{recipe.method}</p>
          <div className="card-actions mt-3">
            <Link
              to={`/singleResipie/${recipe.id}`}
              className="btn btn-primary w-full"
            >
              Read More
            </Link>

          
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default RecipiesList
import React, { useEffect, useState } from 'react'
import { Form, useActionData } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { useCreateRecipie } from '../hooks/useCreateRecipie';
import { useNavigate } from 'react-router-dom';

 export const action = async ({request}) =>{
  let formData = await request.formData();
  const title = formData.get("title")
const image = formData.get("image")
  const cookingTime = formData.get("cookingTime")
  const method = formData.get("method")

  return {title, image, cookingTime, method}
};



function Create() {
  const createAction = useActionData()
  const {data, addNewDoc} = useCreateRecipie()
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
const navigate = useNavigate()
  function addIngredients(e){
e.preventDefault();

if(!ingredients.includes(ingredient)){
setIngredients((prev)=>{
  return [...prev, ingredient]
})
}
setIngredient("")
  };

  useEffect(()=>{
    if(createAction && !data){
      const newRecipe={
        ...createAction,
        ingredients
      }
      addNewDoc(newRecipe);
    }

    if(data){
navigate("/")
    }
  },[createAction, data])

  return (
    <div className='grid place-items-center'>
<div className="max-w-96 w-full">
  <h1 className='text-3xl text-center font-bold'>Create New Recipe</h1>
  <Form method="POST">
<FormInput name="title" type="text" label="Title" />
<div className='flex items-center gap-5 '>

<label className="form-control w-full mb-3">
  <div className="label">
    <span className="label-text">Ingredient</span>
  </div>
  <input 
    onChange={(e) =>setIngredient(e.target.value) }
    type="text"
    name="ingredients"
    placeholder="Type here"
    className="input input-bordered w-full"
    value={ingredient}
  />
</label>

<button onClick={addIngredients} type='button' className='btn btn-secondary mt-6'>add</button>
</div>
<p className='mb-3 -mt-2'>
Ingredients: 
  {ingredients.map((ing)=>{
 return <span key="ing"> {ing}, </span>
  })}
</p>
<FormInput name="cookingTime" type="number" label="Cooking time"/>
<FormInput name="image" type="url" label="Image"/>
<FormInput name="method" type="text" label="Method"/>
<div className='mt-5'>
  <button className='btn btn-secondary w-full mb-3' type='submit'> Submit</button>
</div>
  </Form>
</div>
    </div>
  )
}

export default Create
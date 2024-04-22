import { Link } from "react-router-dom"

const links =[
    {
        id:1,
        text: "Home",
        link: "/"
    },
    {
        id:2,
        text:"About",
        link:"/about",
    },
    {
        id:3,
        text:"Contact",
        link:"/contact"
    },

    {
      id:4,
      text:"Create",
      link:"/create"
  }
]

function NavLinks() {
  return (
    <div>
    {links.map((link)=>{
       return <Link className="px-5 py-2 text-1xl font-semibold hover:bg-base-content hover:text-white rounded" key={link.id} to={link.link}>{link.text}</Link>
    })}
    </div>
  )
}

export default NavLinks
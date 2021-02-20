import React from "react"
import { Link } from "gatsby"
import { MinimalButton } from "../components/buttons"

const MainPage = () => {
  return (
    <div className="flex flex-col">
      <h1>Adam Dąbrowski</h1>
      <Link className="m-auto mt-8 text-center" to="/photography">
        <MinimalButton>Fotografia</MinimalButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/development">
        <MinimalButton>Development</MinimalButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/recommended">
        <MinimalButton>Polecane materiały</MinimalButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/blog">
        <MinimalButton>Blog</MinimalButton>
      </Link>
    </div>
  )
}
export default MainPage

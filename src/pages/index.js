import React from "react"
import { Link, graphql } from "gatsby"

const MainPage = () => {
  return (
    <div>
      <Link to="/photography">Fotografia</Link>
      <Link to="/development">Development</Link>
      <Link to="/recommended">Polecane materiały</Link>
    </div>
  )
}
export default MainPage

import React from "react"
import Layout from "../components/layout"
import { Link } from 'gatsby'; // Criando o componente <Link>

import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home</h1>
    <ul>
      <li>
        <Link to="/" activeStyle={{color: 'red'}}>Home</Link>
      </li>
      <li>
        <Link to="/about">About com componente link</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage

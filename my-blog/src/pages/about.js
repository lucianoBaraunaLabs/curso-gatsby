import React from 'react';
import { Link } from 'gatsby'; // Criando o componente <Link>

// Por convensão sempre que criamos uma página a sugestão é que tenha o nome Page no final.
const AboutPage = () => (
    <>
      <h1>Aboute Page</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about" activeStyle={{color: 'red'}}>About com componente link</Link>
        </li>
      </ul>
    </>
)

export default AboutPage;
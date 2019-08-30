# Anotações do curso


## Criando links
Uma tag `<a>` normal não possui os superpoderes da gatsby-link
```
    <a href="/about">About com link padrão</a>
```
É recomendado que você utilize o componente `Link` para conseguir
obter os comportamentos de uma singlePage e mais alguns steróides.

- `activeStyle` - Caso esteja nessa página ele estiliza o link

```
import { Link } from 'gatsby'; // Criando o componente <Link>
<Link to="/" activeStyle={{color: 'red'}}>Home</Link>

```
## Criando Páginas
Por convensão sempre que criamos uma página a sugestão é que tenha o nome Page no final.
```
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
```
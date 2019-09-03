# Anotações do curso

## Estrutura
- gatsby-config: é o arquivo responsável por configurar todos os plugins e dados
responsáveis para o gatsby.

- gatsby-browser: responsável por importar qualquer biblioteca que você use dentro do gatsyby. Ex: libs de modal, lazyload e etc..

- gatsby-node: serve para trabalhar com a API gatsby. Trabalhamos aqui com os dados que vão ser passados

- gatsby-ssr: responsável por implmentar o Server Side Render.

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

## Criando Querys
Para conseguirmos pegar as querys com `graphql` preisamos fazer os seguintes passos:

Importar o componente `StaticQuery` e `const graphql`. Em seguinda chamos o componente e passamos a query na prop e a render do componente.

```
import { StaticQuery, graphql } from 'gatsby';

<StaticQuery
    query={graphql`
      query MySiteMetadata {
        site {
          siteMetadata {
            title
            position
            description
          }
        }
      }
    `}
    render={data => (
      <div className="Profile-wrapper">
        <h1>{data.site.siteMetadata.title}</h1>
        <h2>{data.site.siteMetadata.position}</h2>
        <p>{data.site.siteMetadata.description}</p>
      </div>
    )}
  />

```
Para melhorar essa sintaxe no render nós podemos utilizar o destructring do ES6+
```
render={({
        site: {
          siteMetadata: {
            title,
            position,
            description
          }
        }
      }) => (
      <div className="Profile-wrapper">
        <h1>{title}</h1>
        <h2>{position}</h2>
        <p>{description}</p>
      </div>
    )}
```
Existe uma outra forma utilizando um Hook do react. Importamos `useStaticQuery` e
separamos os dados do render.

```
import { useStaticQuery, graphql } from "gatsby"

const Profile = () => {
  // O destructring abaixo é a grosso modo é isso aqui
  const { site } = useStaticQuery()
  const { siteMetadata } = site
  const { title, position, description } = siteMetadata
  // ----


  const { // Utilizando destructing do destructing rsrs
    site: {
      siteMetadata: { title, position, description },
    },
  } = useStaticQuery(graphql`
    query MySiteMetadata {
      site {
        siteMetadata {
          title
          position
          description
        }
      }
    }
  `)
  return (
    <div className="Profile-wrapper">
      <h1>{title}</h1>
      <h2>{position}</h2>
      <p>{description}</p>
    </div>
  )
}

```

## Importando imagens
Quando utilizamos imagens precisamos realizar o import de `gatsby-image` e passar
as configurações para a imagem que queremos apartir da query.

As configurações como tipo de imagem `fixed` ou `fluid` e tipo de carregamento. Devem
ser passadas nas configurações do plugin `Sharp`.

**Essas configurações estão na documentação do gatsby-image`**

```
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Avatar = () => {
  const { avatarImage } = useStaticQuery(
    graphql`
      query{
        avatarImage: file(relativePath: { eq: "profile-photo.png" }) {
          childImageSharp {
            fixed(width: 60, height: 60) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  );

  return <Img fixed={avatarImage.childImageSharp.fixed} />
};
```
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

## Styled Components

Para instalar styled basta fazer as seguintes configurações:

```
yarn add styled-components gatsby-plugin-styled-components

```

Assim instalamos e ligamos o styled ao gatsby e em seguida ligamos
o plugin no arquivo `gatsby-config`.

### Usando o cssmodules

Agora precisamos importar o `styled` e seguida criamos os componentes que receberam os estilos. Repare que logo depois de `styled.` vem o nome de uma tag
`html` é com esse nome que a lib cria a tag que recebe o estilo.

```

import styled from 'styled-components';

const LayoutWrapper = styled.section`
  display: flex;
`

const LayoutMain = styled.main`
  background: #16202c;
  min-height: 100vh;
  padding: 0 3.75rem 0 20rem;
  width: 100%;
`
```

### Criando estilos globais.

Precisamos realizar o importe no arquivo escolhido que nesse caso é o global.js
e em seguida colocamos o estilo dentro do template literals `createGlobalStyle`

```
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  ... estilos aqui dentro
`
export default GlobalStyles
```

Para importamos o estilo global precisamos realizar o `import` e chamamos o componente dentro do componente principal.

```

import GlobalStyles from '../../styles/global';

const Layout = ({ children }) => {

  return (
    <LayoutWrapper>
      <GlobalStyles />
      <aside>
        <Profile />
      </aside>
      <LayoutMain>{children}</LayoutMain>

    </LayoutWrapper>
  )
}
```

### Organizando os estilos

Para melhorar podemos organizar os estilos em um arquivo, realizar o `export` e
criar um `import` customizado com uma fácil nomenclatura para identificar que esse componente é um estilo.

```
// arquivo styled


import styled from 'styled-components';

export const LayoutWrapper = styled.section`
  display: flex;
`

export const LayoutMain = styled.main`
  background: #16202c;
  min-height: 100vh;
  padding: 0 3.75rem 0 20rem;
  width: 100%;
`

// arquivo do componente
import * as S from "./styled"

const Layout = ({ children }) => {
  return (
    <S.LayoutWrapper>
      <GlobalStyles />
      <aside>
        <Profile />
      </aside>
      <S.LayoutMain>{children}</S.LayoutMain>

    </S.LayoutWrapper>
  )
}
```

O styled components também dá a opção de customizar o componente react importado de outra lib
sem ter a necessidade de criar um elemento que envolva ele.

```
// styled.js
import styled from 'styled-components';
import Img from "gatsby-image"

export const AvatarWrapper = styled(Img)`
  border-radius: 50%;
  height: 3.75rem;
  margin: auto;
  width: 3.75rem;
`

// index.js

import * as S from './styled';


const Avatar = () => {
  ...
  return <S.AvatarWrapper fixed = {
    avatarImage.childImageSharp.fixed
  }
  />
};

export default Avatar;
```

### Usando ícones

O styled componentes tem uma outro módulo que podemos utilizar para carregar os ícones. Esse módulo
tem acesso a diversas libs de ícones. O comonando para instalar é: yarn add styled-icons`

## Organizando conteúdo

Para organizar o conteúdo de um componente o autor constuma criar um arquivo `content.js` onde nele
está o conteúdo desse componente.

## Deixando estilos dinâmicos.

O styled components permite o dinamismo das propriedades css por meio
de props

Aqui temos acesso a proriedade

```
// arquivo do componente
<S.PostItemTag background="#cdcdcd">Misc</S.PostItemTag>

// arquivo styled
export const PostItemTag = styled.div`
  align-items: center;
  background: ${props => props.background};
```

## Criando posts

Utilizamos o plugin `gatsby-transformer-remark` para ler os nossos post escritos em markdown.

Para isso preciamos instalar ele através do `npm` e configurar no `gatsby-config`

### Consumindo a base e apresentando

Consumimos o conteúdo importando o módulo necessário

No código abaixo estamos importando os posts que estão como markdown e apresentamos no front.

```

import { useStaticQuery, graphql } from "gatsby" // importando os módulos

// Criando a query
const { allMarkdownRemark } = useStaticQuery(graphql`
    query PostList {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              background
              category
              date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
              description
              title
            }
            wordCount {
              words
            }
          }
        }
      }
    }
  `)

// Iterando
const postList = allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" />
      // Realizado o destructing para evitar escrever todo o caminho das propriedades no map
      {postList.map(
        ({
          node: {
            frontmatter: { background, category, date, description, title },
            timeToRead,
          },
        }) => (
          <PostItem
            background={background}
            slug="/about/"
            category={category}
            date={date}
            timeToRead={timeToRead}
            title={title}
            description={description}
          />
        )
      )}
    </Layout>
  )
```

### Adcionando slugs
Como não temos esse dado novo nós precisamos utilizar a API node do gatsby.
Essa api serve para criar, manipular e etc todos os novos dados gerados mais específicos.

Para esse processo precisamos utilizar `gatsby-source-filesystem` e método `onCreateNode` que é executado toda vez quando é criado um novo arquivo.

```
// gatsby-node.js

// You can delete this file if you're not using it

const { createFilePath } = require(`gatsby-source-filesystem`)

// To add the slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(12)}`,
    })
  }
}
```

### Criando páginas
Para criarmos as páginas nós precisamos utilizar o método da api node chamado `createPages`. O método é assíncrono e quando terminamos de pegar os dados com o
graphql nós utilizamos o método `createPages` para criar.

```
// arquivo gatsby-node.js

exports.createPages = ({ graphql, actions}) => {
  const {createPages } = actions

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPages({
        path: node.fields.slug,
        // Passando um componente que é um template
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          slug: node.fields.slug // passando dados para o componente
        }
      })
    })
  })
}
```


### Pesquisando post específicos no graphql

Quando quisermos criar uma query com valores dinâmicos devemos utilizar a
seguinte sintaxe `$slug: String!` passando logo após o nome da `query` e devemos
sempre passar o tipo do valor que está entrando pois o grapql é fortemente tipado.

Agora vamos buscar o conteúdo específico de cada post para passarmos o dado para o template e para isso criamos a seguinte query:

```
// Quando quisermos criar uma query com valores dinâmicos devemos utilizar a
// seguinte sintaxe $slug: String! passando logo após o nome da query e devemos
// sempre passar o tipo do valor que está entrando pois o grapql é fortemente tipado

query Post($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
    }
    html
  }
}
```
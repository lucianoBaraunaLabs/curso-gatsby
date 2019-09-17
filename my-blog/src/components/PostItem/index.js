import React from "react"

import * as S from "./styled"

const PostItem = () => (
  <S.PostItemLink to="/slug/">
    <S.PostItemWrapper>
      <S.PostItemTag background="red">Misc</S.PostItemTag>
      <S.PostItemInfo>
        <S.PostItemDate>15 de Junho de 1988 - 4 min de leitura</S.PostItemDate>
        <S.PostItemTitle>Olá eu sou o goku</S.PostItemTitle>
        <S.PostItemDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ad
          tempore modi, veniam repellat iusto. Vero itaque officiis quaerat
          doloremque in ducimus, et est iusto, inventore incidunt, veniam
          laborum. Veniam.
        </S.PostItemDescription>
      </S.PostItemInfo>
    </S.PostItemWrapper>
  </S.PostItemLink>
)

export default PostItem

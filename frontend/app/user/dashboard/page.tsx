"use client"

export default function UserDashboard() {
  return (
    <>
      <h1>Página de visão geral do usuario</h1>
      <p>Essa pagina terá as rotas GET /users/:id, onde o id virá do token</p>
      <p>haverá um forms para cadastro de novas férias</p>
      <p>caso haja férias cadastradas os dados serão exibidos numa tabela, que terá botões para editar/excluir/expandir</p>
      <p>cada botão clicado fará uma requisição diferente a api</p>
      <p>essa rota será autenticada onde apenas o token de rh/usuário pode acessar</p>
    </>
  )
}

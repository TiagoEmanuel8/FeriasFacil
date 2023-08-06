"use client"

export default function AdminDashboard() {
  return (
    <>
      <h1>Página de visão geral do adm</h1>
      <p>Essa pagina terá as rotas GET /users,</p>
      <p>espalhará os dados numa tabela, que terá botões para editar/excluir/expandir</p>
      <p>cada botão clicado fará uma requisição diferente a api</p>
      <p>essa rota será autenticada onde apenas o token de rh pode acessar</p>
    </>
  )
}

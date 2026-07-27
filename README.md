# React People Table (Advanced)

Aplicação de gerenciamento e visualização de pessoas utilizando React e TypeScript. Permite filtrar e ordenar dados através de parâmetros da URL, mantendo o estado da tabela compartilhável.

## Demo

[Demo](https://Igor-hrm.github.io/react_people-table-advanced/)

## Funcionalidades

- Listagem de pessoas consumindo uma API REST
- Busca por nome, nome do pai e nome da mãe
- Filtro de pesquisa ignorando letras maiúsculas e minúsculas
- Filtro por séculos
- Ordenação por:
  - Nome
  - Sexo
  - Ano de nascimento
  - Ano de falecimento
- Ordenação crescente e decrescente
- Remoção da ordenação ao clicar novamente
- Persistência de filtros e ordenação através da URL
- Manutenção dos parâmetros durante a navegação
- Destaque da pessoa selecionada
- Estados de carregamento e tratamento de erros

## Detalhes técnicos

- Gerenciamento de estado com React Hooks
- Uso de `useSearchParams` para controle dos filtros pela URL
- Rotas dinâmicas utilizando React Router
- Busca e manipulação de dados de API
- Ordenação e filtragem utilizando métodos nativos do JavaScript
- Tipagem com TypeScript
- Organização de componentes reutilizáveis

## Tecnologias

- React
- TypeScript
- React Router
- REST API
- Bulma CSS
- SCSS
- Vite

# Projeto de Automação de Busca de Carros - Nettiauto

Este projeto automatiza a busca de carros para compra no site [Nettiauto](https://www.nettiauto.com/) na Finlândia.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run start`

Inicia a aplicação em modo de produção.\
A ferramenta acessará o Nettiauto, realizará buscas conforme os filtros configurados e exibíra os resultados.

### `npm run build`

Gera a versão otimizida da aplicação para produção.\
A versão final será salva na pasta `build`, pronta para ser implantada.

### `npm run dev`

Inicia a aplicação em modo de desenvolvimento.\
A ferramenta acessará o Nettiauto, realizará buscas conforme os filtros configurados e exibíra os resultados.

### `npm run test`

Executa os testes automatizados para garantir a corretude da automação.\
Mais informações sobre testes podem ser encontradas na seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests).

## Como Funciona

O projeto utiliza automação via web scraping para coletar informações de carros anunciados no Nettiauto, aplicando filtros personalizados, como:
- Modelo e marca do carro
- Ano de fabricação
- Faixa de preço
- Quilometragem

### Features

- Autenticação JWT com Next-Auth.js
- Lista de Todos os Carros do Sistema

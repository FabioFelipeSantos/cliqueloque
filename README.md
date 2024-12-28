# Teste Fullstack Clique Loque

## Instalação e execução

Para iniciar o app desenvolvido alguns passos deverão ser executados:

1. Via prompt, acesse a pasta `/server` e execute

```bash
npm run dev
```

para executar o servidor via `tsx`. O mesmo irá ser executado na rota [http://localhost:3333](http://localhost:3333). Não há transpilação para JavaScript disponível.

2. Retornando à pasta raiz do projeto, acesse a pasta `/cliqueloque-app` para inicializar o front, via comando:

```bash
npm run dev
```

O front será executado na porta padrão do Vite, [http://localhost:5173](http://localhost:5173)

Após execução dos dois comandos o app deverá ser funcional para navegação via o último link, enquanto requisições poderão ser feitas pelo primeiro link.

## Servidor - API

A API foi criada utilizando as tecnologias **Fastify** para criação de rotas e a ORM **Prisma** para controle e acesso ao banco de dados. A estrutura do servidor é a seguinte:

```text
server
    |-- prisma
    |-- src
        |-- application
            |-- commands
        |-- database
        |-- domain
            |-- entities
            |-- value-objects
        |-- infrastructure
            |-- repositories
        |-- interfaces
            |-- controllers
        |-- utils
        |-- server.ts
    |-- temp
        |-- uploads

```

Foi-se utilizado por padrão o pattern DDD para criação da API, dessa forma, as pastas representam o corpo da idealização do que seria o negócio da API do Clique Loque. Algumas considerações:

-   A pasta `/prisma` contém o schema utilizado para o banco de dados.
-   A pasta `/src` contém toda a implementação da API. Foi-se utilizado como inspiração o design pattern DDD, porém, alterações pequenas foram construídas para adaptação do projeto. Dessa forma, foram criadas as seguintes estruturas:
    -   `/application`: representa os _casos de uso do sistema_, orquestrando as interações entre o domínio e a infraestrutura da API. Nessa pasta temos `/commands` que define as ações que a API pode executar. **OBS.:** _aqui foram, de forma premeditada, implementadas as regras básicas de negócio. Isso não é o padrão no DDD, onde as regras de negócio deverão pertencer ao Domain, porém, fez-se dessa forma para ganhar tempo durante a implementação._;
    -   `/database`: contém o arquivo base para utilização do Prisma, com a instância do `prisma client`;
    -   `/domain`: o coração da api. Aqui são implementadas as entidades e valores do negócio, bem como toda a restrição aos valores de suas propriedades. Foram utilizadas as seguintes premissas:
        -   Como entidades temos a _company_ representando a empresa e _contract_ representando o contrato dessa empresa com algum fornecedor. Esses são valores não mutáveis, já que uma vez criados, mesmo que suas propriedades sejam alteradas, eles continuarão sendo as mesmas entidades.
        -   Como objeto de valores (_value-objects_) temos o _contractInfo_ representando as informações de um determinado contrato e _receiptNote_ representando as notas fiscais anexadas a um detalhamento fiscal do contrato. Esses são valores mutáveis, já que as suas propriedades os definem, sendo únicos com aquelas propriedades definidas.
    -   `/infrastructure`: implementa os detalhes técnicos do sistema, fazendo com que todo o sistema seja agnóstico de banco de dados ou tecnologias que conversam com o banco. Na pasta `/repositories` temos então a criação das persistências de dados no banco, utilizando o Prisma e sua sintaxe. Aqui é onde a troca de tecnologia é possível, sem alteração das outras camadas do DDD, sendo único o local de troca de tecnologia.
    -   `/interfaces`: define como o sistema se comunica com o externo, definindo os controladores ou endpoits REST. Na pasta `/controllers` temos a utilização massiva do Fastify para criação e gerenciamento das rotas de contato com a API. Estão implementados as seguintes funcionalidades:
        -   _COMPANY_ - Através da rota [http://localhost:333/companies](http://localhost:333/companies) temos os métodos:
            -   **post**: criação de empresas no endpoint `/`;
            -   **get**: retorna todas as empresas no endpoint `/`;
            -   **get**: retorna uma única empresa pelo seu `id` no banco de dados pelo endpoint `/:id`;
            -   **get**: retorna uma única empresa pelo seu `cnpj` no endpoint `/:cnpj`.
        -   _CONTRACT_ - Através da rota [http://localhost:333/contracts](http://localhost:333/contracts) temos os métodos:
            -   **post**: criação de contratos no endpoint `/`;
            -   **get**: retorna todos os contratos de uma empresa pelo endpoint `/:companyId`. O `companyId` é o `id` da empresa no banco de dados;
            -   **get**: retorna um único contrato pelo seu `id` no banco de dados via endpoint `/contract/:contractId`.
        -   _CONTRACT-INFO_ - Através da rota [http://localhost:333/contract-infos](http://localhost:333/contract-infos) temos os métodos:
            -   **post**: criação das informações dos contratos no endpoint `/`;
            -   **get**: retorna somente as informações de um contrato (sem os comprovantes) via endpoint `/just-contract/:contractInfoId`. O `contractInfoId` é o `id` do contrato no banco de dados;
            -   **get**: retorna as informações de um contrato com os comprovantes (se existirem) via endpoint `/contract-info-plus-receipt-notes/:contractId`. O `contractInfoId` é o `id` do contrato no banco de dados.
        -   _RECEIPT-NOTES_ - Através da rota [http://localhost:333/uploads](http://localhost:333/uploads) temos os métodos:
            -   **post**: criação dos arquivos subidos como comprovante de nota fiscal para determinado contrato, via endpoint `/:contractInfoId`;
            -   **delete**: deleta uma única entrada de comprovantes de nota fiscal via endpoint `/:receiptNoteId`;
            -   **get**: retorna um único contrato pelo seu `id` no banco de dados via endpoint `/download/:receiptNoteId`.
    -   `/utils`: contém funções que auxiliam, em algum momento, as outras implementações citadas.
    -   `/server.ts`: implementação da rota do servidor para a camada externa, utilizando o Fastify para criação e gerenciamento do que ele chama de _plugins_, que são as implementações dos controllers comentados anteriormente.
-   A pasta `/temp/uploads` é o diretório para upload dos arquivos feito pelo frontend, que deverá ser uma pasta no servidor hospedado para uploads.

### Considerações sobre a API e a implementação (visão do candidato)

-   Como foi meu primeiro contato com o pattern DDD, sei que posso ter cometido equívocos, porém, dentro da minha pesquisa e estudo fiz tudo que absorvi de conhecimento durante o momento. Usei do livre arbítrio para construção da nomenclatura de pastas e arquivos, no entanto, espero que a aplicação não tenha violado os princípios básicos do DDD, principalmente o de se colocar o domínio do problema como foco do desenvolvimento.
-   Nem todas as rotas criadas são utilizadas pelo frontend, porém julgo que as implementadas contemplam o uso mais simples possível de uma API, que permite um CRUD básico. Aqui, a falta de um conhecimento mais profundo do negócio prejudicou de forma leve a boa implementação das regras de negócio.
-   Não foi-se utilizado de validações por meio de packages externos para criação e gerenciamento das rotas (a exemplo _Zod_ ou _Yup_). Sei que isso é extremamente necessário e sou capaz de criá-las. Porém, devido ao tempo mais escasso por causa dos feriados e outros problemas pontuais, criei as validações necessárias das propriedades de cada entidade ou objeto de valor via Typescript, no ambiente de desenvolvimento. Vejo que somente essa abordagem é superficial, já que o Typescript não valida as regras mais importantes do negócio. Em contra-partida, afirmo que na aplicação (mais específico `/application/commands`) temos algumas regras de negócios implementadas, mas de forma mais simplista, para demonstrar o conhecimento do autor.

### Implementações Futuras (visão do candidato)

Como sugestão deixo as seguintes implementações que deveriam ser feitas:

-   Criação da validação das regras de negócio;
-   Utilização de um banco de dados relacional stateless, como o MySQL ou PostGreSQL;
-   Movimentação das regras de negócio do domínio da aplicação para o domínio principal, na criação das entidades;
-   Utilização do Docker para conteinerização do ambiente e futura hospedagem da imagem da aplicação na nuvem.

## Frontend

Para o frontend foram utilizadas as seguintes tecnologias:

-   **Typescript**: superset do JavaScript que permite ao Javascript se tornar fortemente tipada, permitindo melhor implementação e menos erro de desenvolvimento;
-   **React**: criação do SPA que expõe a API do clique loque. Utilizou-se o _component pattern_ para criação das SPA;
-   **Styled-components**: biblioteca para gerenciamentos da estilização de componentes React;
-   **TailwindCSS**: biblioteca que permite a aplicação de classes diretamente à tag do JSX criado com o React, no nosso caso. Essas classes permitem a estilização inline das tags, tornando a leitura da estilização mais direta e dentro do componente;
-   **Shadcn**: biblioteca de componentes prontos para React, completamente agnóstica de estilização;
-   **React Router DOM**: biblioteca para gerenciamento de rotas em SPAs criadas com o React;
-   **React Hook Form**: biblioteca para gerenciamento de formulários no React.

### Telas

#### Tela de Login

Para utilizar a aplicação, primeiro se faz necessária a validação de um CNPJ cadastrada na empresa. Temos as seguintes características:

-   A validação do CNPJ foi implementada no banco de dados via arquivo `/server/src/utils/isValidCnpj.ts`. Portanto, não somente verifica-se se um CNPJ está cadastrado, como também verifica-se se o mesmo é válido. Não se utilizou de bibliotecas externas já que a implementação do mesmo é simples, e assim, evita-se a utilização massiva de pacotes externos, prejudicando o desempenho do sistema.
-   Verifica-se se o CNPJ está cadastrado;
-   Retorna, visualmente, para o usuário algum erro cometido.

Recomendo fazer os seguintes testes:

-   utilizar um CNPJ inválido primeiro;
-   utilizar um CNPJ válido, mas não cadastrado. Por exemplo, o da Google Brasil Internet Ltda, `06.990.590/0001-23`;
-   utilizar um dos 4 CNPJs cadastrados no banco de dados:
    -   `17.070.407/0001-98` - 4 contratos já cadastrados, 1 já com informações adicionadas;
    -   `16.604.333/0002-40` - 2 contratos já cadastrados;
    -   `20.643.130/0003-11` - nenhum contrato cadastrado;
    -   `31.475.866/0002-63` - 3 contratos já cadastrados;

#### Tela de Contratos Vinculados

Nessa tela temos a apresentação de todos os contratos (se existirem) de uma determinada empresa. As características são:

-   Contratos já encerrados com nota fiscal são apresentados mas não podem ser selecionados para edição, porém, pode-se ver todas as suas informações via clique no botão com o símbolo de uma lupa.
-   Contratos que não foram encerrados são apresentados e podem ser selecionados para adição das informações fiscais.

#### Tela de dados da nota fiscal

Aqui podemos adicionar todas as informações a respeito da nota fiscal de um contrato. Todos os campos, com exceção da _Retenção Técnica_ são editáveis. Considerações:

-   Todos os campos, com exceção das datas, foram criados com o atributo `type="text"`, pois a validação se tornou mais fácil com valores no tipo `string`. Porém, o número da nota está formato no tipo `Integer` e os valores no formato de moeda brasileira, com adição do símbolo "R$" e formatação com dois dígitos nos centavos. Toda a formatação dos campos foi feita pelo candidato, utilizando-se Regex e controle de inputs pelo usuário. Podem haver equívocos de formatação que o autor não previu.
-   Os inputs para data possuem o atributo `type="date"` para poder apresentar um calendário para escolha da data. Neste input há um erro no qual não consegui corrigir. Se o usuário quiser digitar a data, pelo menos no navegador testado (Edge), se ele começar pelo mês ou pelo dia, o ano não é implementado. Porém, se ele começar digitar pelo ano, depois mês e por fim dia (sistema pt-BR), aí sim ele consegue inserir uma data completa. Isso pode ser uma exceção ao tratamento que faço para se formatar os valores de moeda, porém não identifiquei como ocorre a formatação indevida, já que esses campos tem uma validação diferente. Logo, uma pesquisa mais a fundo sobre como o React Hook Form funciona deveria ser realizada para entender o que pode estar acontecendo no evento `ChangeEvent<HTMLInputElement>` desse campo.

**Obs**.: Por praticidade o formulário dessa tela não foi implementado com o Shadcn, já que sua implementação estava limitando a formatação dos valores nos inputs. Portanto, a decisão foi utilizar o hook `useController` do React Hook Form para criar os inputs controlados (valor setado com useState) e fazer a formação durante o disparo do evento. Assim, quando o evento era disparado, passa-se o valor por um filtro e depois por uma edição. Possivelmente, é nesse momento que a data seja corrompida, porém, isso é um desvio não identificado pelo autor.

### Considerações sobre o front e a implementação (visão do candidato)

-   Alguns componentes precisaram ficar com uma tarefa maior do que o indicado para um componente reutilizável, a exemplo o componente ModalContractInfo (`/cliqueloque-app/src/components/ModalContractInfo`), que no fim se parece mais com uma página do que um componente. Porém, no tempo utilizado, não vi forma melhor de alocar esse componente.
-   A página Contracts (`/cliqueloque-app/src/pages/Contracts`) está extremamente complexa do ponto de vista de controle de estado e tamanho de módulo. Aqui uma opção seria trocar o `useState` pelo `useReducer`, centralizando todos os estados do componente em uma única função que disponibilizaria os `dispatches` necessários para o controle do componente.
-   No meu ponto de vista, assim que a complexidade de um sistema aumenta e sua implementação se torna massiva do ponto de vista de componentes reutilizáveis e páginas disponíveis, a utilização e facilidade que o Shadcn e o TailwindCSS trazem começa a agregar uma fraqueza ao sistema, principalmente no sentido de controle dos componentes e da estilização. Nesse ponto, para mim, a utilização de ambos seria prejudicial a depender do tamanho que os componentes possam ter. A centralização da estilização inline prejudica a leitura e separação de funcionalidades dos componentes, já que se uma estilização em massa for utilizada, o atributo `className` passará a ser um emaranhado de classes (quase que em um estado aleatório), de difícil leitura e interpretação (ainda mais se uma mesma tool de formatação do tailwind não for utilizada por todos os desenvolvedores). Aqui, para mim, o Styled-components tem uma vantagem muito grande se comparada aos demais, principalmente pela separação de atribuição, e pelo controle rigoroso das estilizações dos componentes, mesmo que a curva de desenvolvimento aumente consideravelmente.
-   O uso abusivo do React Hook Form também pode ser prejudicial para o projeto como um todo, já que o controle é todo feito pela biblioteca e não pelos desenvolvedores. Apesar dessa biblioteca possuir hooks fenomenais para criação e manutenção de inputs, se um determinado input precisa ter regras mais rigorosas, que fogem do tradicional, registrar esses componentes dentro do react hook form pode se tornar um pesadelo a parte, como aconteceu com o componente InputForm (`/cliqueloque-app/src/components/InputForm`), que foi criado para a adição dos dados fiscais na tela de dados fiscais. Logo, a curva de utilização começa a ser muito ingrime, podendo prejudicar o desempenho do grupo.

### Implementações Futuras (visão do candidato)

-   Fazer a adição de uma página para mostrar somente os contratos que foram editados, retirando-os da página de contratos vinculados, separando assim a responsabilidade de cada página;
-   Refatorar a página Contracts para reduzir sua responsabilidade e controle de estados;
-   Refatorar a tela de login e retirar o Shadcn do formulário, deixando apenas o React Hook Form trabalhar;
-   Corrigir o input de datas na tela de dados fiscais;
-   Criar um componente somente para o logo do projeto, diminuindo a replicação de código;
-   Implementar um controlador externo de estado utilizando, por exemplo, o Redux. Principalmente para telas ou componentes que partilham o mesmo estado, e que precisam persistir o estado. Aqui, o importante é diminuir o _prop drilling_, sem substituir o `useContext`, mas sim, munindo-o com mais ferramentas para gerenciamento. Por exemplo, disparar ações para `createContext()` assim que uma requisição é lançada, e armazenar diferentes informações no contexto a depender do tipo de status da requisição;
-   Criar alguns componentes mais controlados pela equipe, como botões, por exemplo, retirando esses botões do Shadcn e dando mais controle e poder a eles;
-   Tornar o site responsivo;
-   Dockerizar o frontend.

## Considerações Finais

Certamente o código tem palco para evolução e uma manutenção mais criteriosa, porém, no tempo devido essas modificações podem ser realizadas. Espero ter atendido as principais especificações do projeto, sabendo que tem muitos pontos importantes a implementar.

Qualquer dúvida estou a disposição para contato.

Grato pela atenção.

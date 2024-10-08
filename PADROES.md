# Padronização do Desenvolvimento de Projetos

## Sumário

- [Introdução](#introdução)
- [Padrões de Mensagens de Commit](#padrões-de-mensagens-de-commit)
  - [Prefixos Permitidos](#commit---prefixos-permitidos)
  - [Formato da Mensagem de Commit](#commit---formato-da-mensagem)
  - [Exemplos](#commit---exemplos)
- [Padrões de Branches](#padrões-de-branches)
  - [Prefixos Permitidos](#branch---prefixos-permitidos)
  - [Formato do Nome da Branch](#branch---formato-do-nome)
  - [Exceções](#branch---exceções)
- [Versionamento Semântico](#versionamento-semântico)
  - [Estrutura da Versão](#estrutura-da-versão)
  - [Quando Incrementar](#quando-incrementar)
  - [Git Tags](#git-tags)
- [Pull Requests](#pull-requests)
  - [Criação do Pull Request](#pull-request---criação)
  - [Modelo de Pull Request](#pull-request---modelo)
  - [Revisão do Pull Request](#pull-request---revisão)

## Introdução

Para manter a consistência e a clareza no nosso fluxo de desenvolvimento, é essencial seguir padrões estabelecidos para mensagens de commit, criação de branches, versionamento e pull requests. Esta documentação fornece diretrizes sobre como executar.

## Padrões de Mensagens de Commit

### Commit - Prefixos Permitidos

As mensagens de commit devem começar com um dos seguintes prefixos:

- `chore`
- `feat`
- `fix`
- `refactor`
- `docs`
- `perf`
- `style`
- `test`
- `build`
- `ci`
- `env`

### Commit - Formato da Mensagem

As mensagens de commit devem seguir o seguinte formato:

```bash
PREFIXO: Descrição
```

- `PREFIXO`: Um dos prefixos permitidos listados acima.
- `Descrição`: Uma descrição curta e significativa da mudança, começando com letra minúscula.

### Commit - Exemplos

- `feat: adicionar cadastro de usuário`
- `fix: corrigir problema de login`
- `refactor: melhorar estrutura do código de autenticação`
- `docs: atualizar documentação da API de usuários`

## Padrões de Branches

### Branch - Prefixos Permitidos

As branches devem começar com um dos seguintes prefixos:

- `feature`: Para novas funcionalidades.
- `fix`: Para correções de bugs.
- `hotfix`: Para correções urgentes.
- `style`: Para mudanças que não afetam a lógica do código (formatação, espaços em branco, etc).
- `refactor`: Para mudanças que melhoram a estrutura do código sem alterar a funcionalidade.
- `test`: Para adição ou modificação de testes.
- `chore`: Para tarefas de manutenção que não alteram o código de produção (atualizações de dependências, configurações, etc).
- `docs`: Para alterações na documentação.

### Branch - Formato do Nome

As branches devem seguir o seguinte formato:

```text
PREFIXO/TASK-NOME-DA-TAREFA
```

- `PREFIXO`: Um dos prefixos permitidos listados acima.
- `TASK`: Um identificador numérico único para a tarefa (pode ser o ID da tarefa no sistema de gerenciamento de projetos).
- `NOME-DA-TAREFA`: Uma descrição curta e significativa da tarefa, utilizando hífens para separar as palavras.

Para corrigir execute o comando:

```bash
git branch -m novo-nome-da-branch
```

#### Branch - Exemplos

- `feature/1234-cadastro-usuario`
- `fix/5678-correcao-login`
- `hotfix/91011-erro-critico-autenticacao`

### Branch - Exceções

As seguintes branches são exceções e não precisam seguir o formato padrão:

- `main`
- `develop`
- `hmg`

## Versionamento Semântico

Utilizamos o Versionamento Semântico (SemVer) para controlar as versões do nosso software.

### Estrutura da Versão

O número da versão segue o formato MAJOR.MINOR.PATCH, onde:

- MAJOR: Versão principal, incrementada quando há mudanças incompatíveis com versões anteriores.
- MINOR: Versão menor, incrementada quando há adição de funcionalidades compatíveis com versões anteriores.
- PATCH: Versão de correção, incrementada quando há correções de bugs compatíveis com versões anteriores.

### Quando Incrementar

- MAJOR: Quando fazemos mudanças incompatíveis na API.
- MINOR: Quando adicionamos funcionalidades mantendo compatibilidade.
- PATCH: Quando corrigimos bugs mantendo compatibilidade.

Exemplo: 1.5.2 -> 1.6.0 (nova funcionalidade adicionada)

### Git Tags

Usamos git tags para marcar pontos específicos na história do repositório como importantes, geralmente para marcar versões de lançamento.

#### Criando Tags

Para criar uma nova tag (sugerido realizar na branch main):

```bash
git tag -a v1.4.0 -m "Lançamento da versão 1.4.0"
```

#### Enviando Tags para o Repositório Remoto

Para enviar a tag para o repositório remoto:

```bash
git push origin v1.4.0
```

ou para enviar todas as tags:

```bash
git push origin --tags
```

Lembre-se de criar uma tag para cada nova versão lançada, seguindo o padrão de Versionamento Semântico.

## Pull Requests

### Pull Request - Criação

Ao criar um Pull Request (PR) no Azure DevOps, é importante fornecer informações claras e concisas para facilitar a revisão e aprovação. Siga as diretrizes abaixo para criar PRs eficientes.

### Pull Request - Modelo

#### Título

O título deve ser curto e objetivo, descrevendo de forma clara o que foi feito no PR. Isso ajuda os revisores a entender rapidamente o propósito das alterações propostas.

#### Pull Request - Exemplos

- "Adicionando funcionalidade de login"
- "Corrigindo bug na tela de cadastro"
- "Atualizando a versão do Angular"

#### Descrição

A descrição deve ser mais detalhada que o título e conter informações relevantes para que os revisores possam entender o contexto do PR. Inclua as seguintes informações:

1. **O que foi feito**: Descreva as alterações realizadas de forma clara e objetiva.
2. **Por que**: Explique o motivo das alterações propostas, mostrando a necessidade de realizar essas alterações.
3. **Como foi feito**: Descreva como as alterações foram realizadas, mostrando as decisões tomadas e as tecnologias utilizadas.
4. **Pull Requests relacionados**: Se aplicável, mencione outros PRs relacionados usando "!número_do_PR".
5. **Desenvolvedores envolvidos**: Mencione outros desenvolvedores envolvidos usando "@nome_do_desenvolvedor".
6. **Tarefas relacionadas**: Mencione tarefas do Azure DevOps relacionadas usando "#número_da_tarefa".

#### Dicas adicionais

- Use o botão "Add commit messages" para incluir automaticamente os commits relacionados ao PR.
  ![01_add_commit_messages.png](/.attachments/01_add_commit_messages-89a29501-f73a-477a-88f2-d8355f6e0c6d.png)
- Adicione imagens ou evidências clicando no ícone de clipe, se necessário para ilustrar as mudanças.
  ![02_add_evidencia_resolucao.png](/.attachments/02_add_evidencia_resolucao-cb9d287e-fd7b-4462-97a4-e4d483212c66.png)
- Para mencionar outros desenvolvedores, use "@" seguido do nome do desenvolvedor.
  ![03_related_devs.png](/.attachments/03_related_devs-c388e3be-a933-4662-b08e-ef5b1745b0bf.png)
- Para mencionar tarefas relacionadas, use "#" seguido do número da tarefa.
  ![04_related_tasks.png](/.attachments/04_related_tasks-c4051e2e-293e-47c6-a0d5-2a4a9d9d66f1.png)
- Para mencionar PRs relacionados, use "!" seguido do número do PR.
  ![05_related_prs.png](/.attachments/05_related_prs-83dcff98-1854-4f11-94fe-2b308e654484.png)

#### Modelo sugerido

```md
Título: [Breve descrição da alteração]

Descrição:

O que foi feito:
[Descreva as alterações realizadas]

Por que:
[Explique o motivo das alterações]

Como foi feito:
[Descreva como as alterações foram implementadas]

Pull Requests relacionados:
[Liste os PRs relacionados, se houver]

Desenvolvedores envolvidos:
[@mencione_outros_desenvolvedores]

Tarefas relacionadas:
[#número_da_tarefa]

[Adicione imagens ou evidências, se necessário]
```

### Pull Request - Revisão

Após a criação do PR, os revisores receberão uma notificação e poderão acessar a tela de revisão. Nesta tela, eles poderão:

1. Visualizar as alterações propostas
2. Fazer comentários sobre o código
3. Aprovar o PR ou solicitar alterações

Para acessar a tela de revisão:

- Clique no link do PR na notificação recebida, ou
- Acesse a aba "Pull Requests" no repositório do projeto

![06_revision_windown.png](/.attachments/06_revision_windown-7cb8361d-1055-4345-bbc3-5aec1fe98147.png)

- Os revisores podem deixar comentários gerais sobre o PR ou comentários específicos em linhas de código alteradas. É importante que a revisão seja construtiva e focada na melhoria do código e do projeto como um todo.

![07_comments_windown.png](/.attachments/07_comments_windown-0e49eaad-30bf-47dd-9232-9b147877e1e4.png)

Lembre-se de que uma boa prática é responder a todos os comentários dos revisores, seja implementando as sugestões ou explicando por que decidiu não fazê-lo. Isso ajuda a manter um diálogo construtivo e a melhorar a qualidade do código.

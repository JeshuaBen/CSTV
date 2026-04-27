# CSTV

Aplicativo mobile desenvolvido com Expo, React Native e TypeScript para exibir partidas, listar jogos e consultar detalhes de cada confronto.

O projeto foi organizado com uma arquitetura baseada em features, separando responsabilidades por domínio e mantendo componentes, chamadas de API, hooks, tipos e transformações de dados próximos da funcionalidade a que pertencem.

## Tecnologias

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind
- React Query
- FlashList
- Axios
- Zod
- date-fns

## Arquitetura Feature-Based

O projeto segue uma arquitetura Feature-Based. Isso significa que o código é organizado por funcionalidade, e não apenas por tipo de arquivo.

Essa abordagem facilita a manutenção porque tudo que pertence a um mesmo domínio fica próximo. No caso deste projeto, a principal feature é `matches`, responsável por listagem, detalhes, componentes e regras relacionadas a partidas.

```text
src
+-- config
+-- features
|   +-- matches
|       +-- api
|       +-- components
|       +-- hooks
|       +-- mappers
|       +-- screens
|       +-- types
+-- services
+-- shared
```

### `src/features`

Contém as funcionalidades principais do aplicativo.

Atualmente, a feature `matches` concentra a regra de negócio relacionada às partidas.

### `src/features/matches/api`

Camada responsável pelas chamadas para a API relacionadas a partidas.

Aqui ficam arquivos como:

- busca da lista de partidas;
- busca dos detalhes de uma partida;
- definição de endpoints.

### `src/features/matches/hooks`

Contém hooks específicos da feature.

Esses hooks encapsulam a lógica de consumo dos dados, normalmente usando React Query para lidar com cache, estados de carregamento, erro e atualização dos dados.

### `src/features/matches/mappers`

Responsável por transformar os dados recebidos da API em estruturas mais seguras e adequadas para uso na interface.

Essa camada ajuda a evitar que a UI dependa diretamente do formato bruto da API.

### `src/features/matches/screens`

Contém as telas da feature de partidas, como:

- tela de listagem de partidas;
- tela de detalhes da partida.

### `src/features/matches/components`

Componentes específicos da feature `matches`.

Esses componentes são usados apenas ou principalmente dentro do contexto de partidas, como cards de partida e cards de jogadores.

### `src/features/matches/types`

Tipagens relacionadas à feature de partidas.

Essa pasta ajuda a manter os contratos de dados centralizados e explícitos.

### `src/shared`

Contém código reutilizável entre diferentes partes da aplicação.

Exemplos:

- componentes compartilhados;
- utilitários;
- tema;
- integrações genéricas de bibliotecas.

### `src/services`

Camada de serviços da aplicação.

Atualmente, contém a configuração do cliente HTTP usado para comunicação com APIs externas.

### `app`

Contém as rotas da aplicação usando Expo Router.

Essa pasta define a navegação e os pontos de entrada das telas.

## Bibliotecas Instaladas

### FlashList

O projeto utiliza `@shopify/flash-list` para renderização performática de listas.

Ela é uma alternativa mais otimizada para cenários com listas maiores ou com muitos itens renderizados, ajudando a manter a rolagem mais fluida e reduzindo custos de renderização.

No contexto do CSTV, isso é útil para a listagem de partidas, onde a performance da tela impacta diretamente a experiência do usuário.

### React Query

O projeto utiliza `@tanstack/react-query` para gerenciamento de dados assíncronos.

Ela ajuda a lidar com:

- cache de dados;
- estados de loading;
- estados de erro;
- refetch;
- sincronização entre API e interface;
- redução de chamadas desnecessárias.

Com React Query, as telas não precisam controlar manualmente toda a lógica de busca e atualização dos dados, deixando o código mais previsível e mais fácil de manter.

### NativeWind

O projeto utiliza `nativewind` para estilização com classes no estilo Tailwind CSS.

Essa escolha facilita o desenvolvimento porque permite criar interfaces rapidamente, com estilos declarativos diretamente nos componentes.

Também ajuda a manter consistência visual entre telas e componentes, reduzindo a necessidade de criar muitos objetos de estilo manualmente.

## Pré-requisitos

Antes de rodar o projeto, é necessário ter instalado:

- Node.js
- npm
- Android Studio, caso deseje rodar no Android
- Xcode, caso deseje rodar no iOS
- Expo CLI, se preferir usar comandos globais do Expo

## Como Rodar o Projeto

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Rodar no Android:

```bash
npm run android
```

Rodar no iOS:

```bash
npm run ios
```

Rodar na Web:

```bash
npm run web
```

## Scripts Disponíveis

Inicia o projeto com Expo:

```bash
npm start
```

Executa o app no Android:

```bash
npm run android
```

Executa o app no iOS:

```bash
npm run ios
```

Executa o app na Web:

```bash
npm run web
```

Executa o ESLint:

```bash
npm run lint
```

Executa o ESLint aplicando correções automáticas:

```bash
npm run lint:fix
```

Executa a validação de tipos do TypeScript:

```bash
npm run typecheck
```

Formata os arquivos com Prettier:

```bash
npm run format
```

Verifica a formatação dos arquivos:

```bash
npm run format:check
```

## Gerar APK

Caso deseje, o projeto possui scripts para gerar um arquivo `.apk` Android.

Gerar APK de release:

```bash
npm run android:apk
```

Gerar APK de debug:

```bash
npm run android:apk:debug
```

Os arquivos gerados normalmente ficam dentro de:

```text
android/app/build/outputs/apk/
```

Antes de gerar o APK, é recomendado validar o projeto com:

```bash
npm run typecheck
npm run lint
```

## Variáveis de Ambiente

O projeto possui arquivo `.env` para configuração de variáveis de ambiente.

Caso novas variáveis sejam adicionadas, elas devem ser documentadas nesta seção para facilitar a configuração do ambiente local.

## Qualidade de Código

O projeto utiliza TypeScript, ESLint e Prettier para manter maior segurança, padronização e consistência no código.

Antes de abrir uma alteração ou gerar uma build, recomenda-se executar:

```bash
npm run typecheck
npm run lint
npm run format:check
```

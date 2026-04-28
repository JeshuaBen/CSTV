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
- Jest
- Jest Expo
- React Native Testing Library

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

### Jest

O projeto utiliza `jest` como ferramenta principal para execução dos testes unitários.

Ele permite validar componentes, hooks, helpers e telas de forma automatizada, ajudando a evitar regressões durante a evolução do projeto.

### Jest Expo

O projeto utiliza `jest-expo` para integrar o Jest ao ambiente Expo/React Native.

Essa biblioteca fornece o preset necessário para que os testes consigam interpretar corretamente arquivos e dependências comuns em projetos Expo.

### React Native Testing Library

O projeto utiliza `@testing-library/react-native` para testar componentes e telas com foco no comportamento esperado pelo usuário.

Ela também é usada nos testes de hooks, em conjunto com wrappers de providers, para validar fluxos que dependem de contexto, como React Query.

## Testes Unitários

Os testes unitários foram estruturados de forma modular, seguindo a mesma ideia da arquitetura Feature-Based do projeto.

Isso significa que os testes ficam próximos do código que eles validam, dentro de pastas `__tests__`. Essa organização facilita encontrar, manter e evoluir os testes junto com cada domínio da aplicação.

Exemplo da estrutura:

```text
src
+-- features
|   +-- matches
|       +-- hooks
|       |   +-- __tests__
|       +-- screens
|           +-- __tests__
+-- shared
|   +-- components
|       +-- Avatar
|       |   +-- __tests__
|       +-- Box
|       |   +-- __tests__
|       +-- Screen
|       |   +-- __tests__
|       +-- Teams
|       |   +-- __tests__
|       +-- Text
|           +-- __tests__
+-- test
```

### Cobertura

O projeto possui configuração de cobertura mínima global de `80%` no Jest.

Para gerar o relatório de cobertura:

```bash
npm run test:coverage
```

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

Configure o access token da PandaScore no arquivo `.env`:

```env
EXPO_PUBLIC_PANDA_SCORE_TOKEN=seu_token_da_pandascore
```

Para conseguir um token:

1. Acesse o dashboard da PandaScore.
2. Crie uma conta ou faça login.
3. Copie o access token disponível no dashboard.
4. Cole o valor no arquivo `.env`, usando exatamente o nome `EXPO_PUBLIC_PANDA_SCORE_TOKEN`.

Sem essa variável, o aplicativo não consegue autenticar as chamadas na API da PandaScore e os dados de partidas não serão carregados corretamente.

Inicia o projeto com Expo:

Utilize o executor do expo através do:

```bash
npx expo start
```

Esse comando abre o projeto pelo Expo Go. Ele é útil para desenvolvimento rápido, mas não reproduz fielmente a splash screen nativa configurada no `app.json`.

Para validar a splash screen correta durante o desenvolvimento local no Android, use a build nativa do projeto:

```bash
npm run android
```

## Scripts Disponíveis

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

Executa os testes unitários:

```bash
npm test
```

Executa os testes em modo watch:

```bash
npm run test:watch
```

Executa os testes com relatório de cobertura:

```bash
npm run test:coverage
```

## Gerar APK

Caso deseje, o projeto possui scripts para gerar um arquivo `.apk` Android.

Antes de gerar um APK após alterações de splash screen, ícone ou assets nativos, sincronize novamente o projeto Android:

```bash
npx expo prebuild --clean --platform android
```

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

### Splash Screen

A splash screen usa a logo Fuze centralizada com fundo `#161621` e permanece visível por pelo menos `1.5s` antes da tela de partidas ser renderizada.

Para validar a splash screen correta, rode o app nativo com `npm run android` ou gere e instale um APK/release. O Expo Go pode mostrar o ícone do app ou uma tela intermediária diferente da splash final configurada no projeto.

## Variáveis de Ambiente

O projeto possui arquivo `.env` para configuração de variáveis de ambiente.

Variável obrigatória:

```env
EXPO_PUBLIC_PANDA_SCORE_TOKEN=seu_token_da_pandascore
```

Esse token é usado para autenticar as requisições feitas para a PandaScore API.

Caso novas variáveis sejam adicionadas, elas devem ser documentadas nesta seção para facilitar a configuração do ambiente local.

## Qualidade de Código

O projeto utiliza TypeScript, ESLint e Prettier para manter maior segurança, padronização e consistência no código.

Antes de abrir uma alteração ou gerar uma build, recomenda-se executar:

```bash
npm run typecheck
npm run lint
npm test
npm run format:check
```

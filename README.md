# 🌟 XML to Flow

Bem-vindo ao **XML to Flow**! 🚀 Este é um projeto incrível que transforma arquivos XML em gráficos interativos e editáveis, tornando sua experiência muito mais visual e divertida! 😄

## ✨ Funcionalidades

- 📂 **Carregamento de arquivos XML:** Faça upload de arquivos XML e veja a mágica acontecer com uma validação rápida e segura. 🧙‍♂️
- 🎨 **Visualização interativa:** Explore nós e arestas organizados com suporte para zoom, minimapa e controles intuitivos. 🔍
- ✏️ **Manipulação de dados:** Edite os atributos e elementos diretamente nos nós de forma fácil e rápida. 🛠️
- ⬇️ **Exportação de XML:** Baixe o XML atualizado com todas as suas alterações. ✨
- 🔄 **Configuração dinâmica de layout:** Alterne entre layouts horizontais e verticais conforme sua preferência. 🧭

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/): Biblioteca JavaScript para criar interfaces incríveis. ⚛️
- [@xyflow/react](https://github.com/wbkd/react-flow): Ferramenta poderosa para fluxogramas. 💡
- [Dagre.js](https://github.com/dagrejs/dagre): Para organização perfeita dos gráficos. 🗺️
- [Sonner](https://github.com/salemalem/sonner): Biblioteca para exibir notificações super úteis. 🔔
- [Radix Icons](https://icons.radix-ui.com/): Ícones modernos para deixar tudo mais bonito. 🎨

## 📂 Estrutura do Projeto

### 📄 Principais Arquivos e Componentes

- **`App.tsx`**:
  - Lógica principal para carregar, validar e processar arquivos XML. 💡
  - Gerencia o estado dos nós e arestas do gráfico. 📊
  - Funções para manipulação e exportação de XML. 📤

- **`RelatorioNode.tsx`**:
  - Componente personalizado para renderização dos nós. 🖼️
  - Permite edição de atributos e elementos filhos diretamente nos nós. ✏️

- **`layout.tsx`**:
  - Define o layout raiz e as configurações de metadados do projeto. 🖥️

## 🚀 Como Executar

### Pré-requisitos

- Node.js (>= 14.x) 📦
- Gerenciador de pacotes npm ou yarn 🧰

### Passos

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou
   yarn start
   ```

4. Abra a aplicação em [http://localhost:3000](http://localhost:3000). 🌐

## 💡 Uso

1. 📂 Faça upload de um arquivo XML utilizando o botão de envio.
2. 🎯 Visualize e interaja com o gráfico de fluxo gerado.
3. ✏️ Edite atributos e elementos filhos diretamente nos nós.
4. ⬇️ Faça o download do XML atualizado com as alterações realizadas.

## ⚙️ Configurações

As seguintes configurações podem ser ajustadas no código:

- **📏 Tamanho do nó:**
  - Largura: `600px`
  - Altura: `50px`
- **📂 Limite de tamanho do arquivo:** `5MB`
- **📄 Tipos de arquivos suportados:** `.xml`
- **🔍 Zoom:**
  - Mínimo: `0.01`
  - Máximo: `1000`

## 📜 Licença

Este projeto é licenciado sob a [MIT License](LICENSE). 💼

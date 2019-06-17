# Index
* [1. How to Run](https://github.com/julietafrade97/feup-asso/blob/master/README.md#1-how-to-run)
* [2. Goals](https://github.com/julietafrade97/feup-asso/blob/master/README.md#2-goals)
* [3. Features](https://github.com/julietafrade97/feup-asso/blob/master/README.md#3-features)
  * [3.1 Install Task and Create Node](https://github.com/julietafrade97/feup-asso/blob/master/README.md#31-install-task-and-create-node)
  * [3.2 Add Edge and Delete Edge](https://github.com/julietafrade97/feup-asso/blob/master/README.md#32-add-edge-and-delete-edge)
  * [3.3 Load File and Execute](https://github.com/julietafrade97/feup-asso/blob/master/README.md#33-load-file-and-execute)
  * [3.4 Debug Mode](https://github.com/julietafrade97/feup-asso/blob/master/README.md#34-debug-mode)
  * [3.5 Change Input](https://github.com/julietafrade97/feup-asso/blob/master/README.md#35-change-input)
  * [3.6 Disable Node](https://github.com/julietafrade97/feup-asso/blob/master/README.md#36-disable-node)
  * [3.7 Save and Load Recipe](https://github.com/julietafrade97/feup-asso/blob/master/README.md#37-save-and-load-recipe)
* [4. Architecture](https://github.com/julietafrade97/feup-asso/blob/master/README.md#4-architecture)
  * [4.1 UML](https://github.com/julietafrade97/feup-asso/blob/master/README.md#41-uml)
  * [4.2 Pipes and Filters](https://github.com/julietafrade97/feup-asso/blob/master/README.md#42-pipes--filters)
  * [4.3 Design Patterns](https://github.com/julietafrade97/feup-asso/blob/master/README.md#43-design-patterns)
  * [4.3.1 Factory Method](https://github.com/julietafrade97/feup-asso/blob/master/README.md#431-factory-method)
    * [4.3.2 Module](https://github.com/julietafrade97/feup-asso/blob/master/README.md#432-module)
    * [4.3.3 Strategy](https://github.com/julietafrade97/feup-asso/blob/master/README.md#433-strategy)
    * [4.3.4 State](https://github.com/julietafrade97/feup-asso/blob/master/README.md#434-state)
    * [4.3.5 Decorator](https://github.com/julietafrade97/feup-asso/blob/master/README.md#435-decorator)
    * [4.3.6 Null Object](https://github.com/julietafrade97/feup-asso/blob/master/README.md#436-null-object)
    * [4.3.7 Singleton](https://github.com/julietafrade97/feup-asso/blob/master/README.md#437-singleton)
* [5. Vis.js](https://github.com/julietafrade97/feup-asso/blob/master/README.md#5-visjs)
* [6. The struggles of adding web to the mix](https://github.com/julietafrade97/feup-asso/blob/master/README.md#6-the-struggles-of-adding-web-to-the-mix)
  * [6.1 Bundling](https://github.com/julietafrade97/feup-asso/blob/master/README.md#61-bundling)
  * [6.2 Arbitrary dynamic requires](https://github.com/julietafrade97/feup-asso/blob/master/README.md#62-arbitrary-dynamic-requires)
  * [6.3 Everything client-side](https://github.com/julietafrade97/feup-asso/blob/master/README.md#63-everything-client-side)


# 1. How to Run
1. `npm install`
2. `npm run dev`
3. `Open http://localhost:3000/`

# 2. Goals
To develop an application that supports the creation and execution of Information Security Recipes. The base unit of computation in this application is a Task. 
Tasks are comprised of:

•	a set of inputs

•	a set of outputs

•	an inherent behaviour

One can composse tasks by arbitrarily connecting their inputs and outputs to form a Recipe. There's a standard collection of tasks that we can already foresee, but the application should be extensible enough to support new tasks via plugins without altering the base code. Recipes can be saved and reused as tasks in other recipes.

# 3. Features
### Sources
Open File and runtime input.
### Sinks
Send to file or none. User can always see the current state of a task and so the message it bears
### Handlers
Text - Uppercase, Lowercase, Encoding, Read file, Write to a file

## 3.1 Install Task and Create Node
Lorem

## 3.2 Add Edge and Delete Edge
Lorem

## 3.3 Load File and Execute
Lorem

## 3.4 Debug Mode
Lorem

## 3.5 Change Input
Lorem

## 3.6 Disable Node
Lorem

## 3.7 Save and Load Recipe
Lorem

# 4. Architecture

## 4.1 UML
[UML Architecture](https://i.imgur.com/t1iefWu.jpg)

## 4.2 Pipes & Filters
Os filters são task e os pipes mensagens. Uma task tem a(s) próxima(s) task(s) a quem passam a mensagem alterada para que possam executar a sua ação com essa mesma mensagem e dar prosseguimento à cadeia de tasks.

## 4.3 Design Patterns

### 4.3.1 Factory Method
Usado para as "fábricas" de tasks, sendo que cada uma "produz"/cria task de um tipo específico.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

**Rationale:** Lorem

### 4.3.2 Module
Usado para a instalar, desinstalar e carregar plugins, isto é, tipos de tasks.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

**Rationale:** Lorem

### 4.3.3 Strategy
Usado para implementar diferentes algoritmos para os diferentes comportamentos de um nó. Um nó é um ponto no grafo da interface gráfica podendo ser configurado de formas diferentes e mostrar informação distinta consoante o tipo de task que representa (baseando-se na origem do input e destino do output). A estratégia de um nó pode ser alterada com o decorrer do programa com as ligações que são feitas a esse nó.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

**Rationale:** Lorem

### 4.3.4 State
Usado para alterar o comportamento de uma task com a alteração do seu estado: se está ativa ou se está em pausa.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

**Rationale:** Lorem

### 4.3.5 Decorator
Usado para acrescentar ações extra a uma task. No caso de "debug", após a execução normal da task, será apresentado o estado da task. Já no caso de "change output", será possível alterar o conteudo da mensagem dessa task e depois prosseguir com a sua execução normal.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

**Rationale:** Lorem

### 4.3.6 Null Object
Representa o comportamento neutro de uma mensagem, ou seja, uma mensagem sem conteudo.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

**Rationale:** Lorem

### 4.3.7 Singleton
Usado para termos uma instancia única de cada fábrica e da classe central (Main).

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

**Rationale:** Lorem

## 5. Vis.js
Lorem

## 6. The struggles of adding web to the mix
Resorting to web interfacing presents a handful of challenges which technically don't fit on ASSO's scope.

### 6.1 Bundling
Since the visualization library *vis.js* is based on Node, regular browser Javascript was no longer possible. Naturally, browsers don't have a require method like Node.js does so a Javascript module bundler was mandatory. We also didn't intend to do any server-side business at the expense of a couple of drawbacks and subsequent workarounds we'll discuss later on.  
We ended up using **webpack** to bundle our dependencies.

### 6.2 Arbitrary dynamic requires
Imagine a user wants to code its own plugin into the software. In a perfect world, you'd just place it into a folder and a portion of pre-programmed code would handle importing it to the logic.  

We actually begun bundling with Browserify, yet the scenery is as messy with webpack. Arbitrary dynamic requires are a dead end. Browserify can only do static string analysis for requirement rebinding so requirements must be hardcoded.  

The general consensus is sticking to static requirements either way because of the unpredictable nature of dynamic requires for production deployment.

**Workaround:** A require list file which contains the paths to every plugin must be edited beforehand.

### 6.3 Everything client-side
No real server communication renders any state preservation pretty much useless so recipes are saved and can be loaded as long as the user doesn't refresh the page. Obviously this isn't the optimal case, yet it's enough for this project. 

**Workaround:** Simply storing in client-side memory.

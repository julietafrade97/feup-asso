# Development steps
1. `npm install`
2. `npm run dev`
3. `Open http://localhost:3000/`

# Goals
To develop an application that supports the creation and execution of Information Security Recipes. The base unit of computation in this application is a Task. 
Tasks are comprised of:

•	a set of inputs

•	a set of outputs

•	an inherent behaviour

One can composse tasks by arbitrarily connecting their inputs and outputs to form a Recipe. There's a standard collection of tasks that we can already foresee, but the application should be extensible enough to support new tasks via plugins without altering the base code. Recipes can be saved and reused as tasks in other recipes.

# Functionalities
### Sources
Open File and runtime input.
### Sinks
Send to file or none. User can always see the current state of a task and so the message it bears
### Handlers
Text - Uppercase, Lowercase, Encoding, Read file, Write to a file

# Architecture Details

[UML Architecture](https://i.imgur.com/t1iefWu.jpg)

•	The senders initiate the flow.

•	The tempopary information lives in the queues while waiting to be processed.

•	We can execute tasks in parallel.

•	We handle errors throwing exceptions and logging error details.

•	Input element by element.

•	It stops when all the taks are completed.

## The struggles of adding web to the mix
Resorting to web interfacing presents a handful of challenges which technically don't fit on ASSO's scope.

### Bundling
Since the visualization library *vis.js* is based on Node, regular browser Javascript was no longer possible. Naturally, browsers don't have a require method like Node.js does so a Javascript module bundler was mandatory. We also didn't intend to do any server-side business at the expense of a couple of drawbacks and subsequent workarounds we'll discuss later on.  
We ended up using **webpack** to bundle our dependencies.

#### Arbitrary dynamic requires
Imagine a user wants to code its own plugin into the software. In a perfect world, you'd just place it into a folder and a portion of pre-programmed code would handle importing it to the logic.  

We actually begun bundling with Browserify, yet the scenery is as messy with webpack. Arbitrary dynamic requires are a dead end. Browserify can only do static string analysis for requirement rebinding so requirements must be hardcoded.  

The general consensus is sticking to static requirements either way because of the unpredictable nature of dynamic requires for production deployment.

**Workaround:** A require list file which contains the paths to every plugin must be edited beforehand.

### Everything client-side
No real server communication renders any state preservation pretty much useless so recipes are saved and can be loaded as long as the user doesn't refresh the page. Obviously this isn't the optimal case, yet it's enough for this project. 

**Workaround:** Simply storing in client-side memory.

## Design Patterns

### Factory Method
Usado para as "fábricas" de tasks, sendo que cada uma "produz"/cria task de um tipo específico.

### Module
Usado para a instalar, desinstalar e carregar plugins, isto é, tipos de tasks.

### Strategy
Usado para implementar diferentes algoritmos para os diferentes comportamentos de um nó. Um nó é um ponto no grafo da interface gráfica podendo ser configurado de formas diferentes e mostrar informação distinta consoante o tipo de task que representa (baseando-se na origem do input e destino do output). A estratégia de um nó pode ser alterada com o decorrer do programa com as ligações que são feitas a esse nó.

### State
Usado para alterar o comportamento de uma task com a alteração do seu estado: se está ativa ou se está em pausa.

### Decorator
Usado para acrescentar ações extra a uma task. No caso de "debug", após a execução normal da task, será apresentado o estado da task. Já no caso de "change output", será possível alterar o conteudo da mensagem dessa task e depois prosseguir com a sua execução normal.

### Pipes & Filters
Os filters são task e os pipes mensagens. Uma task tem a(s) próxima(s) task(s) a quem passam a mensagem alterada para que possam executar a sua ação com essa mesma mensagem e dar prosseguimento à cadeia de tasks.

### Null Object
Representa o comportamento neutro de uma mensagem, ou seja, uma mensagem sem conteudo.

### Singleton
Usado para termos uma instancia única de cada fábrica e da classe central (Main).

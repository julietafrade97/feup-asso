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

[UML Architecture](https://i.imgur.com/wjrKmFu.png)

•	The senders initiate the flow.

•	The tempopary information lives in the queues while waiting to be processed.

•	We can execute tasks in parallel.

•	We handle errors throwing exceptions and logging error details.

•	Input element by element.

•	It stops when all the taks are completed.

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

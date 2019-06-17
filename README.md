# Index
* [1. How to Run](https://github.com/julietafrade97/feup-asso/blob/master/README.md#1-how-to-run)
* [2. Goals](https://github.com/julietafrade97/feup-asso/blob/master/README.md#2-goals)
* [3. Features](https://github.com/julietafrade97/feup-asso/blob/master/README.md#3-features)
  * [3.1 Available Tasks](https://github.com/julietafrade97/feup-asso/blob/master/README.md#31-available-tasks)
  * [3.2 Install Task and Create Node](https://github.com/julietafrade97/feup-asso/blob/master/README.md#32-install-task-and-create-node)
  * [3.3 Add Edge and Delete Edge](https://github.com/julietafrade97/feup-asso/blob/master/README.md#33-add-edge-and-delete-edge)
  * [3.4 Load File and Execute](https://github.com/julietafrade97/feup-asso/blob/master/README.md#34-load-file-and-execute)
  * [3.5 Write Input and Execute](https://github.com/julietafrade97/feup-asso/blob/master/README.md#35-debug-mode)
  * [3.6 Debug Mode](https://github.com/julietafrade97/feup-asso/blob/master/README.md#36-debug-mode)
  * [3.7 Change Input](https://github.com/julietafrade97/feup-asso/blob/master/README.md#37-change-input)
  * [3.8 Disable Node](https://github.com/julietafrade97/feup-asso/blob/master/README.md#38-disable-node)
  * [3.9 Save and Load Recipe](https://github.com/julietafrade97/feup-asso/blob/master/README.md#39-save-and-load-recipe)
  * [3.10 Detection of Cycles](https://github.com/julietafrade97/feup-asso/blob/master/README.md#310-detection-of-cycles)
* [4. Architecture](https://github.com/julietafrade97/feup-asso/blob/master/README.md#4-architecture)
  * [4.1 UML](https://github.com/julietafrade97/feup-asso/blob/master/README.md#41-uml)
  * [4.2 Pipes and Filters](https://github.com/julietafrade97/feup-asso/blob/master/README.md#42-pipes--filters)
  * [4.3 Design Patterns](https://github.com/julietafrade97/feup-asso/blob/master/README.md#43-design-patterns)
    * [4.3.1 Facade](https://github.com/julietafrade97/feup-asso#431-facade)
    * [4.3.2 Factory Method Baldaia](https://github.com/julietafrade97/feup-asso#432-factory-method)
    * [4.3.3 Module Baldaia](https://github.com/julietafrade97/feup-asso#433-module)
    * [4.3.4 Registry](https://github.com/julietafrade97/feup-asso#434-registry)
    * [4.3.5 State Baldaia](https://github.com/julietafrade97/feup-asso#435-state)
    * [4.3.6 Decorator](https://github.com/julietafrade97/feup-asso#436-decorator)
    * [4.3.7 Prototype](https://github.com/julietafrade97/feup-asso#437-prototype)
    * [4.3.8 Null Object](https://github.com/julietafrade97/feup-asso#438-null-object)
    * [4.3.9 Singleton](https://github.com/julietafrade97/feup-asso#439-singleton)
  * [4.4 Sequence Diagrams](https://github.com/julietafrade97/feup-asso/blob/master/README.md#44-sequence-diagrams) Baldaia
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

One can compose tasks by arbitrarily connecting their inputs and outputs to form a Recipe. There's a standard collection of tasks that we can already foresee, but the application should be extensible enough to support new tasks via plugins without altering the base code. Recipes can be saved and reused as tasks in other recipes.

# 3. Features
## 3.1 Available Tasks
### Sources
FileLineReader and InputReader
### Sinks
Write
### Handlers
Uppercase and Lowercase

## 3.2 Install Task and Create Node
![Install Task and Create Node](https://github.com/julietafrade97/feup-asso/blob/master/assets/1-installTask_CreateNode.gif)

**Install Task:** Click on *Install Task* and choose the desired task.

**Create Node:** Click on *New Node* and choose the desired task from the list of already installed tasks.

## 3.3 Add Edge and Delete Edge
![Add Edge and Delete Edge](https://github.com/julietafrade97/feup-asso/blob/master/assets/2-addEdge_deleteEdge.gif)

**Add Edge:** Click on the starting node and click on the ending node.

**Delete Edge:** Double click on the desired edge.

## 3.4 Load File and Execute
![Load File and Execute](https://github.com/julietafrade97/feup-asso/blob/master/assets/3-loadFile_execute.gif)

**Load File (Enabled when using the task *FileLineReader*):** Click on *Load File* and choose the desired input file.

**Execute  (Enabled when using the task *Writer*):** Click on *Execute* and check the output on the *Output* text area.

## 3.5 Write Input and Execute
![Write Input and Execute](https://github.com/julietafrade97/feup-asso/blob/master/assets/8-writeInput_execute.gif)

**Write Input (Enabled when using the task *InputReader*):** Write the desired string on the *Input* text area.

**Execute (Enabled when using the task *Writer*):** Click on *Execute* and check the output on the *Output* text area.

## 3.6 Debug Mode
![Debug Mode](https://github.com/julietafrade97/feup-asso/blob/master/assets/4-debugMode.gif)

**Activate Debug Mode:** Double click on any node and select the *Debug Mode* checkbox.

**Debug Information:** Double click on the desired node and see its input and output in the last execution.

## 3.7 Change Node Input
![Change Input](https://github.com/julietafrade97/feup-asso/blob/master/assets/5-changeInput.gif)

**Change the Node Input:** Double click on the node and insert the desired input on the *New Input Text* text field.

**Execute (Enabled when using the task *Writer*):** Click on *Execute* and check the output on the *Output* text area.

## 3.8 Disable Node
![Disable Node](https://github.com/julietafrade97/feup-asso/blob/master/assets/6-disableNode.gif)

**Disable Node:** Double click on the desired node and select the *Disabled* checkbox.

## 3.9 Save and Load Recipe
![Save and Load Recipe](https://github.com/julietafrade97/feup-asso/blob/master/assets/7-loadRecipe.gif)

**Save Recipe:** Click on *Save Recipe* and insert the desired name on the *Recipe Name* text field.

**Load Recipe:** Click on *Load Recipe* and choose the desired recipe.

## 3.10 Detection of Cycles
Error detection in case of cycle in recipe.
![Detection of Cycles](https://github.com/julietafrade97/feup-asso/blob/master/assets/9-cycle.gif)

# 4. Architecture

## 4.1 UML
![UML](https://github.com/julietafrade97/feup-asso/blob/master/assets/uml.png)

## 4.2 Pipes & Filters
Os filters são task e os pipes mensagens. Uma task tem a(s) próxima(s) task(s) a quem passam a mensagem alterada para que possam executar a sua ação com essa mesma mensagem e dar prosseguimento à cadeia de tasks.

## 4.3 Design Patterns

### 4.3.1 Facade
**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

### 4.3.2 Factory Method

**Context:** One Recipe can have more than one task, so it is expected to have more than one task instance in our programme.

**Problem:** Initially the user can only add FileLineReader tasks, but there are other different types of tasks that we can load.

If at the beginning we were only thinking about the currently available types, most of our code would be coupled to those tasks classes. Adding a new type of task would require making changes to the entire codebase. As a result, we would end up with pretty nasty code, riddled with conditionals that switch the app's behaviour depending on the class of task object.

**Solution:** The Factory Method pattern suggests that you replace direct object construction calls (using the new operator) with calls to a special factory method. Therefore, we have a base class called Creator and one derived class from this one for each task type we have. These Creator classes have a method, createTask(),  that returns a new object of Task class.

**Rationale:** Abstract Factory provides an interface for creating families of related or dependent objects without specifying their concrete classes.

We didn't choose this approach since our tasks don't have any kind of relationship.

### 4.3.3 Module
Usado para a instalar, desinstalar e carregar plugins, isto é, tipos de tasks.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

### 4.3.4 Registry
**Context:**  It is required to install, uninstall and load plugins - that is - task types by name.

**Problem:** There isn’t a way to easily find installed plugins and execute them, since they can technically be dynamically added and are hosted on unique directories.

**Solution:** Service Locator encapsulates the processes involved in obtaining a service with a strong abstraction layer, by using a central registry known as the service locator, which on request returns the information necessary to perform a certain task. This way we may quickly get modules and subsequently perform operations.

### 4.3.5 State
Usado para alterar o comportamento de uma task com a alteração do seu estado: se está ativa ou se está em pausa.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

### 4.3.6 Decorator
**Context:** A task has its inherent behaviour, a task should also have the “debug” mode and the “change input” mode. When the task is in “debug” mode, after the normal execution, it will be shown the input and output of the task. With the “change input” mode it will be possible to insert the data that the task will consider its input on the next execution.

**Problem:** We considered adding subclasses to the main class task with the different modes. The problem is because the modes are not exclusive we would have three subclasses: “debugTask”, “changeOutputTask”, “debugChangeOutputTask”. If in the future wanted to add more modes this list would extend exponentially.

**Solution:** Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors. Therefore, if we turn on “debug” mode, we just wrap the normal object inside of a new object with the “debug” behaviour and if we turn on “change input” mode afterwards, we would do the same thing but with a wrapper with the “output input” behavior, and, in the end, we would have to work with just one object that has three different behaviours. 

### 4.3.7 Prototype
**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

### 4.3.8 Null Object
Representa o comportamento neutro de uma mensagem, ou seja, uma mensagem sem conteudo.

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

### 4.3.9 Singleton
Usado para termos uma instancia única de cada fábrica e da classe central (Main).

**Context:** Lorem

**Problem:** Lorem

**Solution:** Lorem

### 4.4 Sequence Diagrams
Lorem

## 5. Vis.js
**Vis.js** is a dynamic browser based visualization library with intuitive network components consisting of nodes and edges. The tool is well documented so manipulating these components proved itself fairly straightforward.

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

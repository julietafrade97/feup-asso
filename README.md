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
    * [4.3.2 Factory Method](https://github.com/julietafrade97/feup-asso#432-factory-method)
    * [4.3.3 Module](https://github.com/julietafrade97/feup-asso#433-module)
    * [4.3.4 Registry](https://github.com/julietafrade97/feup-asso#434-registry)
    * [4.3.5 State](https://github.com/julietafrade97/feup-asso#435-state)
    * [4.3.6 Decorator](https://github.com/julietafrade97/feup-asso#436-decorator)
    * [4.3.7 Prototype](https://github.com/julietafrade97/feup-asso#437-prototype)
    * [4.3.8 Null Object](https://github.com/julietafrade97/feup-asso#438-null-object)
    * [4.3.9 Singleton](https://github.com/julietafrade97/feup-asso#439-singleton)
  * [4.4 Sequence Diagrams](https://github.com/julietafrade97/feup-asso/blob/master/README.md#44-sequence-diagrams) 
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

* A set of inputs;
*	A set of outputs;
*	An inherent behaviour.

One can compose tasks by arbitrarily connecting their inputs and outputs to form a Recipe. There's a standard collection of tasks that we may already foresee, yet the application should be extensible enough to support new tasks via plugins without altering the base code. Recipes can be saved and reused as tasks in other recipes.

# 3. Features
## 3.1 Available Tasks
### Sources
* FileLineReader
* InputReader
### Sinks
* Write
### Handlers
* Uppercase
* Lowercase

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
On this project, tasks are filters and messages are the pipes. A single task delivers its modified message to the next node in this graph-based structure. The latter continues the task chain by applying its own logic to the message and providing the next node with it. This cycle repeats until every node's exhausted and a final output is provided.

## 4.3 Design Patterns

### 4.3.1 Facade
**Context:** The program logic is really complex since it has a lot of functionalities, classes and modules.

**Problem:** It is necessary to make the logic look simple from the user interface side.

**Solution:**  Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes. In our case, the facade will have the registry object, the current recipe object and stored recipes array and only the methods extremely necessary for the user interface to work with the program logic

### 4.3.2 Factory Method

**Context:** One Recipe can have more than one task, so it is expected to have more than one task instance in our programme.

**Problem:** Initially the user can only add FileLineReader tasks, but there are other different types of tasks that we can load.

If at the beginning we were only thinking about the currently available types, most of our code would be coupled to those tasks classes. Adding a new type of task would require making changes to the entire codebase. As a result, we would end up with pretty nasty code, riddled with conditionals that switch the app's behaviour depending on the class of task object.

**Solution:** The Factory Method pattern suggests that you replace direct object construction calls (using the new operator) with calls to a special factory method. Therefore, we have a base class called Creator and one derived class from this one for each task type we have. These Creator classes have a method, createTask(),  that returns a new object of Task class.

**Rationale:** Abstract Factory provides an interface for creating families of related or dependent objects without specifying their concrete classes.

We didn't choose this approach since our tasks don't have any kind of relationship.

### 4.3.3 Module

**Context:** The user can only add tasks of types that have already installed. 

**Problem:** What could we do to in run time make new task types available or make the other no longer available?

**Solution:** Following the software development principle that source code can be organized into components that accomplish a particular function or contain everything necessary to accomplish a particular task, we use the Module pattern to represent one task type as a module. Here a module is an object of Module class and has one library (property "lib"), which is an import, from a specific path, of two derived classes exported as Creator and Task. It also has one factory that is a singleton instance of the derived class Creator obtained through lib. Module has three methods: install() to initialize properties lib and factory; execute() to use module's factory and thus create a task; uninstall() to set properties to null.

For each task type that we want to make available, we create a new module and every time we want a new instance of a specific task we use its correspondent module. If we want to make a type no longer available, we just have to uninstall the module.

### 4.3.4 Registry
**Context:**  It is required to install, uninstall and load plugins - that is - task types by name.

**Problem:** There isn’t a way to easily find installed plugins and execute them, since they can technically be dynamically added and are hosted on unique directories.

**Solution:** Service Locator encapsulates the processes involved in obtaining a service with a strong abstraction layer, by using a central registry known as the service locator, which on request returns the information necessary to perform a certain task. This way we may quickly get modules and subsequently perform operations.

### 4.3.5 State

**Context:** One recipe is displayed as a graph where each node is one task and the edges define the flow (tasks outputs as input to other tasks). A task has a specific behaviour and so produces different modifications on the inputs. The manipulated data is then passed to the next task.

**Problem:** Our programme should implement a feature that allows the user to disable nodes so whenever those receive an input they will perform no changes on the data, forwarding that to the next node.

**Solution:** The State pattern is closely related to the concept of a Finite-State Machine. The main idea is that, at any given moment, there’s a finite number of states which a program can be in. Within any unique state, the program behaves differently, and the program can be switched from one state to another instantaneously.

For all possible states, we create a new class that includes the state-specific behaviour. Here we have two states: Active and Idle. When a task changes its state, it turns Idle if it was Active, and Active otherwise. In the Active state the task has an impact on the received data and in the Idle the task simple forward that data.
We call the state execute inside the task execute method.

**Rationale:** Even though this structure may look similar to the Strategy pattern, in the State pattern states may be aware of each other and initiate transitions from one state to another, whereas strategies are independent in that sense. 

### 4.3.6 Decorator
**Context:** A task has its inherent behaviour, a task should also have the “debug” mode and the “change input” mode. When the task is in “debug” mode, after the normal execution, it will be shown the input and output of the task. With the “change input” mode it will be possible to insert the data that the task will consider its input on the next execution.

**Problem:** We considered adding subclasses to the main class task with the different modes. The problem is because the modes are not exclusive we would have three subclasses: “debugTask”, “changeOutputTask”, “debugChangeOutputTask”. If in the future wanted to add more modes this list would extend exponentially.

**Solution:** Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors. Therefore, if we turn on “debug” mode, we just wrap the normal object inside of a new object with the “debug” behaviour and if we turn on “change input” mode afterwards, we would do the same thing but with a wrapper with the “output input” behavior, and, in the end, we would have to work with just one object that has three different behaviours. 

### 4.3.7 Prototype
**Context:** When a recipe is saved, it is necessary to make a copy of the tasks it contains, otherwise, when we loaded that recipe, we would be working with the same instance of the task we used before.

**Problem:** The basic solution would be the class Facade (the one in charge of saving the recipe) duplicate the recipe tasks, but that would make facade code dependent on the class task.

**Solution:** Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes. The Prototype pattern delegates the cloning process to the actual objects that are being cloned. The pattern declares a common interface for all objects that support cloning. The Prototype interface declares the cloning methods. In most cases, it’s a single clone method. The Task class implements the cloning method and the Facade can produce a copy of a Task.

### 4.3.8 Null Object
**Context:** Messages sent through the network may sometimes be empty and the network should adapt to these occurrences. When a task decorator is initialized, its content message is empty just to be later assigned by child decorators such as the debug mode decorator.

**Problem:** Sending undefined messages may result in unexpected behaviour.

**Solution:** A Null Object always knows exactly what needs to be done without interacting with any other objects. This way neutral messages may be correctly handled.

### 4.3.9 Singleton
**Context:** Factories are required in varying places in the codebase like on the node addition portion.  

**Problem:** There isn’t an uncomplicated way to access factories which create tasks.  

**Solution:** Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance. This way, there’s a global access point to factories.

### 4.4 Sequence Diagrams

**Install Task and Create Node**

![Install Task and Create Node](https://github.com/julietafrade97/feup-asso/blob/master/assets/3.2.png)

**Add Edge and Delete Edge** Miguel

**Write Input and Execute** Julieta

**Debug Mode** Baldaia

**Change Input** Baldaia

**Disable Node** Julieta

**Save and Load Recipe** Miguel

**Detection of Cycles** Julieta

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

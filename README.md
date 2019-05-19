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
Open File 
### Sinks
Send to file
### Handlers
Text - Uppercase, Lowercase, Encoding

# Architecture Details

[architecture](https://i.imgur.com/wjrKmFu.png)

•	The senders initiate the flow.

•	The tempopary information lives in the queues while waiting to be processed.

•	We can execute tasks in parallel.

•	We handle errors throwing exceptions and logging error details.

•	Input element by element.

•	It stops when all the taks are completed.

/* eslint-disable no-new */
const mdc = require('material-components-web');
// const plugins = require('../../models/plugins.json');
const graph = require('./graph.js');
const plugins = require('./compiled/plugins/require-list.js');


let node1;
let node2;
let file = null;

/**
 * Add "Add Node" dropdown options
 */
function setSelectNodeOptions() {
  const selectNode = document.querySelector('#add-node-dialog select'); // dropdown with available task types
  selectNode.innerHTML = '';

  const emptyOption = document.createElement('option');// default option (null)
  emptyOption.textContent = 'Task';
  emptyOption.value = '';
  emptyOption.selected = true;
  emptyOption.disabled = true;
  selectNode.appendChild(emptyOption);

  Object.keys(graph.facade.modulesRegistry.modules).forEach((key) => {
    const node = document.createElement('option');
    node.value = key;
    node.textContent = key;

    selectNode.appendChild(node);
  });
}

const getInstallablePlugins = () => Object.keys(plugins.AllPlugins).filter(key => !plugins.LoadedPlugins.includes(key));

/**
 * Add "Install Task" dropdown options.
 */
function setTaskOptions(isInstalling) {
  const selectInstallTask = document.querySelector(`#${isInstalling ? '' : 'un'}install-task-dialog select`);
  selectInstallTask.innerHTML = '';

  const emptyOption = document.createElement('option');
  emptyOption.textContent = 'Task';
  emptyOption.value = '';
  emptyOption.selected = true;
  emptyOption.disabled = true;
  selectInstallTask.appendChild(emptyOption);

  (isInstalling ? getInstallablePlugins() : plugins.LoadedPlugins).forEach((plugin) => {
    const node = document.createElement('option');
    node.value = plugin;
    node.textContent = plugin;

    selectInstallTask.appendChild(node);
  });
}

function setLoadRecipeOptions() {
  const selectNode = document.querySelector('#load-recipe-dialog select'); // dropdown with available recipes
  selectNode.innerHTML = '';

  const emptyOption = document.createElement('option');// default option (null)
  emptyOption.textContent = 'Recipe';
  emptyOption.value = '';
  emptyOption.selected = true;
  emptyOption.disabled = true;
  selectNode.appendChild(emptyOption);

  graph.facade.storedRecipes.forEach((recipe) => {
    const option = document.createElement('option');
    option.value = recipe.name;
    option.textContent = recipe.name;

    selectNode.appendChild(option);
  });
}

const updateInterface = () => {
  setTaskOptions(true);
  setTaskOptions(false);
  setSelectNodeOptions();
};

document.addEventListener('DOMContentLoaded', () => {
  setSelectNodeOptions();

  setTaskOptions(true);
  setTaskOptions(false);
  setLoadRecipeOptions();
});

const addNodeDialog = new mdc.dialog.MDCDialog(document.querySelector('#add-node-dialog'));
const installTaskDialog = new mdc.dialog.MDCDialog(document.querySelector('#install-task-dialog'));
const uninstallTaskDialog = new mdc.dialog.MDCDialog(document.querySelector('#uninstall-task-dialog'));
const saveRecipeDialog = new mdc.dialog.MDCDialog(document.querySelector('#save-recipe-dialog'));
const loadRecipeDialog = new mdc.dialog.MDCDialog(document.querySelector('#load-recipe-dialog'));
const nodeInfoDialog = new mdc.dialog.MDCDialog(document.querySelector('#node-info-dialog'));

addNodeDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const newNodeTitle = document.querySelectorAll('#add-node-dialog option:checked')[0].innerText;
    graph.facade.addNode(newNodeTitle);
    graph.update();
  }
});

installTaskDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const installed = document.querySelectorAll('#install-task-dialog option:checked')[0].innerText;
    graph.facade.installPlugin(installed);
    updateInterface();
  }
});

uninstallTaskDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const installed = document.querySelectorAll('#uninstall-task-dialog option:checked')[0].innerText;
    graph.facade.uninstallPlugin(installed);
    updateInterface();
  }
});

saveRecipeDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const recipeName = document.querySelectorAll('#save-recipe-dialog input')[0].value;
    graph.facade.saveRecipe(recipeName);
    setLoadRecipeOptions();
  }
});

loadRecipeDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const recipeName = document.querySelectorAll('#load-recipe-dialog option:checked')[0].innerHTML;
    graph.facade.loadRecipe(recipeName);
    graph.update();
  }
});

function execute(fileInput) {
  const userInput = document.querySelector('#user-input input').value;
  const output = graph.facade.execute(fileInput, userInput);
  output.trim();
  const div = document.querySelector('#result-output div');
  div.innerHTML = '';
  output.split(' ').forEach((s) => {
    const line = document.createElement('p');
    line.innerHTML = s;
    div.appendChild(line);
  });
}

document.querySelector('#toggle-execution-button').addEventListener('click', () => {
  const button = document.querySelector('#toggle-execution-button');

  if (button.innerHTML === 'Execute') {
    button.innerHTML = 'Pause';
    if (file === null) {
      execute('');
    } else {
      const read = new FileReader();
      read.readAsBinaryString(file);
      // eslint-disable-next-line func-names
      read.onloadend = function () {
        execute(read.result);
      };
    }

    button.innerHTML = 'Execute';
  } else if (button.innerHTML === 'Pause') {
    button.innerHTML = 'Execute';
    // TODO: Pause logic here.
  }
});

document.querySelector('#toggle-new-recipe-button').addEventListener('click', () => {
  graph.facade.newRecipe();
  graph.update();
});

document.querySelector('#add-node').addEventListener('click', () => addNodeDialog.open());

// Listeners for click events which open dialogs.
document.querySelector('#install-task').addEventListener('click', () => installTaskDialog.open());
document.querySelector('#uninstall-task').addEventListener('click', () => uninstallTaskDialog.open());
document.querySelector('#save-recipe').addEventListener('click', () => saveRecipeDialog.open());
document.querySelector('#load-recipe').addEventListener('click', () => loadRecipeDialog.open());
graph.network.on('doubleClick', () => nodeInfoDialog.open());


// Listeners for node information checkboxes.
const isEnabledCheckbox = new mdc.checkbox.MDCCheckbox(document.querySelector('#enabled-checkbox'));
const isDebugModeCheckbox = new mdc.checkbox.MDCCheckbox(document.querySelector('#debug-checkbox'));

nodeInfoDialog.listen('MDCDialog:closed', () => {
  console.log(isEnabledCheckbox.checked, isDebugModeCheckbox.checked);
});

// File read handling.
document.querySelector('#file-read-button').addEventListener('click', () => {
  document.querySelector('#file-read-input').click();
});

document.getElementById('file-read-input').oninput = () => {
  [file] = document.getElementById('file-read-input').files;
};

graph.network.on('click', (properties) => {
  if (properties.nodes !== undefined) {
    if (node1 && node2) {
      graph.nodes.update({ id: node1, font: { size: 14 } });
      node1 = node2;
      [node2] = properties.nodes;
      graph.nodes.update({ id: node1, font: { size: 18 } });
      graph.nodes.update({ id: node2, font: { size: 18 } });
    }

    if (node1 && !node2) {
      [node2] = properties.nodes;
      graph.nodes.update({ id: node2, font: { size: 18 } });
    }

    if (!node1 && !node2) {
      [node1] = properties.nodes;
      graph.nodes.update({ id: node1, font: { size: 18 } });
    }
  }
});

document.querySelector('#add-edge').addEventListener('click', () => {
  if (node1 && node2) {
    // graph.edges.add({ from: node1, to: node2 });
    graph.facade.connectNodes(node1, node2);
    graph.nodes.update({ id: node1, font: { size: 14 } });
    graph.nodes.update({ id: node2, font: { size: 14 } });
    graph.update();
  }
  node1 = undefined; node2 = undefined;
});

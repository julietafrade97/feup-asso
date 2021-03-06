/* eslint-disable no-new */
const mdc = require('material-components-web');
// const plugins = require('../../models/plugins.json');
const graph = require('./graph.js');
const plugins = require('./compiled/plugins/require-list.js');


let node1;
let node2;
let file = null;

let nodeShowingInfo;

/**
 * Add "Add Node" dropdown options
 */
function setSelectNodeOptions() {
  const selectNode = document.querySelector('#add-node-dialog select'); // dropdown with available task types
  selectNode.innerHTML = '';

  const emptyOption = document.createElement('option');// default option (null)
  /*
  emptyOption.textContent = 'Task';
  emptyOption.value = '';
  emptyOption.selected = true;
  emptyOption.disabled = true;
  selectNode.appendChild(emptyOption);
  */

  Object.keys(graph.facade.modulesRegistry.modules).forEach((key) => {
    const node = document.createElement('option');
    node.value = key;
    node.textContent = key;

    selectNode.appendChild(node);
  });
}

/**
 * Get list of installed plugins.
 */
// eslint-disable-next-line max-len
const getInstallablePlugins = () => Object.keys(plugins.AllPlugins).filter(key => !plugins.LoadedPlugins.includes(key));

/**
 * Add "Install Task" dropdown options.
 */
function setTaskOptions(isInstalling) {
  const selectInstallTask = document.querySelector(`#${isInstalling ? '' : 'un'}install-task-dialog select`);
  selectInstallTask.innerHTML = '';

  const emptyOption = document.createElement('option');
  /*
  emptyOption.textContent = 'Task';
  emptyOption.value = '';
  emptyOption.selected = true;
  emptyOption.disabled = true;
  selectInstallTask.appendChild(emptyOption);
  */

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
  /*
  emptyOption.textContent = 'Recipe';
  emptyOption.value = '';
  emptyOption.selected = true;
  emptyOption.disabled = true;
  selectNode.appendChild(emptyOption);
  */

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

// Listeners for node information checkboxes.
const isDisabledCheckbox = new mdc.checkbox.MDCCheckbox(document.querySelector('#disabled-checkbox'));
const isDebugModeCheckbox = new mdc.checkbox.MDCCheckbox(document.querySelector('#debug-checkbox'));

// Floating label listeners on text fields.
document.querySelectorAll('.mdc-text-field').forEach((elem) => {
  new mdc.textField.MDCTextField(elem);
});

// Floating label listeners on text fields.
document.querySelectorAll('.mdc-select').forEach((elem) => {
  new mdc.select.MDCSelect(elem);
});

addNodeDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const newNodeTitle = document.querySelectorAll('#add-node-dialog option:checked')[0].innerText;
    graph.facade.addNode(newNodeTitle);
    graph.update();

    if (isDebugModeCheckbox.checked) {
      graph.facade.enableDebug();
    }
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

nodeInfoDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'delete') {
    graph.facade.deleteNode(nodeShowingInfo);
    graph.update();
  }
});

nodeInfoDialog.listen('MDCDialog:opening', () => {
  document.getElementById('node-info-dialog-title').innerHTML = graph.nodes.get(nodeShowingInfo).label;
  document.getElementById('node-info-dialog-subtitle').innerHTML = `ID ${graph.nodes.get(nodeShowingInfo).id}`;

  if (nodeShowingInfo) {
    isDisabledCheckbox.checked = graph.facade.isNodeIdle(nodeShowingInfo);
  }
  if (isDebugModeCheckbox.checked) {
    document.getElementById('debug-mode-window').style.display = 'block';

    const log = graph.facade.getTraceLog(nodeShowingInfo);
    const div = document.getElementById('trace-log-message');
    div.innerHTML = '';
    log.split('!!br!!').forEach((s) => {
      const line = document.createElement('p');
      line.innerHTML = s;
      div.appendChild(line);
      // div.appendChild(document.createElement('br'));
    });
  } else {
    document.getElementById('debug-mode-window').style.display = 'none';
  }
});

nodeInfoDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const input = document.querySelectorAll('#change-output-text-field input')[0];
    if (graph.facade.isNodeIdle(nodeShowingInfo)) {
      input.value = '';
      return;
    }
    const newInput = input.value;
    if (newInput !== '') {
      graph.facade.changeNodeOutput(nodeShowingInfo, newInput);
    } else {
      graph.facade.disableChangeNodeOutput(nodeShowingInfo);
    }
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
    line.className = 'mdc-typography--body1';
    line.style.margin = 0;
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

graph.network.on('doubleClick', (evt) => {
  if (evt.edges.length > 0 && evt.nodes.length === 0) {
    const edge = graph.edges.get(evt.edges[0]);
    graph.facade.deleteEdge(edge.from, edge.to);
    graph.update();
  }

  if (evt.nodes.length > 0) {
    const [node] = evt.nodes;
    nodeShowingInfo = node;
    nodeInfoDialog.open();
  }
});

isDisabledCheckbox.listen('change', () => {
  if (graph.facade.isNodeIdle(nodeShowingInfo)) {
    graph.nodes.update({ id: nodeShowingInfo, color: { border: '#2B7CE9' } });
    graph.nodes.update({ id: nodeShowingInfo, color: { background: '#D2E5FF' } });
    graph.nodes.update({ id: nodeShowingInfo, color: { highlight: { border: '#2B7CE9' } } });
    graph.nodes.update({ id: nodeShowingInfo, color: { highlight: { background: '#D2E5FF' } } });
  } else {
    graph.nodes.update({ id: nodeShowingInfo, color: { border: '#3e4147' } });
    graph.nodes.update({ id: nodeShowingInfo, color: { background: '#c9cacc' } });
    graph.nodes.update({ id: nodeShowingInfo, color: { highlight: { border: '#3e4147' } } });
    graph.nodes.update({ id: nodeShowingInfo, color: { highlight: { background: '#c9cacc' } } });
  }

  graph.facade.changeNodeState(nodeShowingInfo);
});

isDebugModeCheckbox.listen('change', () => {
  if (isDebugModeCheckbox.checked) {
    graph.facade.enableDebug();
  } else {
    graph.facade.disableDebug();
  }
});

// File read handling.
document.querySelector('#file-read-button').addEventListener('click', () => {
  document.querySelector('#file-read-input').click();
});

document.getElementById('file-read-input').oninput = () => {
  [file] = document.getElementById('file-read-input').files;
};

graph.network.on('click', (properties) => {
  if (properties.nodes.length !== 0) {
    if (node1 && node2) {
      graph.nodes.update({ id: node1, font: { size: 14 } });
      node1 = node2;
      [node2] = properties.nodes;
      graph.nodes.update({ id: node1, font: { size: 16 } });
      graph.nodes.update({ id: node2, font: { size: 16 } });
    }

    if (node1 && !node2) {
      [node2] = properties.nodes;
      graph.nodes.update({ id: node2, font: { size: 16 } });
    }

    if (!node1 && !node2) {
      [node1] = properties.nodes;
      graph.nodes.update({ id: node1, font: { size: 16 } });
    }
  } else {
    if (node1) {
      graph.nodes.update({ id: node1, font: { size: 14 } });
      node1 = undefined;
    }
    if (node2) {
      graph.nodes.update({ id: node2, font: { size: 14 } });
      node2 = undefined;
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

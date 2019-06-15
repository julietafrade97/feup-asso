/* eslint-disable no-new */
const mdc = require('material-components-web');
// const plugins = require('../../models/plugins.json');
const graph = require('./graph.js');
const plugins = require('./compiled/plugins/require-list.js');


let node1;
let node2;
let file = '';

/* plugins.installed.forEach((plugin) => {
  console.log(plugin);
}); */


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

const updateInterface = () => {
  setSelectNodeOptions();
};


/**
 * Add "Install Task" and "Uninstall Task" dropdown options.
 */
function setTaskOptions(dialogId) {
  const selectInstallTask = document.querySelector(`#${dialogId} select`);
  selectInstallTask.innerHTML = '';

  const emptyOption = document.createElement('option');
  emptyOption.textContent = 'Task';
  emptyOption.value = '';
  emptyOption.selected = true;
  emptyOption.disabled = true;
  selectInstallTask.appendChild(emptyOption);

  Object.keys(plugins.AllPlugins).forEach((key) => {
    const node = document.createElement('option');
    node.value = key;
    node.textContent = key;

    selectInstallTask.appendChild(node);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setSelectNodeOptions();

  setTaskOptions('install-task-dialog');
  setTaskOptions('uninstall-task-dialog');
});

const addNodeDialog = new mdc.dialog.MDCDialog(document.querySelector('#add-node-dialog'));
const installTaskDialog = new mdc.dialog.MDCDialog(document.querySelector('#install-task-dialog'));
const uninstallTaskDialog = new mdc.dialog.MDCDialog(document.querySelector('#uninstall-task-dialog'));

addNodeDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const newNodeTitle = document.querySelectorAll('#add-node-dialog option:checked')[0].innerText;
    const node = graph.facade.addNode(newNodeTitle);
    // graph.nodes.add(node);
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
    const installed = document.querySelectorAll('#install-task-dialog option:checked')[0].innerText;
    graph.facade.uninstallPlugin(installed);
    updateInterface();
  }
});

document.querySelector('#toggle-execution-button').addEventListener('click', (evt) => {
  const button = document.querySelector('#toggle-execution-button');

  if (button.innerHTML === 'Execute') {
    button.innerHTML = 'Pause';
    // TODO: Execute logic here.
    const read = new FileReader();

    read.readAsBinaryString(file);
    read.onloadend = function () {
      graph.facade.execute(read.result);
    };
  } else if (button.innerHTML === 'Pause') {
    button.innerHTML = 'Execute';
    // TODO: Pause logic here.
  }
});

document.querySelector('#add-node').addEventListener('click', () => addNodeDialog.open());
document.querySelector('#add-edge').addEventListener('click', () => {
  if (node1 && node2) {
    // graph.edges.add({ from: node1, to: node2 });
    graph.facade.connectNodes(node1, node2);
    graph.update();
  }
  node1 = undefined; node2 = undefined;
});

// Listeners for click events which open dialogs.
document.querySelector('#install-task').addEventListener('click', () => installTaskDialog.open());
document.querySelector('#uninstall-task').addEventListener('click', () => uninstallTaskDialog.open());

// File read handling.
document.querySelector('#file-read-button').addEventListener('click', () => {
  document.querySelector('#file-read-input').click();
});

document.getElementById('file-read-input').oninput = () => {
  [file] = document.getElementById('file-read-input').files;
};

graph.network.on('click', (properties) => {
  if (properties.nodes !== undefined) {
    if (node2) [node1] = properties.nodes; node2 = undefined;

    if (!node1) [node1] = properties.nodes;
    else [node2] = properties.nodes;
  }
});

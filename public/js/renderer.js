/* eslint-disable no-new */
const mdc = require('material-components-web');
// const plugins = require('../../models/plugins.json');
const graph = require('./graph.js');
const plugins = require('./compiled/plugins/require-list.js');


let node1;
let node2;

/*plugins.installed.forEach((plugin) => {
  console.log(plugin);
}); */


document.addEventListener('DOMContentLoaded', () => {
  setSelectNodeOptions();
  setSelectInstallTaskOptions();
});

function updateInterface() {
  setSelectNodeOptions();
}

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

/**
 * Add "Install Task" dropdown options
 */
function setSelectInstallTaskOptions() {
  const selectInstallTask = document.querySelector('#install-task-dialog select');
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


const addNodeDialog = new mdc.dialog.MDCDialog(document.querySelector('#add-node-dialog'));
const installTaskDialog = new mdc.dialog.MDCDialog(document.querySelector('#install-task-dialog'));

addNodeDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    const new_node_title = document.querySelectorAll('#add-node-dialog option:checked')[0].innerText;
    const node = graph.facade.addNode(new_node_title);
    //graph.nodes.add(node);
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


document.querySelector('#add-node').addEventListener('click', () => addNodeDialog.open());
document.querySelector('#add-edge').addEventListener('click', () => {
  if (node1 && node2) {
    //graph.edges.add({ from: node1, to: node2 });
    graph.facade.connectNodes(node1, node2);
    graph.update();
  }
  node1 = undefined; node2 = undefined;
});

document.querySelector('#install-task').addEventListener('click', () => installTaskDialog.open());

graph.network.on('click', (properties) => {
  if (properties.nodes !== undefined) {
    if (node2) [node1] = properties.nodes; node2 = undefined;

    if (!node1) [node1] = properties.nodes;
    else [node2] = properties.nodes;

    console.log(node1);
  }

});

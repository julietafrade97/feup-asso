/* eslint-disable no-new */
const mdc = require('material-components-web');
const plugins = require('../../models/plugins.json');
const graph = require('./graph.js');

let node1;
let node2;

plugins.installed.forEach((plugin) => {
  console.log(plugin);
});

document.addEventListener('DOMContentLoaded', () => {
  const selectNode = document.querySelector('#add-node-dialog > select');
  /*
  graph.facade.modulesRegistry.keys().forEach((key) => {
    const node = document.createElement('option');
    node.value = key;
    node.textContent = key;

    selectNode.appendChild(node);
  });
  */
  
  document.querySelectorAll('button').forEach((btn) => { new mdc.ripple.MDCRipple(btn); });
});


const addNodeDialog = new mdc.dialog.MDCDialog(document.querySelector('#add-node-dialog'));

addNodeDialog.listen('MDCDialog:closing', (evt) => {
  if (evt.detail.action === 'yes') {
    graph.nodes.add({ label: 'New Node', title: 'ASDF' });
  }
});

document.querySelector('#add-node').addEventListener('click', () => addNodeDialog.open());
document.querySelector('#add-edge').addEventListener('click', () => {
  if (node1 && node2) graph.edges.add({ from: node1, to: node2 });
  node1 = undefined; node2 = undefined;
});

graph.network.on('click', (properties) => {
  if (node2) { [node1] = properties.nodes; node2 = undefined; }

  if (!node1) [node1] = properties.nodes;
  else [node2] = properties.nodes;
});

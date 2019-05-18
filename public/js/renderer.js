/* eslint-disable no-new */
const mdc = require('material-components-web');
const graph = require('./graph.js');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach((btn) => { new mdc.ripple.MDCRipple(btn); });
});

document.querySelector('#add-node').addEventListener('click', () => {
  graph.nodes.add({ label: 'New Node', title: 'ASDF' });
});

document.querySelector('#add-edge').addEventListener('click', () => {
  graph.edges.add({ from: 3, to: 4 });
});

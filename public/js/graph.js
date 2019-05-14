/* eslint-disable no-console */
const vis = require('vis');


const nodes = new vis.DataSet([
  { id: 1, label: 'Node 1', title: 'mensagem x' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' },
]);

// create an array with edges
const edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
]);

// create a network
const container = document.getElementById('mynetwork');

// provide the data in the vis format
const data = {
  nodes,
  edges,
};
const options = {};

// initialize your network!
const network = new vis.Network(container, data, options);
network.on('click', (properties) => {
  const updated = nodes.get(properties[0]);
  updated.title = 'cocó';
  nodes.update(nodes.get(updated.id));
  network.setData(data);
  console.log(nodes);
});

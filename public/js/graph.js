/* eslint-disable no-console */
const vis = require('vis');
const mdc = require('material-components-web');
const FacadeLib = require('./compiled/facade').Facade;

const facade = new FacadeLib();

const nodes = new vis.DataSet(facade.currentRecipe.nodes);
/* const nodes = new vis.DataSet([
  { id: 1, label: 'Node 1', title: 'One' },
  { id: 2, label: 'Node 2', title: 'Two' },
  { id: 3, label: 'Node 3', title: 'Three' },
  { id: 4, label: 'Node 4', title: 'Four' },
  { id: 5, label: 'Node 5', title: 'Five' },
]); */

// create an array with edges
const edges = new vis.DataSet([]);
/* const edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
]); */

// create a network
const container = document.getElementById('mynetwork');

// provide the data in the vis format
const data = { nodes, edges };
const options = {
  edges: {
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: 'arrow' },
    },
  },
};

// initialize your network!
const network = new vis.Network(container, data, options);

const update = () => {
  if (facade.currentRecipe.nodes.length === 0) {
    nodes.clear();
    edges.clear();
    return;
  }
  if (nodes.length !== facade.currentRecipe.nodes.length) {
    nodes.update(facade.currentRecipe.nodes);
  }

  if (edges.length !== facade.currentRecipe.edges.length) {
    edges.update(facade.currentRecipe.edges);
  }
}

module.exports = {
  network, nodes, edges, facade, update,
};

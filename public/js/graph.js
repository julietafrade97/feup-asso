const vis = require('vis');
const FacadeLib = require('./compiled/facade').Facade;

const facade = new FacadeLib();

const nodes = new vis.DataSet(facade.currentRecipe.nodes);

// create an array with edges
const edges = new vis.DataSet([]);

// create a network
const container = document.getElementById('mynetwork');

// provide the data in the vis format
const data = { nodes, edges };
const options = {
  nodes: {
    borderWidth: 0.5,
    font: {
      face: 'Roboto',
    },
  },
  edges: {
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: 'arrow' },
    },
    color: {
      color: 'black',
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

  if (nodes.length > facade.currentRecipe.nodes.length) {
    nodes.clear();
  }

  if (edges.length > facade.currentRecipe.edges.length) {
    edges.clear();
  }

  if (nodes.length !== facade.currentRecipe.nodes.length) {
    nodes.update(facade.currentRecipe.nodes);
  }

  if (edges.length !== facade.currentRecipe.edges.length) {
    edges.update(facade.currentRecipe.edges);
  }
};

module.exports = {
  network, nodes, edges, facade, update,
};

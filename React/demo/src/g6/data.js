const data = {
  nodes: [
    {
      id: "0",
      label: "0",
    },
    {
      id: "1",
      label: "1",
    },
    {
      id: "2",
      label: "2",
    },
    {
      id: "3",
      label: "3",
    },
    {
      id: "4",
      label: "4",
    },
    {
      id: "5",
      label: "5",
    },
    {
      id: "6",
      label: "6",
    },
    {
      id: "7",
      label: "7",
    },
    {
      id: "8",
      label: "8",
    },
    {
      id: "9",
      label: "9",
    },
    {
      id: "10",
      label: "10",
    },
    {
      id: "11",
      label: "11",
    },
    {
      id: "12",
      label: "12",
    },
  ],
  edges: [
    {
      source: "0",
      target: "1",
    },
    {
      source: "0",
      target: "5",
    },
    {
      source: "0",
      target: "2",
    },
    {
      source: "1",
      target: "4",
    },
    {
      source: "0",
      target: "3",
    },
    {
      source: "3",
      target: "4",
    },
    {
      source: "4",
      target: "6",
    },
    {
      source: "5",
      target: "7",
    },
    {
      source: "5",
      target: "8",
    },
    {
      source: "8",
      target: "9",
    },
    {
      source: "2",
      target: "9",
    },
    {
      source: "5",
      target: "4",
    },
    {
      source: "10",
      target: "4",
    },
    {
      source: "11",
      target: "8",
    },
    {
      source: "12",
      target: "8",
    },
    {
      source: "9",
      target: "8",
    },
  ],
};

function handleData(data) {
  const { nodes, edges } = data;

  let parents = new Map(),
    children = new Map();

  edges.forEach((edge) => {
    const { source, target } = edge;

    const _parents = parents.get(target);
    if (_parents) {
      if (!_parents.some((item) => item === source))
        parents.set(target, [..._parents, source]);
    } else {
      parents.set(target, [source]);
    }

    const _children = parents.get(source);
    if (_children) {
      if (!_children.some((item) => item === target))
        children.set(source, [..._children, target]);
    } else {
      children.set(source, [target]);
    }
  });

  nodes.forEach((node) => {
    return Object.assign(node, {
      children: children.get(node.id),
      parents: parents.get(node.id),
    });
  });
}

handleData(data);

export default data;

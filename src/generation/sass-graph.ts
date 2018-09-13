import * as sassGraph from "sass-graph";
import * as path from "path";

import { Graph, Vertice, Node } from "../graph";

export type Path = string;

export function generateGraphFromSassGraph(pathToFolder: Path): Graph {
  const sassGraphGraph = sassGraph.parseDir(pathToFolder);
  return sassGraphGraphToGraph(sassGraphGraph);
}

export function sassGraphGraphToGraph({ index, dir }: sassGraph.Graph): Graph {
  const nodeInDir = nodeInFolder.bind(null, dir);
  const graph = new Graph();

  Object.keys(index).forEach((child) => {
    const parents = index[child].importedBy;
    parents.forEach((parent) => {
      graph.addVertice(new Vertice(nodeInDir(parent), nodeInDir(child)));
    });
  });

  return graph;
}

function nodeInFolder(rootFolder: Path, node: Node): Node {
  return path.basename(path.relative(rootFolder, node), path.extname(node));
}

const fs = require('fs');

class Graph {
    constructor() {
        this.adjList = new Map();
    }

    addEdge(vertex, edge) {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
        }
        this.adjList.get(vertex).push(edge);
    }

    dfs(startNode) {
        const visited = new Set();
        const stack = [];
        const dfsTraversal = [];

        visited.add(startNode);
        stack.push(startNode);

        while (stack.length) {
            const currentVertex = stack.pop();
            dfsTraversal.push(currentVertex);

            if (this.adjList.has(currentVertex)) {
                const neighbors = this.adjList.get(currentVertex);
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        stack.push(neighbor);
                    }
                }
            }
        }

        return dfsTraversal;
    }
}

function parseGraph(inputFile) {
    const graph = new Graph();

    const data = fs.readFileSync(inputFile, 'utf8').split('\n');
    for (const line of data) {
        const [vertex, edge] = line.trim().split(' ');
        graph.addEdge(vertex, edge);
    }

    return graph;
}

function dfsTraversalProtocol(graph, startNode) {
    const dfsTraversal = graph.dfs(startNode);
    console.log('DFS Traversal Protocol:');
    console.log('------------------------');
    console.log('Current Vertex | DFS Number | Stack');
    console.log('----------------------------------');
    for (let i = 0; i < dfsTraversal.length; i++) {
        console.log(`${dfsTraversal[i]} | ${i + 1} | ${dfsTraversal.slice(0, i + 1).join(', ')}`);
    }
}

// Вхідний файл з описом графу
const inputFile = 'graph_input.txt';
// Початкова вершина
const startNode = 'A';

const graph = parseGraph(inputFile);
dfsTraversalProtocol(graph, startNode);

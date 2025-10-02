import time
import sys

def prim_algorithm(graph):
    num_vertices = len(graph)
    selected = [False] * num_vertices
    parent = [-1] * num_vertices  # Array to store constructed MST
    key = [sys.maxsize] * num_vertices  # Key values to pick minimum weight edge
    key[0] = 0  # Start from the first vertex

    for _ in range(num_vertices):
        # Pick the minimum key vertex from the set of vertices not yet included
        min_key = sys.maxsize
        u = -1
        for v in range(num_vertices):
            if not selected[v] and key[v] < min_key:
                min_key = key[v]
                u = v

        selected[u] = True

        # Update key value and parent index of the adjacent vertices
        for v in range(num_vertices):
            if graph[u][v] and not selected[v] and graph[u][v] < key[v]:
                key[v] = graph[u][v]
                parent[v] = u

    return parent

def print_mst(graph, parent):
    print("Edge \tWeight")
    for i in range(1, len(graph)):
        print(f"{parent[i]} - {i} \t{graph[i][parent[i]]}")

def measure_runtime(graph):
    start_time = time.time()
    parent = prim_algorithm(graph)
    end_time = time.time()
    runtime = end_time - start_time
    print_mst(graph, parent)
    print(f"\nPrim's algorithm runtime: {runtime:.6f} seconds")

# Example usage:
if __name__ == "__main__":
    graph = [
        [0, 2, 0, 6, 0],
        [2, 0, 3, 8, 5],
        [0, 3, 0, 0, 7],
        [6, 8, 0, 0, 9],
        [0, 5, 7, 9, 0]
    ]
    measure_runtime(graph)

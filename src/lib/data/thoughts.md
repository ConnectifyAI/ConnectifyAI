
in what situtations are we requesting graphs from the database

- when a user searches for graph, it should show up.

fundamentally models and datasets are created from huggingface while
we host the graphs,


when we get the model and graph data from hugging face we need to create 
a type to contain it, which is the same as the tpe that gets returned from the graph
that would make it super easy for here to be consistent communication
for kenric and the graph to work properly.

1. inspect the type returned from the db

2. make the huggingface type cast to that on request from client


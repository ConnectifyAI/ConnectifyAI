# Dataset

Node id
Node type (dataset/model)
Position

Repo id
Out Features : [{
name: output name, dtype: string
}]
Out Features \_state: [{handle id, isSelected}]
// either like the above, OR store together where output name is handle_id, isSelected added to object
// model have both in_feature and out_feature

Edge id
Source
Source handle id
Target
Target handle id

# Node creation process

1. Select node type
2. Place node on canvas
3. Generate node id and position
4. Select hf dataset/model, get repo id
5. Fetch features; for each feature, create handle and map it to a feature

# Edge creation process

1. Connect input to output handle
2. On connect, update database? Auto adds to edges writable, could update that whole thing every 30 sec too

# Question

1. will data be fetched from hf if the node already exists?
   - if hf dataset/model can't be changed, then database will have accurate data, might be easier to fetch from database?
   - such that, on selecting a model/dataset, create a node object to store on database (all relevant info packaged together)

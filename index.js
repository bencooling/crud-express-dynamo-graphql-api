const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const { dynamodb, rawItem, formatItem } = require('./util');
const schemaFile = require('fs').readFileSync('./schema.graphql', 'utf8');

const app = express();
const PORT = 3000;
const TableName = 'artifact';

const schema = buildSchema(schemaFile);

// The root provides a resolver function for each API endpoint
const create = ({ artifcat }) => dynamodb.putItem({
    TableName,
    Expected: { name: { Exists: false } },
    Item: formatItem(artifcat),
  }).promise()
    .then(() => artifcat)
    .catch((e) => { throw new Error(e) });

const list = () => dynamodb.scan({ TableName }).promise()
  .then(data => data.Items.map(rawItem));

const read = ({ name }) => dynamodb.getItem({
    TableName,
    Key: { name: { S: name } },
  }).promise()
    .then(res => rawItem(res.Item))
    .catch((e) => { throw new Error(e) });

const root = {
  create,
  list,
  read
};

app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // interactive
}));

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log('GraphQL listening at http://%s:%s', address, port);
});

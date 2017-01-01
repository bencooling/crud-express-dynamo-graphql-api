const { dynamodb } = require('./../util');

exports.up = next => {
  const params = {
    TableName: 'artifact',
    KeySchema: [{ AttributeName: 'name', KeyType: 'HASH' }], // Partition key
    AttributeDefinitions: [
      { AttributeName: 'name', AttributeType: 'S' },
      { AttributeName: 'location', AttributeType: 'S' },
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    GlobalSecondaryIndexes: [{ // GSI 1:1
      IndexName: 'location_artifact',
      KeySchema: [{ AttributeName: 'location', KeyType: 'HASH' }],
      Projection: { ProjectionType: 'ALL' },
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    }],
  };

  dynamodb.createTable(params, (err, data) => {
    console.dir(err ? err : data);
    next();
  });
};

exports.down = next => {
  next();
};

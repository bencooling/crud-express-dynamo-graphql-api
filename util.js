// AWS boilerplate
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
});

const dynamodb = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

const rawItem = item =>
  Object.keys(item).reduce((obj, key) => {
    obj[key] = item[key].S;
    return obj;
  }, {});

const formatItem = item =>
  Object.keys(item).reduce((obj, key) => {
    obj[key] = { S: item[key] };
    return obj;
  }, {});

// API
module.exports = {
  rawItem,
  formatItem,
  dynamodb,
  documentClient,
};

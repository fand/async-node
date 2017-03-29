const MongoClient = require('mongodb').MongoClient;

// Parse args
const o = require('minimist')(process.argv.slice(2));
if (!(o.s || o.set || o.g || o.get)) {
  console.log(`
  Usage:
    $ async-node index.js -s '{"name":"foo"}'
    $ async-node index.js -g '{"name":"foo"}'
  `);
  process.exit(-1);
}

// Parse JSON
let doc;
try {
  doc = JSON.parse(`${o.s || o.set || o.g || o.get}`);
} catch (e) {
  console.error('Invalid JSON format');
  process.exit(-1);
}

// Connect to MongoDB
const db = await MongoClient.connect('mongodb://localhost:27017/async-node-example-mongo');
const collection = db.collection('async-node-example-mongo');

// Execute
if (o.s || o.set) {
  const res = await collection.insertOne(doc);
  console.log(res.ops[0]);
}
if (o.g || o.get) {
  const res = await collection.findOne(doc);
  console.log(res);
}

db.close();

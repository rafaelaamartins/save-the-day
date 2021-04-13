const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_CREDENTIALS}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`, 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  console.log('[SUCCESS] - Mongo Connected');
}).catch(() => {
  console.log('[ERROR] - Mongo Not Connected');
});

mongoose.Promise = global.Promise;
module.exports = mongoose;
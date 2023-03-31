const PORT = 3000;
const { db } = require("./db");
const app = require('./app');


db.sync().then(() => {
    app.listen(PORT, () =>
      console.log(`
  
          Listening on port ${PORT}
  
          http://localhost:${PORT}/
  
      `)
    );
  });
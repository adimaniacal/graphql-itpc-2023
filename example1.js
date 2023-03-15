const express = require("express");
const app = express();
const port = 3000;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schema");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});

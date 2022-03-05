import express from "express";
import { graphqlHTTP } from "express-graphql";
import { bodyParserGraphQL } from "body-parser-graphql";

import schema from "./schema/schema.js";

const app = express();
app.use(bodyParserGraphQL());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.listen(4000, () => {
  console.log("App is running on port 4000");
});

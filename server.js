/**
 * Created by ayanez on 5/27/19.
 */

const Express = require('express');
const GraphHTTP = require('express-graphql');
const Schema = require('./schema').Schema;

console.log(Schema)

const APP_PORT = process.env.PORT || 3000;

const app = Express();

app.use('/graphql', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

app.listen(APP_PORT, ()=>{
    console.log(`App listening on port ${APP_PORT}`)
})
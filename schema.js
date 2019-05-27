/**
 * Created by ayanez on 5/25/19.
 */
const graphql = require('graphql');
const
  GraphQLObjectType = graphql.GraphQLObjectType,
  GraphQLInt = graphql.GraphQLInt,
  GraphQLString = graphql.GraphQLString,
  GraphQLList = graphql.GraphQLList,
  GraphQLSchema = graphql.GraphQLSchema;
const Db = require('./db');


const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a Person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person) {
                    return person.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(person){
                    return person.firstName
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(person){
                    return person.lastName
                }
            },
            email: {
                type: GraphQLString,
                resolve(person){
                    return person.email
                }
            }
        }
    }
});
const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'This is a Post',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(post) {
                    return post.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(post){
                    return post.title
                }
            },
            content: {
                type: GraphQLString,
                resolve(post){
                    return post.content
                }
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () =>{
        return {
            people: {
                type: GraphQLList(Person),
                args:{
                    id: {
                        type: GraphQLInt,
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.person.findAll({where: args});
                }
            },
            posts: {
              type: GraphQLList(Post),
              args: {
                id: {
                  type: GraphQLInt
                },
                title:{

                }
              }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query
});




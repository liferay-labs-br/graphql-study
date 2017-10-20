const graphql = require('graphql');
const _ = require('lodash');

const {
	GraphQLInt,
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema
} = graphql;

const users = [
	{ id: '1', firstName: 'Diego', age: 19 },
	{ id: '2', firstName: 'Matuza', age: 20 },
	{ id: '3', firstName: 'Aline', age: 18 },
	{ id: '4', firstName: 'Adriano', age: 18 }
];

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		age: { type: GraphQLInt },
		firstName: { type: GraphQLString },
		id: { type: GraphQLString }
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return _.find(users, { id: args.id })
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
const { GraphQLServer } = require("graphql-yoga");

let links = [
	{
		id: "link-0",
		url: "www.dorelljames.com",
		description: "Fullstack tutorial for GraphQL"
	}
];

let idCount = links.length;
const resolvers = {
	Query: {
		info: () => `This is the API for Hackernews Clone`,
		feed: () => links
	},
	Mutation: {
		post: (root, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url
			};
			links.push(link);
			return link;
		},
		updateLink: (root, args) => {
			const linkIndex = links.findIndex(link => (link.id = args.id));

			console.log(args.url !== undefined);

			if (args.url !== undefined) {
				links[linkIndex].url = args.url;
			}
			links[linkIndex].description =
				args.description !== undefined
					? args.description
					: links[linkIndex].description;

			console.log(links);
			return links[linkIndex];
		},
		deleteLink: (root, args) => {
			const linkIndex = links.findIndex(link => (link.id = args.id));

			copy = links[linkIndex];

			delete links[linkIndex];

			return copy;
		}
	}
};

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers
});
server.start(() => console.log("Server is running on http://localhost:4000"));

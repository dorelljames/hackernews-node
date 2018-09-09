function user(roots, args, context, info) {
	return context.db.query.user(
		{
			where: { id: roots.user.id }
		},
		info
	);
}

module.exports = { user };

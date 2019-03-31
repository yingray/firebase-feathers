// q === parsed.d.b.q
export const paginateRef = (ref, q) => {
	if (q) {
		Object.keys(q).forEach(key => {
			const value = q[key];
			switch (key) {
				case "sp": {
					ref = q["sn"] ? ref.startAt(value, q["sn"]) : ref.startAt(value);
					break;
				}
				case "ep": {
					ref = q["en"] ? ref.endAt(value, q["en"]) : ref.endAt(value);
					break;
				}
				case "i": {
					if (value === ".key") {
						ref = ref.orderByKey();
					} else if (value === ".value") {
						ref = ref.orderByValue();
					} else {
						ref = ref.orderByChild(value);
					}
					break;
				}
				case "l": {
					ref = q.vf === "l" ? ref.limitToFirst(value) : ref.limitToLast(value);
					break;
				}
				default: {
					break;
				}
			}
		});
	}
	return ref;
};

export const getPaginateQuery = q => {
	if (!q) {
		return {};
	}
	const query = { query: {} };

	// sort
	// order by key, value, child
	const order = q.vf === "l" ? 1 : -1; // 1 ascending, -1 descending
	const keyOfOrderBy = "i";
	const value = q[keyOfOrderBy];
	const orderName = value === ".key" || value === ".value" || !value ? "id" : value;
	if (q.hasOwnProperty(keyOfOrderBy)) {
		// start at
		if (order === 1) {
			if (q.hasOwnProperty("sp")) {
				query.query = { ...query.query, [orderName]: { $gte: q["sp"] } };
			}
			if (q.hasOwnProperty("ep")) {
				query.query = { ...query.query, [orderName]: { $gte: q["ep"] } };
			}
		}
		// end at
		if (order === -1) {
			if (q.hasOwnProperty("sp")) {
				query.query = { ...query.query, [orderName]: { $lte: q["sp"] } };
			}
			if (q.hasOwnProperty("ep")) {
				query.query = { ...query.query, [orderName]: { $lte: q["ep"] } };
			}
		}
	}

	// limit
	// limit to first, last
	const keyOfLimit = "l";
	if (q.hasOwnProperty(keyOfLimit)) {
		const value = q[keyOfLimit];
		query.query = { ...query.query, $sort: { [orderName]: order } };
		query.query = { ...query.query, $limit: value };
	}

	console.log("query: ", JSON.stringify(query));
	return query;
};

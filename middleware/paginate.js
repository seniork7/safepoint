/**
 * ? Pagination middleware to regualte the limit, offset and
 * ? location based on the request from the client
 */

const paginate = (req, res, next) => {
	req.limit = parseInt(req.query.limit) || 20;
	req.offset = parseInt(req.query.offset) || 0;
	req.location = req.query.location || null;
	next();
};

export default paginate;

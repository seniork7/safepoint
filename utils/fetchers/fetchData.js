/**
 *  This is a reusable fetch function
 */

const fetchData = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok)
			throw new Error(
				`${response.status} ${response.statusText} - ${response.url}`,
			);

		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			throw new Error('Response is not JSON');
		}

		return response.json();
	} catch (error) {
		console.log(
			`There was a problem while fetching the data: ${error.message}`,
		);

		return null;
	}
};

export default fetchData;

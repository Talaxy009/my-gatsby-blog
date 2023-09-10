import type {
	Handler,
	HandlerEvent,
	HandlerContext,
	HandlerResponse,
} from '@netlify/functions';
import {getTweet} from 'react-tweet/api';

const headers: HandlerResponse['headers'] = {
	'Access-Control-Allow-Origin': 'http://localhost:8000',
};

export const handler: Handler = async (
	event: HandlerEvent,
	_context: HandlerContext,
) => {
	const tweetId = event.path.split('/').pop();

	console.log({tweetId});

	if (event.httpMethod !== 'GET' || typeof tweetId !== 'string') {
		return {
			headers,
			statusCode: 400,
			body: JSON.stringify({error: 'Bad Request.'}),
		};
	}

	try {
		const tweet = await getTweet(tweetId);

		return {
			headers,
			statusCode: tweet ? 200 : 404,
			body: JSON.stringify({data: tweet ?? null}),
		};
	} catch (error) {
		console.error(error);
		return {
			headers,
			statusCode: 400,
			body: JSON.stringify({error: error.message ?? 'Bad request.'}),
		};
	}
};

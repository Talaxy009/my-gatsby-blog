import React from 'react';
import {Tweet as ReactTweet, TweetSkeleton} from 'react-tweet';
import {useHasMounted, useSiteMetadata} from '../utils/hooks';

export default function Tweet({id = ''}) {
	const siteMetaData = useSiteMetadata();
	const hasMounted = useHasMounted();

	return hasMounted ? (
		<ReactTweet apiUrl={`${siteMetaData.siteUrl}/api/tweet/${id}`} />
	) : (
		<TweetSkeleton />
	);
}

import React from 'react';
import {Tweet as ReactTweet, TweetSkeleton} from 'react-tweet';
import {useHasMounted, useSiteInfo} from '../utils/hooks';

export default function Tweet({id = ''}) {
	const {siteMetadata} = useSiteInfo();
	const hasMounted = useHasMounted();

	return hasMounted ? (
		<ReactTweet apiUrl={`${siteMetadata.siteUrl}/api/tweet/${id}`} />
	) : (
		<TweetSkeleton />
	);
}

import React from 'react';
import {Tweet as ReactTweet} from 'react-tweet';
import { useSiteMetadata } from '../utils/hooks';

export default function Tweet({id = ''}) {
    const siteMetaData = useSiteMetadata();

    return <ReactTweet apiUrl={`${siteMetaData.siteUrl}/api/tweet/${id}`} />
}
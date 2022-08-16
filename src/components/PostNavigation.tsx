import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'gatsby';

const Box = styled.div`
	display: flex;
	max-width: 40%;
	flex-direction: column;
`;

export function Previous({post}) {
	if (!post) {
		return null;
	}
	return (
		<Box>
			<span>上一篇</span>
			<Link to={post.fields.slug} rel="prev">
				{post.frontmatter.title}
			</Link>
		</Box>
	);
}

export function Next({post}) {
	if (!post) {
		return null;
	}
	return (
		<Box style={{textAlign: 'right'}}>
			<span>下一篇</span>
			<Link to={post.fields.slug} rel="post">
				{post.frontmatter.title}
			</Link>
		</Box>
	);
}

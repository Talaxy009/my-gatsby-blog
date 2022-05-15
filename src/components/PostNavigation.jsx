import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'gatsby';

const Box = styled.div`
	display: flex;
	max-width: 40%;
	flex-direction: column;
`;

export function Previous({previous}) {
	if (!previous) {
		return null;
	}
	return (
		<Box>
			<span>上一篇</span>
			<Link to={previous.fields.slug} rel="prev">
				{previous.frontmatter.title}
			</Link>
		</Box>
	);
}

export function Next({next}) {
	if (!next) {
		return null;
	}
	return (
		<Box style={{textAlign: 'right'}}>
			<span>下一篇</span>
			<Link to={next.fields.slug} rel="next">
				{next.frontmatter.title}
			</Link>
		</Box>
	);
}

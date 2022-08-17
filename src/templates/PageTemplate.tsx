import React from 'react';
import {graphql} from 'gatsby';
import {H1, P, Hr, Section} from '../components/Typography';
import Layout from '../components/Layout';
import Valine from '../components/Valine';
import SEO from '../components/SEO';

import type {HeadProps, PageProps} from 'gatsby';

export default function PageTemplate({
	data,
	path,
}: PageProps<Queries.PageDataQuery>) {
	if (!data.markdownRemark) return null;
	const {frontmatter, html, fields} = data.markdownRemark;

	return (
		<Layout path={path}>
			<article>
				<header>
					<H1>{frontmatter.title}</H1>
					<P>{frontmatter.description}</P>
				</header>
				<Section dangerouslySetInnerHTML={{__html: html || ''}} />
				<Hr />
			</article>
			<Valine path={fields.slug || ''} />
		</Layout>
	);
}

export function Head({data}: HeadProps<Queries.PageDataQuery>) {
	if (!data.markdownRemark) return null;
	const {frontmatter} = data.markdownRemark;

	return (
		<SEO title={frontmatter.title} description={frontmatter.description} />
	);
}

export const pageQuery = graphql`
	query PageData($id: String!) {
		markdownRemark(id: {eq: $id}) {
			html
			fields {
				slug
			}
			frontmatter {
				title
				description
			}
		}
	}
`;

import React from 'react';
import {graphql} from 'gatsby';
import Waline from 'gatsby-plugin-waline';
import {H1, P, Hr, Section} from '../components/Typography';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import type {HeadProps, PageProps} from 'gatsby';

export default function PageTemplate({data}: PageProps<Queries.PageDataQuery>) {
	if (!data.markdownRemark) return null;
	const {frontmatter, html, fields} = data.markdownRemark;

	return (
		<Layout>
			<article>
				<header>
					<H1>{frontmatter.title}</H1>
					<P>{frontmatter.description}</P>
				</header>
				<Section dangerouslySetInnerHTML={{__html: html || ''}} />
				<Hr />
			</article>
			<Waline path={fields.slug} />
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

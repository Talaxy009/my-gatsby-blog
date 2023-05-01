import React from 'react';
import {graphql} from 'gatsby';
import Waline from 'gatsby-plugin-waline';
import {Hr, Section} from '../components/Typography';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import type {HeadProps, PageProps} from 'gatsby';
import Banner from '../components/Banner';

export default function PageTemplate({
	data,
	children,
}: PageProps<Queries.PageDataQuery>) {
	if (!data.mdx) return null;
	const {frontmatter, fields} = data.mdx;

	return (
		<Layout>
			<article>
				<header>
					<Banner
						title={frontmatter.title}
						description={frontmatter.description}
					/>
				</header>
				<Section>{children}</Section>
				<Hr />
			</article>
			<Waline path={fields.slug} />
		</Layout>
	);
}

export function Head({data}: HeadProps<Queries.PageDataQuery>) {
	if (!data.mdx) return null;
	const {frontmatter} = data.mdx;

	return (
		<SEO title={frontmatter.title} description={frontmatter.description} />
	);
}

export const pageQuery = graphql`
	query PageData($id: String!) {
		mdx(id: {eq: $id}) {
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

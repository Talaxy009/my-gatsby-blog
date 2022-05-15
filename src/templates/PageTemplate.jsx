import React from 'react';
import {graphql} from 'gatsby';
import {H1, P, Hr, Section} from '../components/Typography';
import Layout from '../components/Layout';
import Valine from '../components/Valine';
import SEO from '../components/SEO';

export default function PageTemplate({data, location}) {
	const {siteMetadata} = data.site;
	const {frontmatter, html, fields} = data.markdownRemark;

	return (
		<Layout location={location}>
			<SEO
				title={frontmatter.title}
				description={
					frontmatter.description || siteMetadata.description
				}
			/>
			<article>
				<header>
					<H1>{frontmatter.title}</H1>
					<P>{frontmatter.description}</P>
				</header>
				<Section dangerouslySetInnerHTML={{__html: html}} />
				<Hr />
			</article>
			<Valine path={fields.slug} />
		</Layout>
	);
}

export const pageQuery = graphql`
	query ($id: String!) {
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
		site {
			siteMetadata {
				title
				description
			}
		}
	}
`;

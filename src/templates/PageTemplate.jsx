import React from 'react';
import {graphql} from 'gatsby';
import Valine from 'gatsby-plugin-valine';
import {H1, P, Hr, Section} from '../components/Typography';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function PageTemplate({data, pageContext, location}) {
	const {siteMetadata} = data.site;
	const {frontmatter} = data.markdownRemark;

	return (
		<Layout location={location}>
			<SEO
				title={`${frontmatter.title} | ${siteMetadata.title}`}
				description={
					frontmatter.description || siteMetadata.description
				}
			/>
			<article>
				<header>
					<H1>{frontmatter.title}</H1>
					<P>{frontmatter.description}</P>
				</header>
				<Section
					dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}
				/>
				<Hr />
			</article>
			<Valine path={pageContext.slug} />
		</Layout>
	);
}

export const pageQuery = graphql`
    query ($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            html
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

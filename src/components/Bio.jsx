import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';
import styled from 'styled-components';
import {Twitter, Github, Pixiv} from './Links';

const Root = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 1rem;
`;

const Section = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
`;

const Area = styled.div`
	display: flex;
	margin-left: 1rem;
	flex-direction: column;
`;

const Line = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 4px;
`;

export default function Bio() {
	const data = useStaticQuery(graphql`
		{
			avatar: file(relativePath: {regex: "/profile.jpg/"}) {
				childImageSharp {
					gatsbyImageData(layout: FIXED)
				}
			}
			site {
				buildTime(formatString: "YYYY 年 MM 月 DD 日")
				siteMetadata {
					author {
						name
						summary
					}
					social {
						twitter
						github
						pixiv
					}
				}
			}
		}
	`);

	const {author, social} = data.site.siteMetadata;

	return (
		<Root>
			<GatsbyImage
				image={data.avatar.childImageSharp.gatsbyImageData}
				alt={author.name}
				style={{
					width: 90,
					height: 90,
					borderRadius: '50%',
				}}
				imgStyle={{
					borderRadius: '50%',
				}}
			/>
			<Section>
				<Area>
					<Line>
						由<strong>{author.name}</strong>创作
					</Line>
					<Line>{author.summary}</Line>
					<Line>
						<Twitter id={social.twitter} />
						<Github id={social.github} />
						<Pixiv id={social.pixiv} />
					</Line>
				</Area>
				<Area>
					<Line>
						<strong>上次更新</strong>
					</Line>
					<Line>{data.site.buildTime}</Line>
				</Area>
			</Section>
		</Root>
	);
}

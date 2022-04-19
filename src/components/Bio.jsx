import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import {Twitter, Github, Pixiv, Link} from './Links';

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
	@media (max-width: 450px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Area = styled.div`
	display: flex;
	margin-left: 1rem;
	flex-direction: column;
`;

const Line = styled.div`
	display: flex;
	flex-direction: row;
	margin: 1px 0;
	align-items: center;
`;

const NameBox = styled.a`
	font-weight: bold;
`;

export default function Bio() {
	const data = useStaticQuery(graphql`
		{
			avatar: file(relativePath: {regex: "/profile.png/"}) {
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
				image={getImage(data.avatar)}
				alt={author.name}
				style={{
					width: '90px',
					height: '90px',
					borderRadius: '50%',
				}}
				imgStyle={{
					borderRadius: '50%',
				}}
			/>
			<Section>
				<Area>
					<Line>
						由
						<NameBox href="/about/" title="关于">
							{author.name}
						</NameBox>
						创作
					</Line>
					<Line>{author.summary}</Line>
					<Line>
						<Twitter id={social.twitter} />
						<Github id={social.github} />
						<Pixiv id={social.pixiv} />
						<Link />
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

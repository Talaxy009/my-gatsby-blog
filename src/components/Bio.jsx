import React from 'react';
import {useStaticQuery, graphql, navigate} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';
import Tooltip from '@mui/material/Tooltip';
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
	margin: 1px 0;
	align-items: center;
`;

const AvatarBox = styled.div`
	width: 90px;
	height: 90px;
	:hover {
		cursor: pointer;
	}
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
			<Tooltip title="关于">
				<AvatarBox onClick={() => navigate('/about/')}>
					<GatsbyImage
						image={data.avatar.childImageSharp.gatsbyImageData}
						alt={author.name}
						style={{
							width: '100%',
							height: '100%',
							borderRadius: '50%',
						}}
						imgStyle={{
							borderRadius: '50%',
						}}
					/>
				</AvatarBox>
			</Tooltip>
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

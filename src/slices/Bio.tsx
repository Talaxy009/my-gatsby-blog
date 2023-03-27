import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {useStaticQuery, graphql} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import {Twitter, Github, Pixiv, YouTube, Telegram, Link} from '../components/Links';

const Root = styled.div`
	display: flex;
	padding: 1rem;
	overflow: hidden;
	flex-direction: row;
	margin-bottom: 1rem;
	border-radius: 12px;
	background-color: rgba(150, 180, 180, 0.05);
	box-shadow: 0 2px 5px rgba(10, 20, 20, 0.2);
	transition: all 0.6s cubic-bezier(0, 0, 0.4, 1);
	:hover {
		background-color: rgba(150, 180, 180, 0.1);
		box-shadow: 0 6px 10px rgba(10, 20, 20, 0.2);
	}
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
	gap: 4px;
`;

const LinkList = styled.nav`
	display: flex;
	flex-direction: row;
	gap: 8px;
`;

const NameBox = styled.a`
	font-weight: bold;
`;

export default function Bio() {
	const data = useStaticQuery<Queries.BioDataQuery>(graphql`
		query BioData {
			avatar: file(relativePath: {regex: "/profile.png/"}) {
				childImageSharp {
					gatsbyImageData(
						width: 100
						layout: FIXED
					)
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
						youtube
						telegram
					}
				}
			}
		}
	`);

	if (!data.site) {
		return null;
	}

	const {author, social} = data.site.siteMetadata;
	const avatar = getImage(data.avatar?.childImageSharp || null);

	return (
		<Root>
			{avatar ? (
				<GatsbyImage
					image={avatar}
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
			) : (
				<Skeleton variant="circular" width={90} height={90} />
			)}
			<Section>
				<Area>
					<NameBox href="/about/" title="关于">
						{author.name}
					</NameBox>
					<span>{author.summary}</span>
					<LinkList>
						<Twitter id={social.twitter} />
						<Github id={social.github} />
						<Pixiv id={social.pixiv} />
						<YouTube id={social.youtube} />
						<Telegram id={social.telegram} />
						<Link />
					</LinkList>
				</Area>
				<Area>
					<strong>上次更新</strong>
					<span>{data.site.buildTime}</span>
				</Area>
			</Section>
		</Root>
	);
}

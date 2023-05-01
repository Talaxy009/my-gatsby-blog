import styled from '@emotion/styled';

export const H1 = styled.h1`
	margin-bottom: 0;
	margin-top: 1em;
	font-size: 2.5em;
`;

export const P = styled.p`
	margin-bottom: 0.8rem;
	display: block;
`;

export const Hr = styled.hr`
	margin-bottom: 0.8rem;
`;

export const Pagination = styled.nav`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	margin-top: 2rem;
	margin-bottom: 1rem;
	justify-content: space-between;
	@media (max-width: 600px) {
		flex-direction: column;
	}
	&:before {
		content: '接下来不妨看看：';
		margin: 1rem 0;
		font-size: 1.4rem;
		width: 100%;
	}
`;

export const Section = styled.section`
	font-size: 1.1em;
	counter-reset: section;
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 1.6em;
		margin-bottom: 0.8em;
		::before {
			margin-right: 0.4em;
			color: var(--md-sys-color-outline);
		}
	}
	h2 {
		counter-reset: subSection;
		::before {
			counter-increment: section;
			content: counter(section);
		}
	}
	h3::before {
		counter-increment: subSection;
		content: counter(section) '.' counter(subSection);
	}
	p {
		line-height: 2rem;
	}
	li {
		margin: 2px 0;
		::marker {
			color: var(--md-sys-color-outline);
		}
	}
	a.anchor {
		vertical-align: middle;
	}
`;

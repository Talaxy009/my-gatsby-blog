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

export const Pagination = styled.div`
	margin-top: 2rem;
	margin-bottom: 1rem;
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const Left = styled.div`
	display: flex;
	max-width: 40%;
	flex-direction: column;
`;

export const Right = styled.div`
	display: flex;
	max-width: 40%;
	flex-direction: column;
	text-align: right;
`;

export const Section = styled.section`
	font-size: 1.1em;
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 2.5rem;
		margin-bottom: 1.5rem;
	}
	p {
		line-height: 2rem;
	}
	li {
		margin: 2px 0;
	}
`;
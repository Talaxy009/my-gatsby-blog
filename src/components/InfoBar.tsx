import React from 'react';
import styled from '@emotion/styled';
import InfoIcon from '@mui/icons-material/InfoOutlined';

const BarRoot = styled.div`
	width: 100%;
	display: flex;
	padding: 0.8rem;
	overflow: hidden;
	border-radius: 24px;
	align-items: center;
	box-sizing: border-box;
	color: var(--md-sys-color-on-secondary-container);
	background-color: var(--md-sys-color-secondary-container);
	svg {
		margin-right: 0.6rem;
	}
`;

export default function InfoBar({children}: {children: React.ReactNode}) {
	return (
		<BarRoot>
			<InfoIcon />
			<div>{children}</div>
		</BarRoot>
	);
}

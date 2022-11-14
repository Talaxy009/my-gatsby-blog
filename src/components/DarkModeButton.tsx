import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import styled from '@emotion/styled';
import {useHasMounted} from '../utils/hooks';

import type {DarkMode} from 'use-dark-mode';

const Svg = styled.svg`
	width: 32px;
	height: 32px;
`;

export default function DarkModeButton({mode}: {mode: DarkMode}) {
	const hasMounted = useHasMounted();

	if (!hasMounted)
		return <Skeleton variant="circular" width={48} height={48} />;
	return (
		<Tooltip title={`${mode.value ? '关闭' : '打开'}夜间模式`}>
			<IconButton onClick={mode.toggle}>
				<Moon />
				<Sun />
			</IconButton>
		</Tooltip>
	);
}

function Sun() {
	return (
		<Svg id="sun-icon" viewBox="0 0 512 512">
			<path
				fill="#ff9800"
				d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"
			/>
		</Svg>
	);
}

function Moon() {
	return (
		<Svg id="moon-icon" viewBox="0 0 512 512">
			<path
				fill="#ffb74d"
				d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z"
			/>
		</Svg>
	);
}
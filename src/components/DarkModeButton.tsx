import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import MoonIcon from '@mui/icons-material/DarkModeRounded';
import SunIcon from '@mui/icons-material/WbSunnyRounded';

import {useHasMounted} from '../utils/hooks';
import {useDarkMode} from '../utils/darkMode';

export default function DarkModeButton() {
	const hasMounted = useHasMounted();
	const [mode, {toggle}] = useDarkMode();

	const handleClick = (event: React.MouseEvent) => {
		// @ts-expect-error: Transition API
		if (!document.startViewTransition) {
			toggle();
			return;
		}
		const x = event.clientX;
		const y = event.clientY;
		const endRadius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y),
		);
		// @ts-expect-error: Transition API
		const transition = document.startViewTransition(toggle);
		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`,
			];
			document.documentElement.animate(
				{
					clipPath,
				},
				{
					duration: 500,
					easing: 'ease-in',
					pseudoElement: '::view-transition-new(root)',
				},
			);
		});
	};

	if (!hasMounted)
		return <Skeleton variant="circular" width={51} height={51} />;
	return (
		<Tooltip title={`${mode ? '关闭' : '打开'}夜间模式`}>
			<IconButton className="darkModeBtn" onClick={handleClick}>
				<MoonIcon id="moon-icon" htmlColor="#ffb74d" fontSize="large" />
				<SunIcon id="sun-icon" htmlColor="#ff9800" fontSize="large" />
			</IconButton>
		</Tooltip>
	);
}

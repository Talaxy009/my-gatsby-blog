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

	if (!hasMounted)
		return <Skeleton variant="circular" width={43} height={43} />;
	return (
		<Tooltip title={`${mode ? '关闭' : '打开'}夜间模式`}>
			<IconButton className='darkModeBtn' onClick={toggle}>
				<MoonIcon id="moon-icon" htmlColor='#ffb74d' fontSize='large' />
				<SunIcon id="sun-icon" htmlColor='#ff9800' fontSize='large' />
			</IconButton>
		</Tooltip>
	);
}

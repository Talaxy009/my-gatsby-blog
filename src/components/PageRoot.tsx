import React from 'react';
import {DarkModeProvider} from '../utils/darkMode';

export default function PageRoot({element}: {element: React.ReactElement}) {
	return <DarkModeProvider>{element}</DarkModeProvider>;
}

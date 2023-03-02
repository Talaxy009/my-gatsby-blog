import React, {useState, useEffect, useCallback, useContext} from 'react';

const preferDarkQuery = '(prefers-color-scheme: dark)';
const DarkModeContext = React.createContext(false);
const DarkModeActionContext = React.createContext({
	setMode: (p: boolean) => {},
	toggle: () => {},
});

type ProviderProps = {
	storageKey?: string;
	classNameDark?: string;
	classNameLight?: string;
	children: React.ReactNode;
};

type Listener = (p: MediaQueryListEvent) => void;

export function DarkModeProvider({
	children,
	storageKey = 'darkMode',
	classNameDark = 'dark-mode',
	classNameLight = 'light-mode',
}: ProviderProps) {
	const [darkMode, setDarkMode] = useState(false);

	const listener: Listener = ({matches}) => setMode(matches);

	const setMode = (val: boolean) => {
		setDarkMode(val);
		localStorage.setItem(storageKey, val ? 'true' : 'false');
		document.body.classList.add(val ? classNameDark : classNameLight);
		document.body.classList.remove(val ? classNameLight : classNameDark);
	};

	const toggle = useCallback(() => {
		setMode(!darkMode);
	}, [darkMode]);

	useEffect(() => {
		const isDarkMode = document.body.classList.contains(classNameDark);
		setDarkMode(isDarkMode);

		const mql = matchMedia(preferDarkQuery);
		if (mql.media === preferDarkQuery) {
			mql.addEventListener('change', listener);
			return () => mql.removeEventListener('change', listener);
		}
	}, []);

	return (
		<DarkModeContext.Provider value={darkMode}>
			<DarkModeActionContext.Provider value={{setMode, toggle}}>
				{children}
			</DarkModeActionContext.Provider>
		</DarkModeContext.Provider>
	);
}

export const useDarkModeValue = () => {
	return useContext(DarkModeContext);
};

export const useDarkModeAction = () => {
	return useContext(DarkModeActionContext);
};

export const useDarkMode = () => {
	return [
		useContext(DarkModeContext),
		useContext(DarkModeActionContext),
	] as const;
};

import React from "react";

/**
 * 当页面加载完成时由 false 变为 true
 */
export function useHasMounted() {
	const [hasMounted, setHasMounted] = React.useState(false);
	React.useEffect(() => {
		setHasMounted(true);
	}, []);
	return hasMounted;
}

import React from 'react';
import {RecoilRoot} from 'recoil';

export default function GatsbyRecoil({element}: {element: React.ReactElement}) {
	return <RecoilRoot>{element}</RecoilRoot>;
}

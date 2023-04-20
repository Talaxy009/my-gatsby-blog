import React from 'react';

export default function LinkCard({
	link = '',
	title = '',
	descripition = '',
	img = '',
}) {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="link-card-container">
			<div className="link-card-wrapper">
				<div className="link-card-text">
					<div className="link-card-title">{title}</div>
					{descripition && (
						<div className="link-card-description">
							{descripition}
						</div>
					)}
				</div>
				<div className="link-card-url">
					<div className="link-card-link">{link}</div>
				</div>
			</div>
			{img && (
				<div className="link-card-image-wrapper">
					<img
						className="link-card-image"
						alt={`${title}-image`}
						src={img}
					/>
				</div>
			)}
		</a>
	);
}

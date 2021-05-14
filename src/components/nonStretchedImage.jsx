import React from 'react';
import Image from 'gatsby-image';

const NonStretchedImage = (props) => {
	let normalizedProps = props;
	if (props.fluid && props.fluid.presentationWidth) {
		normalizedProps = {
			...props,
			style: {
				...(props.style || {}),
				maxWidth: props.fluid.presentationWidth,
				// maxHeight: window.innerHeight - 50px,
				height: window.innerHeight - 50,
        maxHeight: '90vh',
				width: 'auto',
				margin: '50px auto 0', // Used to center the image
			},
		};
	}

	return <Image {...normalizedProps} />;
};
export default NonStretchedImage;

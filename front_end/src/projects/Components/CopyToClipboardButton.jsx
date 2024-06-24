import React from 'react';

export default function CopyToClipboardButton({ toCopy, classes}) {
	const copyToClipboard = async () => {
		console.log(navigator);
		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(toCopy);
			} else {
				console.error('Clipboard API not available');
			}
		} catch (error) {
			console.error('Failed to copy text to clipboard:', error);
		}
	};
    return (
        <button className={classes ? classes : "btn-1"} onClick={copyToClipboard}>
            Copy to Clipboard
        </button>
    );
}

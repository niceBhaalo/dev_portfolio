import React from 'react'

export default function Title({classes, text, style}) {
	return <div className={!classes ? "title text-center" : classes} style={style}>{!text ? "Title" : text}</div>;
}

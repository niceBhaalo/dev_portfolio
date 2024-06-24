import React from 'react';

export default function DisplayData({ data }) {
	return (
		<div>
		{data.length!==0 && (<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div style={{ flex: 1, fontWeight: 'bold' }}>Name</div>
				<div style={{ flex: 1, fontWeight: 'bold' }}>Date of Birth</div>
			</div>
			{data.map((item, index) => (
				<div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
					<div style={{ flex: 1 }}>{item.name}</div>
					<div style={{ flex: 1 }}>{item.date}</div>
				</div>
			))}
			</div>
		)}
		</div>
	);
}

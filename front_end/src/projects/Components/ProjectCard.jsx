import React, { useState } from 'react';

import { Link} from 'react-router-dom';

export default function ProjectCard ( { data }) {

	return (
		<div className="project">
			<div className="project__text-content">
				<div className="project__title margin-bottom-large">
					{data.name}
				</div>
				<div className="project__description margin-bottom-huge">
					{data.description}
				</div>
				<Link to={data.route} className="project__button margin-bottom-small">Check It Out!</Link>
				
				<div className="project__skills">
					Skills: 
				  {
					  Object.keys(data.skills).map(skill => (
						data.skills[skill].length > 0 && (
							<span key={skill} className="project__skill">{skill}
							  <div className="project__skill-dropdown">
								{data.skills[skill].map((item, index) => (
								  <div className="project__skill-item"key={index}>{item}</div>
								))}
							  </div>
							</span>
						)
					  ))
					}

					</div>
				</div>
				<div className="project__frame">
					<img alt={data.name} className="project__image" src={`/Code_On_Screen_Background.jpg`} />
				</div>
		</div>
	
	);
}

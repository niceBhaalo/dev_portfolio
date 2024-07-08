import React, {useContext} from 'react';
import './OtherSkills.css';
import {ThemeContext, themes } from '../../contexts/ThemeContext.jsx';

export default function OtherSkills() {

	const theme = useContext(ThemeContext);

  const skills = [
	{
		name: "HTML",
		canDo: "Know when and how to use the popular semantic and non semantic tags.",
	},
	{
      name: "CSS",
      canDo: "Can create responsive designs, simple animations, confetti, use flexbox, use pseudo elements.",
    },
    {
      name: "JavaScript",
      canDo: "Can develop dynamic interactive applications, manipulate the DOM, handle events.",
    },
    {
      name: "React",
      canDo: "Understand and use the popular hooks, manage states.",
    },
    {
      name: "Python",
      canDo: "Can play around with the various data structures, make basic UIs and Visualizations, use Selenium, and create solutions.",
    },
    {
		name: "Linux",
		canDo: "Use Linux as primary OS for development and as a Production Server."
    },
    {
		name: "Docker",
		canDo: "Setup Docker environments for development, production, and testing. Use docker for local development."
    },
    {
		name: "Jenkins",
		canDo: "Setup a basic pipeline to setup a build environment in a remore server, build app. Send the artifact to a remote repository."
    },
    {
		name: "Nexus",
		canDo: "Setup hosted and proxy repositories to attach with Jenkins."
    },
    {
		name: "nginx",
		canDo: "Have basic understanding about running a webserver."
    },
    {
      name: "Adobe",
      canDo: "Have worked with Adobe Illustrator, After Effects, Premiere Pro and Photoshop to create graphics and animations.",
    },
    {
      name: "Blender",
      canDo: "Have worked with Blender to create 3D Models and their animations. Worked with low poly models. Worked with GIS to import satellite mapsand topography.",
    },
    {
      name: "Krita",
      canDo: "Create basic hand drawn frame by frame animations.",
    },
    {
		name: "Rubik's Cube",
		canDo: "Solve in around 1 min."
    }    
  ];
  const animationLinks = [
  	{
		link: "https://www.behance.net/fazeel",
		name: "Behance Portfolio"
	},
	{
		link: "https://www.youtube.com/watch?v=XCg94X-6pGE",
		name: "Book Trailer 1"
	},
	{
		link: "https://www.youtube.com/watch?v=bCfl1WQmDXg",
		name: "Book Trailer 2"
	},
	{
		link: "https://www.youtube.com/watch?v=sDU3P9bzyls",
		name: "Book Trailer 3"
	}
  ];

  return (
    <div className={`skills-container ${theme}`}>
      <table className="skills-table">
        <thead>
          <tr>
            <th className={`skills-header ${theme}`}>Skills</th>
            <th className={`skills-header ${theme}`}>What I Can Do</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, index) => (
            <tr key={index}>
              <td className="skills-cell">{skill.name}</td>
              <td className="skills-cell">{skill.canDo}</td>
            </tr>
          ))}
          <tr>
              <td className="skills-cell">Animation Portfolio</td>
              <td className="skills-cell">
				{animationLinks.map((link, index) => (<>
					<a key={index} href={link.link} target="_blank">{link.name}</a>
					<br key={index+"key"}/>
					</>
					))}
			</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

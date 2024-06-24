import React, {useState, useContext} from 'react';
import './SubscribeApp.css';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';


import SubscribeDialogBox from './SubscribeDialogBox.jsx';

export default function SubscribeApp() {

	const theme = useContext(ThemeContext);
	
	const [subbed, setSubbed] = useState(false);
	const [showDialog, setShowDialog] = useState(true);
	const [quitted, setQuitted] = useState(false);
	const light = '#fcfaa4';
	const dark = '#310033';
	let parentDivStyle = {
		backgroundColor: theme === 'light' ? light : dark,
	};
	let textStyle = {
		color: theme === 'light' ? dark : light,
	};
	let shadowStyle = {
		boxShadow: `0px 0px 120px -5px ${theme === 'light' ? dark : light}`,
		backgroundColor: theme === 'light' ? dark : light,
	};
	let paragraphParentStyle = {
		border: `1px solid ${theme === 'light' ? dark : light}`,
		backgroundColor: theme === 'light' ? light : dark,

	};
	let footerStyle = {
		color: theme === 'light' ? dark : light,

	};

	const handleDialogOpen = () => {
		setShowDialog(true);
		if (!subbed) {
			setQuitted(false);
		}
	};
	const quitDialog = () => {
		setShowDialog(false);
		setQuitted(true);
	};
	const handleSubbed = (value) => {
		setSubbed(value);		
	};
	return (
		<div className={"parentDiv"} style={parentDivStyle}>
			<div className={"shadow"} style={shadowStyle}>
			</div>
			<div className="paragraphs">
				<div className={"paragraphParent"} style={paragraphParentStyle}>
					<p className={"para"} style={textStyle}>
						Things To Study About:
						<br />
						Power, Justice, Rights, Laws, Other issues related to governance. 
						<br />

						Politics: Politiccs describes the use of power and the distribution of resources. 
						<br />

						Political Theory: It is the study of the concepts and principles people use to describe , explain and evaluate political events and institutions. 
						<br />

						Political Science: The academic discipline studying state, government and politics. 
						<br />
						<br />

						UNIT 1: POLIS
									<br />

						"City State" and now "Political Community"			<br />

						Ideal State of Plato and Aristotle. <br />
						Plato: One Philosopher King, Well Being of the State<br />
						Aristotle: Well Being of the Individual Is Important for the good of the State.<br />

						BOOK I: <br />
						Socrates discusses the state of old age with Cephlus. Role of money, hope of salvation (of someone with no sin), peace of mind. 
						Socrates humiliates Polemarchus in the argument about what is Justice. Polemarchus spoke about Simonides idea of justice as 'To Speak the Truth and Pay Your Debts". Somehow, Socrates got him from there to saying that "About all things, justice is useful when those things are useless and justice is useless and when those things are useful", and also that, "The Just Man is most capable of theft."
						<br />
						Thrasymachus interjected and scolded Socrates for only poking other people's answers, and never having his own. He gave his idea of Justice as what Justice is the interest of the stronger and it is just for the weaker ones to obey the orders, such as whatever is the form of government, they make the justice and the subjects have to obey. Socrates countered that in arts, the interest is about the subject matter and not the art itself. The art of medicine is not about the art of medicine's wellbeing, but the wellbeing of the body. The art of medicine's interest is the body, the strong is interested in the weaker. Which is opposite to the definition of Justice by Thrasymachus. 
						<br />
						Thrasymachus said that just and unjust are defined as that, just is the interest of the ruler and the stronger and the loss of the subject and servant and unjust is the opposite. It is just of the ruler to make laws and for the weak to obey them and unjust if they do so vice versa. Justice is the interest of the stronger and injustice is a man's own profit and interest. The unjust is happier and stronger, and when such an unjust man like those of robbers and thieves also takes away people as property and slaves, instead of reproach, he is termed as happy and blessed. Mankind censures injustice not because they shrink from committing it, but because they are afraid to be the victims of it. The unjust are wise and virtuous and not the just.
						<br />
						Somehow, Socrates argued against it and made him agree that it is the just who are advantageous, who are abler, with wisdom and the basis for common action. Justice imparts harmony and friendship, while injustice creates divisions and hatred and fighting. The just is the friend of just and enemy of the just and the gods are just. And justice is more profitable than injustice.
						<br />
						Socrates ends Book I with an argumentative victory but surmises that he does not know what the nature of justice is, which was his original aim. He has just argued about whether justice is virtue and wisdom or evil and folly and which is more profitable. Since he does not know what justice is, he does not know whether it is a virtue and it makes man happy or not. 
						<br />
						Book II: <br />
						When Thrasymachus leaves the conversation, the others in the company like Glaucon want to discuss the matter further. Not because they think that unjust is better, but because they want to get to the bottom of the nature of justice, and they want a satisfactory answer to why being just is better separate from why being unjust is bad. 
						<br />
						Glaucon uses the story of the invisible ring to ask why would anyone be just if there are no consequences to being unjust. 
						<br />
						Adeimantus asks Socrates to praise Justice for the sake of justice and virtue alone, and not praise it for its benefits or praise it with keeping in mind the consequences of being unjust. 
						<br />
						They make a strong case for that being unjust but appearing just is the strongest thing. It is successful in this life and even in the afterlife, because maybe the gods don’t exist, maybe they do not care, and if they do care, the poets suggest that gods can be bought off by sacrifices and money taken through unjust means. 
						<br />
						When Socrates started to try to make the argument, he starts with separating the individual and the state, the state is larger, and what applies to the State applies to the smaller which is the individual. Then they begin to make the ideal state with adding professions after professions to make everyone have all the necessities. Then they move on to luxuries which led to arts and armies for defense and invasions. But who should be the guardian. They started to discuss the attributes which the ideal guardian would have. Then they thought about how those ideal attributes have to be developed. 
						<br />
						The most obvious thing Socrates went against is the idea that Gods are human in nature as well. Socrates made claims such as that Gods are good, and are the creator of only the goods things and not all the things. Evil is not of them. Gods do not disguise themselves to appear in the cities, or cause distrust in the houses or families or lie. Poets and mothers have to be warned and taught not to raise their children with these fiction tales about Gods and heroes. That the guardians should be the true worshippers of the gods and like them. They should not be taught that quarrels exist and that Gods can be evil. They others agree with Socrates. 
						<br />
						The City is a metaphor for the Soul.
						<br />
						Book III:<br />
						Socrates criticizes portrayal of heroes in Homer such as Achilles. Same goes for the portrayal of Gods as human like figures with non-virtuous acts. With music, he also limited the harmonies to those which are conducive to courage and temperance. With art, Socrates also wants to censure those which may corrupt his auxiliaries. With physical training, Socrates believes in healthy body healthy mind, but Socrates was against extreme strengthening of muscles. For medicine, Socrates is harshest against people who do not treat their own bodies well, and that physicians should not save and cure such people. Lastly, Socrates suggests creating a myth which should help the three classes, the laborer, the guardian, and the ruler to find purpose, satisfaction and unity in their life. So Socrates was in favor of taking up a false religion and promoting it to benefit the society, and protect the city state. It is termed as the city state. The lie is that he prefers the health of the city state over the truth. It may be that he is stuck in a cyclic logic that the struggle for truth requires a healthy and safe city state. 
						<br />


					</p>
				</div>	
				<div className={"paragraphParent"} style={paragraphParentStyle}>
					<p className={"para"} style={textStyle}>
						Things To Study About:
						<br />
						Power, Justice, Rights, Laws, Other issues related to governance. 
						<br />

						Politics: Politiccs describes the use of power and the distribution of resources. 
						<br />

						Political Theory: It is the study of the concepts and principles people use to describe , explain and evaluate political events and institutions. 
						<br />

						Political Science: The academic discipline studying state, government and politics. 
						<br />
						<br />

						UNIT 1: POLIS
									<br />

						"City State" and now "Political Community"			<br />

						Ideal State of Plato and Aristotle. <br />
						Plato: One Philosopher King, Well Being of the State<br />
						Aristotle: Well Being of the Individual Is Important for the good of the State.<br />

						BOOK I: <br />
						Socrates discusses the state of old age with Cephlus. Role of money, hope of salvation (of someone with no sin), peace of mind. 
						Socrates humiliates Polemarchus in the argument about what is Justice. Polemarchus spoke about Simonides idea of justice as 'To Speak the Truth and Pay Your Debts". Somehow, Socrates got him from there to saying that "About all things, justice is useful when those things are useless and justice is useless and when those things are useful", and also that, "The Just Man is most capable of theft."
						<br />
						Thrasymachus interjected and scolded Socrates for only poking other people's answers, and never having his own. He gave his idea of Justice as what Justice is the interest of the stronger and it is just for the weaker ones to obey the orders, such as whatever is the form of government, they make the justice and the subjects have to obey. Socrates countered that in arts, the interest is about the subject matter and not the art itself. The art of medicine is not about the art of medicine's wellbeing, but the wellbeing of the body. The art of medicine's interest is the body, the strong is interested in the weaker. Which is opposite to the definition of Justice by Thrasymachus. 
						<br />
						Thrasymachus said that just and unjust are defined as that, just is the interest of the ruler and the stronger and the loss of the subject and servant and unjust is the opposite. It is just of the ruler to make laws and for the weak to obey them and unjust if they do so vice versa. Justice is the interest of the stronger and injustice is a man's own profit and interest. The unjust is happier and stronger, and when such an unjust man like those of robbers and thieves also takes away people as property and slaves, instead of reproach, he is termed as happy and blessed. Mankind censures injustice not because they shrink from committing it, but because they are afraid to be the victims of it. The unjust are wise and virtuous and not the just.
						<br />
						Somehow, Socrates argued against it and made him agree that it is the just who are advantageous, who are abler, with wisdom and the basis for common action. Justice imparts harmony and friendship, while injustice creates divisions and hatred and fighting. The just is the friend of just and enemy of the just and the gods are just. And justice is more profitable than injustice.
						<br />
						Socrates ends Book I with an argumentative victory but surmises that he does not know what the nature of justice is, which was his original aim. He has just argued about whether justice is virtue and wisdom or evil and folly and which is more profitable. Since he does not know what justice is, he does not know whether it is a virtue and it makes man happy or not. 
						<br />
						Book II: <br />
						When Thrasymachus leaves the conversation, the others in the company like Glaucon want to discuss the matter further. Not because they think that unjust is better, but because they want to get to the bottom of the nature of justice, and they want a satisfactory answer to why being just is better separate from why being unjust is bad. 
						<br />
						Glaucon uses the story of the invisible ring to ask why would anyone be just if there are no consequences to being unjust. 
						<br />
						Adeimantus asks Socrates to praise Justice for the sake of justice and virtue alone, and not praise it for its benefits or praise it with keeping in mind the consequences of being unjust. 
						<br />
						They make a strong case for that being unjust but appearing just is the strongest thing. It is successful in this life and even in the afterlife, because maybe the gods don’t exist, maybe they do not care, and if they do care, the poets suggest that gods can be bought off by sacrifices and money taken through unjust means. 
						<br />
						When Socrates started to try to make the argument, he starts with separating the individual and the state, the state is larger, and what applies to the State applies to the smaller which is the individual. Then they begin to make the ideal state with adding professions after professions to make everyone have all the necessities. Then they move on to luxuries which led to arts and armies for defense and invasions. But who should be the guardian. They started to discuss the attributes which the ideal guardian would have. Then they thought about how those ideal attributes have to be developed. 
						<br />
						The most obvious thing Socrates went against is the idea that Gods are human in nature as well. Socrates made claims such as that Gods are good, and are the creator of only the goods things and not all the things. Evil is not of them. Gods do not disguise themselves to appear in the cities, or cause distrust in the houses or families or lie. Poets and mothers have to be warned and taught not to raise their children with these fiction tales about Gods and heroes. That the guardians should be the true worshippers of the gods and like them. They should not be taught that quarrels exist and that Gods can be evil. They others agree with Socrates. 
						<br />
						The City is a metaphor for the Soul.
						<br />
						Book III:<br />
						Socrates criticizes portrayal of heroes in Homer such as Achilles. Same goes for the portrayal of Gods as human like figures with non-virtuous acts. With music, he also limited the harmonies to those which are conducive to courage and temperance. With art, Socrates also wants to censure those which may corrupt his auxiliaries. With physical training, Socrates believes in healthy body healthy mind, but Socrates was against extreme strengthening of muscles. For medicine, Socrates is harshest against people who do not treat their own bodies well, and that physicians should not save and cure such people. Lastly, Socrates suggests creating a myth which should help the three classes, the laborer, the guardian, and the ruler to find purpose, satisfaction and unity in their life. So Socrates was in favor of taking up a false religion and promoting it to benefit the society, and protect the city state. It is termed as the city state. The lie is that he prefers the health of the city state over the truth. It may be that he is stuck in a cyclic logic that the struggle for truth requires a healthy and safe city state. 
						<br />
					</p>
				</div>	

			</div>
			<div 
				className="footer"
				style={footerStyle}
				onClick={handleDialogOpen}
			>
			{!subbed ? 'Subscribe' : 'Unsubscribe'}
			</div>

		<SubscribeDialogBox 
			showDialogBox={showDialog}
			onClick={quitDialog}
			settingSubbed={handleSubbed}
			showUnSub={subbed && quitted}
		/>
	</div>
	);
}

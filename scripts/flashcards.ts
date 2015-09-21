/// <reference path="types/knockout.d.ts"/>
/// <reference path="types/underscore.d.ts"/>
/// <reference path="types/underscore.string.d.ts"/>


// DON'T FORGET TO COMPILE THE TYPESCRIPT. There is no grunt / gulp watcher
class FlashCardPageViewModel
{
	sourceText = ko.observable<string>('');
	gameMode= ko.observable(false);
	currentCard= ko.observable('');
	distinctList = ko.computed<string[]>(() => {
		var s = this.sourceText();
		var fullList = s.replace(/\./g, '')
		.replace(/\,/g, '')
		.replace(/\s+/g,' ')
		.split(' ');

		var distinctList = _.sortBy(_.uniq(fullList));
		var filtered = _.filter(distinctList, x => !!x);
		
		return filtered;

		});

	wordList = ko.computed<string>(() => {
		return this.distinctList()
		.join(' ');

		});

	outputLabel = ko.computed(()=>"Here are the list of " + this.wordList().split(' ').length + " unique words.");

	loadTale(template:string){
		var tale: string;
		switch(template)
		{
			case 'sisters':
				tale = 'Elsa and Anna were sisters. Elsa was older. Anna was younger. Elsa had a secret magic power. She could create ice and snow. One day Elsa and Anna were playing. Elsa made a mistake. Her magic hit Anna by accident. Anna got very sick and cold. Their parents were very worried. Elsa was very frightened. The King and Queen took Anna to the trolls. An old troll helped Anna get better. Anna wanted to be friends with Elsa. But Elsa stayed away from her. She wanted to keep Anna safe. Anna and Elsa grew up. Anna met Prince Hanz. They fell in love straight away. Elsa became Queen. The kingdom was happy. But Elsa could not tell anyone about her magical secret. Anna wanted to marry Hanz but Elsa did not agree with her sister. 	She wanted Anna to wait. Anna and Elsa argued. Anna pulled of Elsa’s glove. Magical ice shot from Elsa’s hand. Everyone knew Elsa’s secret. She did not want to hurt anyone so Elsa ran far away. She built an ice palace in the mountains. The land was covered in ice and snow. The kingdom was in trouble. There was too much snow. Anna wanted to find Elsa and bring her home. She met Kristoff and his reindeer Sven. They helped her search for Elsa. They met a snowman named Olof. Elsa had made him with her powers. Olof led them to Elsa. Back at the castle, Hanz was worried about Anna. He wanted to find her. Anna went to Elsa’s ice palace. She told Elsa about the snow. She asked her to come home. Elsa was too scared. She did not want to hurt anyone, but Anna would not leave without Elsa. Elsa got very angry. She blasted at Anna with ice. It hit Anna in her heart by mistake. Kristoff and Olof took Anna away. She was getting very sick again. Elsa’s magic was turning Anna to ice. Kristoff took Anna to see the trolls, but the old troll could not help her. Only an act of true love could save Anna now. Hanz had gone to the mountains. He found Elsa. His guards brought her back to the castle. Anna went back to the castle but Hanz would not save her. He did not really love her at all. Kristoff did love Anna. He rushed to save her but Anna saw that Hans was going to hurt Elsa. Anna ran to save her sister. She blocked Hans’s sword. She froze into solid ice. Elsa was very sad. She cried and hugged her frozen sister. Then something magical happened. Anna began to melt. She loved her sister so much it broke the spell. Anna and Elsa were not just sisters. Now they were best friends as well.';
				break;
			case 'simple':
				tale = 'cat dog mouse boat fish chair apple';
				break;
				default:
		}
		
		this.sourceText(tale);
	}

	playGame(){
		this.gameMode(true);
		this.randomCard();
	}

	endGame(){
		this.gameMode(false);

	}

	randomCard()
	{
		var i = _.random(0, this.distinctList().length -1);
		this.currentCard(this.distinctList()[i]);
	}

}



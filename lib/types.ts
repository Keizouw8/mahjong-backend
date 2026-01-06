import { shuffle } from "./tools";

export class Suit {
	name: string;
	numerical: boolean;
	values?: string[];

	constructor(name: string, numerical: boolean, values?: string[]){
		this.name = name;
		this.numerical = numerical;
		if (numerical) return;
		if (!values) throw new Error("Non-numerical suit needs values");
		this.values = values;
	}
	generateCards() {
		let cards = [];
		for (let i = 0; i < 4; i++){
			if (this.numerical) for (let o = 1; o < 10; o++) cards.push(new Card(o, this, i));
			else for(let value of this.values as string[]) cards.push(new Card(value, this, i));
		}
		return cards;
	}
}

export class Card {
	value: string | number;
	suit: Suit;
	id: string;

	constructor(value: string | number, suit: Suit, i: number){
		this.value = value;
		this.suit = suit;
		this.id = suit.name + value + i;
		if (suit.numerical && isNaN(value as number)) throw new Error("Non-numerical value for numerical suit");
	}
}

export const suits: Suit[] = [
	new Suit("dot", true),
	new Suit("number", true),
	new Suit("bamboo", true),
	new Suit("wind", false, ["N", "W", "E", "S"]),
	new Suit("dragon", false, ["Fa", "BP", "HZ"]),
	new Suit("flower", false, ["F1", "F2"])
];

export function generateCards(): Card[] {
	return suits.flatMap(suit => suit.generateCards());
}

export class Game {
	cards: Card[];
	discard: Card[];
	players: Record<string, { hand: Card[], shown: Card[] }>;

	constructor(activePeople: Record<string, boolean>){
		this.cards = shuffle(generateCards());
		this.discard = [];
		this.players = {};
		for (let person of Object.keys(activePeople)) if (activePeople[person]) this.players[person] = {
			hand: [],
			shown: []
		};
	}

	distributeCards(east: string){
		for (let i = 0; i < 13; i++) for (let player of this.playerList()) this.players[player].hand.push(this.drawCard());
		if (!this.players[east]) throw new Error("East player not active");
		this.players[east].hand.push(this.drawCard());
	}

	drawCard(): Card{
		if (!this.cards.length) throw new Error("Out of cards");
		return this.cards.pop() as Card;
	}

	playerList(): string[]{
		return Object.keys(this.players).filter(player => this.players[player]);
	}
}

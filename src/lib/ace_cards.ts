import _9 from "$lib/images/cards/9-of-spades.svg";
import _10 from "$lib/images/cards/10-of-spades.svg";
import jack from "$lib/images/cards/jack-of-spades.svg";
import queen from "$lib/images/cards/queen-of-spades.svg";
import king from "$lib/images/cards/king-of-spades.svg";
import ace from "$lib/images/cards/ace-of-spades.svg";
import unknown from "$lib/images/cards/unknown-of-spades.svg";

export const CARDS = {
	ace,
	king,
	queen,
	jack,
	_10,
	_9,
	unknown
};

export function get_card_for_level(level: number | null) {
	switch (level) {
		case 0:
			return CARDS.ace;
		case 1:
			return CARDS.king;
		case 2:
			return CARDS.queen;
		case 3:
			return CARDS.jack;
		case 4:
			return CARDS._10;
		case 5:
			return CARDS._9;
		default:
			return CARDS.unknown;
	}
}

export function get_alt_for_level(level: number | null) {
	switch (level) {
		case 0:
			return "ace of spades";
		case 1:
			return "king of spades";
		case 2:
			return "queen of spades";
		case 3:
			return "jack of spades";
		case 4:
			return "10 of spades";
		case 5:
			return "9 of spades";
		default:
			return "question mark of spades";
	}
}

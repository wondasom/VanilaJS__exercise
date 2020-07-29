'use strict';

import Field from './field.js';
import * as sound from './sound.js';

// Builder Pattern
export default class GameBuilder {
	gameDuration(duration) {
		this.gameDuration = duration;
		return this;
	}
	carrotCount(num) {
		this.carrotCount = num;
		return this;
	}
	bugCount(num) {
		this.bugCount = num;
		return this;
	}
	build() {
		return new Game(
			this.gameDuration, //
			this.carrotCount, //
			this.bugCount
		);
	}
}

class Game {
	constructor(gameDuration, carrotCount, bugCount) {
		this.gameDuration = gameDuration;
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;

		this.gameTimer = document.querySelector('.game__timer');
		this.gameScore = document.querySelector('.game__score');
		this.gameBtn = document.querySelector('.game__button');
		this.gameBtn.addEventListener('click', () => {
			if (this.started) {
				this.stop();
			} else {
				this.start();
			}
		});

		this.gameField = new Field(carrotCount, bugCount);
		this.gameField.setClickListener(this.onItemClick);

		this.started = false;
		this.score = 0;
		this.timer = undefined;
	}
	start() {
		this.started = true;
		this.initGame();
		this.showStopButton();
		this.showTimerAndScore();
		this.startGameTimer();
		sound.playBackGround();
	}

	stop() {
		this.started = false;
		this.stopGameTimer();
		this.hideGameButton();
		sound.playAlert();
		sound.stopBackGround();
		this.onGameStop && this.onGameStop('cancel');
	}

	finish(win) {
		this.started = false;
		this.hideGameButton();
		if (win) {
			sound.playWin();
		} else {
			sound.playBug();
		}
		this.stopGameTimer();
		sound.stopBackGround();
		this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
	}

	onItemClick = (item) => {
		if (!this.started) {
			return;
		}
		if (item === 'carrot') {
			this.score++;
			this.updateScoreBoard();
			if (this.score === this.carrotCount) {
				this.finish(true);
			}
		} else if (item === 'bug') {
			this.finish(false);
		}
	};

	setGameListener(onGameStop) {
		this.onGameStop = onGameStop;
	}

	showStopButton() {
		const icon = this.gameBtn.querySelector('.fas');
		icon.classList.add('fa-stop');
		icon.classList.remove('fa-play');
		this.gameBtn.style.visibility = 'visible';
	}
	hideGameButton() {
		this.gameBtn.style.visibility = 'hidden';
	}

	showTimerAndScore() {
		this.gameTimer.style.visibility = 'visible';
		this.gameScore.style.visibility = 'visible';
	}

	startGameTimer() {
		let remainingTimeSec = this.gameDuration;
		this.updateTimerText(remainingTimeSec);
		this.timer = setInterval(() => {
			if (remainingTimeSec <= 0) {
				clearInterval(this.timer);
				this.finish(this.carrotCount === this.score);
				return;
			}
			this.updateTimerText(--remainingTimeSec);
		}, 1000);
	}

	stopGameTimer() {
		clearInterval(this.timer);
	}

	updateTimerText(time) {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		this.gameTimer.innerText = `${minutes}:${seconds}`;
	}

	initGame() {
		this.score = 0;
		this.gameScore.innerText = this.carrotCount;
		this.gameField.init();
	}

	updateScoreBoard() {
		this.gameScore.innerText = this.carrotCount - this.score;
	}
}

/// <reference path="../../framework/angular.d.ts"/>

module Application.Factories {
	export class gamevarsfactory {
		private gamevars: any;
		private lifePoints: number;
		private moodPoints: number;
		private tiredPoints: number;
		private money: number;

		constructor() {
			// Init the game variables
			this.gamevars = this.initGamevars();
		}


		/**
		** Init the variables of the game
		**/
		private initGamevars(): any {
			this.lifePoints = 100;
			this.moodPoints = 100;
			this.tiredPoints = 0;
			this.money = 50;
		}


		/**
		** GETTERS of game variables
		**/

		getLifePoints() {
			return this.lifePoints;
		}
		getMoodPoints() {
			return this.moodPoints;
		}
		getTiredPoints() {
			return this.tiredPoints;
		}
		getMoney() {
			return this.money;
		}


	}
}
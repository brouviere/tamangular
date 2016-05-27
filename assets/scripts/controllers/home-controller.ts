/// <reference path="../framework/angular.d.ts"/>

module Application.Controllers {
	export class HomeController {
		scope: any;
		lifePoints: number;
		moodPoints: number;
		tiredPoints: number;
		money: number;
		gameVars: any;

		constructor($scope: ng.IScope, gamevarsfactory: any) {
			this.scope = $scope;
			this.gameVars = new gamevarsfactory;
		}

		/** 
		* INIT the game variables
		**/
		initGameVars() {
			this.lifePoints = this.gameVars.getLifePoints();
			this.moodPoints = this.gameVars.getMoodPoints();
			this.tiredPoints = this.gameVars.getTiredPoints();
			this.money = this.gameVars.getMoney();
		}
	}
}

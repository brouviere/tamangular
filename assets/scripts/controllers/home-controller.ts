/// <reference path="../framework/angular.d.ts"/>

module Application.Controllers {
	export class HomeController {
		scope: any;
		lifePoints: number;
		moodPoints: number;
		tiredPoints: number;
		money: number;

		constructor($scope: ng.IScope, gamevarsfactory: any) {
			
			this.scope = $scope;
			
			let gameVars = new gamevarsfactory;
			this.lifePoints = gameVars.getLifePoints();
			this.moodPoints = gameVars.getMoodPoints();
			this.tiredPoints = gameVars.getTiredPoints();
			this.money = gameVars.getMoney();
		}

		
	}
}

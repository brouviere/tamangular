/// <reference path="../framework/angular.d.ts"/>

module Application.Controllers {
	export class HomeController {
		scope: any;
		lifePoints: number;
		moodPoints: number;
		tiredPoints: number;
		money: number;
		gameVars: any;
		cycle: any;
		interval: any;
		hasWorked : any; // If tama has worked on one cycle


		constructor($scope: ng.IScope, gamevarsfactory: any,$interval:any) {
			this.scope = $scope;
			this.gameVars = new gamevarsfactory;
			
			this.interval = $interval;

		}

		/** 
		* INIT the game variables
		**/
		initGameVars() {
			this.lifePoints = this.gameVars.getLifePoints();
			this.moodPoints = this.gameVars.getMoodPoints();
			this.tiredPoints = this.gameVars.getTiredPoints();
			this.hasWorked = false;

			this.money = this.gameVars.getMoney();
			this.becomeOlder();
		}

		// Start the lifetime cycle
		becomeOlder() {
			let pdv = this.lifePoints;
			console.log("init pdv = "+pdv);
			this.cycle = setInterval(() => {
				this.scope.$apply(() => {
					this.setOlderVariables();
				});
			},1000);

		}

		// Called on a cycle, defines the loss of points
		setOlderVariables(){
			this.lifePoints--;
			if (this.lifePoints===0){
				clearInterval(this.cycle);
				return false;
			}
			if (!this.hasWorked) {
				this.lifePoints -= 2;
			} 
			console.log(this.lifePoints);
		}
	}
}

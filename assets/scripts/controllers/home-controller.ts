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
		gameStarted: boolean;
		score: number;
		lastScore: number;

		// Factories
		workfactory: any;
		foodfactory: any;


		// Actions
		listfood: any;
		
		constructor($scope: ng.IScope, gamevarsfactory: any, $interval: any, workfactory: any, foodfactory: any) {
			this.scope = $scope;
			this.gameVars = new gamevarsfactory;
			this.workfactory = new workfactory;
			this.foodfactory = new foodfactory;
			this.scope.gameStarted = false;
			this.listfood = this.foodfactory.getFoodList();
			this.lastScore = localStorage.getItem('lastScore');
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
			this.scope.gameStarted = true;
			this.scope.onAction = false;
			this.scope.state = "good";
			this.scope.score = 0;
			this.scope.lastScore = this.lastScore;

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
					this.scope.score++;
					localStorage.setItem('lastScore', JSON.stringify(this.scope.score));
				});
			},3000);

		}

		// Called on a cycle, defines the loss of points
		setOlderVariables(){
			this.lifePoints--;
			if (this.lifePoints <= 0){
				clearInterval(this.cycle);
				this.scope.gameStarted = false;
				return false;
			}
			if (!this.hasWorked) {
				this.lifePoints -= 3;
			} 
			this.hasWorked = false;
			console.log(this.lifePoints);
		}

		setActionVariables(workingVariables) {
			this.lifePoints += workingVariables['life'];
			this.moodPoints += workingVariables['mood'];
			this.tiredPoints += workingVariables['tired'];
			this.money += workingVariables['money'];
		}
		
		goToWork() {
			this.scope.onAction = true;
			this.scope.state = "bad";
			this.setActionVariables(this.workfactory.working(this.tiredPoints));
			this.hasWorked = true;
			this.waitingAction(3000);
		}

		goEating(food){
			console.log(food);
			this.scope.onAction = true;
			this.scope.state = "bad";
			this.waitingAction(1000);
			this.setActionVariables(this.foodfactory.eating(food));
		}

		waitingAction(time){
			setTimeout(() => {
				this.scope.$apply(() => {
					
					this.scope.onAction = false;
					this.scope.state = "good";
						
					
				}); 
			}, time);
		}


	}
}

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
		ready: any;
		// States
		hasWorked : boolean; // If tama has worked on one cycle
		hasSlept : boolean; // If tama has slept on one cycle
		gameStarted: boolean;
		// Score
		score: number;
		lastScore: number;

		// Factories
		workfactory: any;
		foodfactory: any;
		sleepfactory: any;

		
		listfood: any;
		
		constructor($scope: ng.IScope, gamevarsfactory: any, $interval: any, workfactory: any, foodfactory: any, sleepfactory: any) {
			this.scope = $scope;
			this.gameVars = new gamevarsfactory;
			this.workfactory = new workfactory;
			this.foodfactory = new foodfactory;
			this.sleepfactory = new sleepfactory;
			this.scope.gameStarted = false;
			this.listfood = this.foodfactory.getFoodList();
			this.lastScore = localStorage.getItem('lastScore');
			this.interval = $interval;
			
		}

		readyToPlay(trigger) {
			if(trigger === "ok") { 
				// console.log(trigger);
				this.ready = true;
				// console.log(this.ready);
				return this.ready
			} else {
				// console.log(trigger);
				this.ready = false;
				// console.log(this.ready);
				return this.ready;
			}
		}

		/** 
		* INIT the game variables
		**/
		initGameVars() {
			this.lifePoints = this.gameVars.getLifePoints();
			this.moodPoints = this.gameVars.getMoodPoints();
			this.tiredPoints = this.gameVars.getTiredPoints();
			this.hasWorked = false;
			this.hasSlept = false;
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
			},5000);

		}

		isDead(){
			clearInterval(this.cycle);
			this.scope.gameStarted = false;
			this.scope.state = "dead";

		}
		// Called on a cycle, defines the loss of points
		setOlderVariables(){
			this.lifePoints--;
			if (this.lifePoints <= 0){
				this.isDead();
				return false;
			}

			if (!this.hasWorked) {
				this.lifePoints -= 3;
			}
			if (!this.hasSlept) {
				if (this.hasWorked) {
					this.tiredPoints += 5;
					this.moodPoints -=5 ;
				}

				this.tiredPoints += 10;
			}
			if(this.tiredPoints >=100) {
				this.lifePoints -= 15;
				this.moodPoints -= 15;

			}

			this.hasWorked = false;
			this.hasSlept = false;
			console.log(this.lifePoints);
		}

		setActionVariables(workingVariables) {
			this.lifePoints += workingVariables['life'];
			this.moodPoints += workingVariables['mood'];
			this.tiredPoints += workingVariables['tired'];
			this.money += workingVariables['money'];
			this.scope.workingVariables = workingVariables;
		}
		
		goToWork() {
			this.scope.onAction = true;
			this.scope.state = "bad";
			this.setActionVariables(this.workfactory.working(this.tiredPoints));
			this.hasWorked = true;
			this.waitingAction(2000);
		}
		goToSleep() {
			this.scope.onAction = true;
			this.scope.state = "dead";
			this.setActionVariables(this.sleepfactory.sleeping(this.tiredPoints));
			this.hasSlept = true;
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

		acceptWork(work) {
			console.log('yo', work);
			
		}

	}
}

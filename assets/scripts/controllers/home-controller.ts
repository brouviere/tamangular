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
		workIndex: string;
		workActionVariables: any;
		tamaName: string;


		// States
		hasWorked : boolean; // If tama has worked on one cycle
		hasSlept : boolean; // If tama has slept on one cycle
		gameStarted: boolean;
		jobOffer: boolean;
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
			this.scope.workName = '';
			this.workIndex = '';

			this.gameVars = new gamevarsfactory;
			this.workfactory = new  workfactory;
			this.foodfactory = new foodfactory;
			this.sleepfactory = new sleepfactory;
			this.scope.gameStarted = false;
			this.listfood = this.foodfactory.getFoodList();
			this.lastScore = localStorage.getItem('lastScore');
			this.interval = $interval;
			
		}

		readyToPlay(trigger,tamaname) {
			if(trigger === "ok") { 
				// console.log(trigger);
				this.ready = true;
				this.tamaName = tamaname;
				console.log(this.tamaName);
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
			this.jobOffer = false;
			this.scope.acceptWork = false;
			this.money = this.gameVars.getMoney();
			this.becomeOlder();

			

		}

		// Start the lifetime cycle
		becomeOlder() {
			let pdv = this.lifePoints;
			console.log("init pdv = "+pdv);
			let that = this;
			this.cycle = setInterval(() => {
				this.scope.$apply(() => {
					this.setOlderVariables();
					this.scope.score++;
					localStorage.setItem('lastScore', JSON.stringify(this.scope.score));
					let randomJob = Math.random();
					console.log(randomJob);
					if (randomJob >= 0.7) {
						this.scope.jobOffer = true;

					}
					else{
						this.scope.jobOffer = false;
					}
					

					// object must be empty initialize,so it can be appended
					// this.scope.changeOffer;

				//that.scope.changeOffer;
					

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
			console.log('---->', workingVariables['life'])
			this.lifePoints += workingVariables['life'];
			if (this.lifePoints > 100) this.lifePoints = 100;
			this.moodPoints += workingVariables['mood'];
			if (this.moodPoints > 100) this.moodPoints = 100;
			this.tiredPoints += workingVariables['tired'];
			if (this.tiredPoints > 100) this.tiredPoints = 100;
			this.money += workingVariables['money'];
			this.scope.workingVariables = workingVariables;
		}
		
		goToWork() {
			this.scope.onAction = true;
			this.scope.state = "bad";
			this.setActionVariables(this.workfactory.working(this.workActionVariables));
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

		acceptWork(workKey, work) {
			console.log('yo', work, workKey, work.life);
			let actionVariables = [];
			actionVariables['life'] = -1;
			actionVariables['mood']= 5;
			actionVariables['tired']= 5;
			actionVariables['money']= 0;
			this.setActionVariables(actionVariables);
			this.scope.workName = work.name;
			this.workIndex = workKey;
			this.scope.jobOffer = false;
			this.scope.acceptWork = true;


			this.workActionVariables = [];
			this.workActionVariables['life'] = work.life;
			this.workActionVariables['mood'] = Math.floor(Math.random() * work.mood);
			this.workActionVariables['tired'] = work.tired;
			this.workActionVariables['money'] = work.salary;

			this.waitingAction(2000);

			
		}

	}
}

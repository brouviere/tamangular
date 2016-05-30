/// <reference path="../../framework/angular.d.ts"/>


module Application.Factories {
	export class foodfactory {
		

		constructor(){

			
		}

		getFoodList() {
			let foodList = {
				'carrotes' : {
					name: 'carrotes',
					price: -5,
					life : 1,
					mood : -1
				},
				'epinards': {
					name: 'epinards',
					price: -5,
					life: 2,
					mood: -3
				},
				'burger': {
					name: 'burger',
					price: -1,
					life: -2,
					mood: 3
				},
				'coca': {
					name: 'coca',
					price: -1,
					life: -2,
					mood: 3
				},
				'gateauchocolat': {
					name: 'gateau au chocolat',
					price: -2,
					life: 0,
					mood: 2
				}

			}
			return foodList;
		}


		eating(food){
			
			let workingVariables = new Array;
			let fl = this.getFoodList();

			workingVariables['money'] = fl[food].price;
			workingVariables['tired'] = 0;
			workingVariables['mood'] = fl[food].mood;
			workingVariables['life'] = fl[food].life;

			console.log(workingVariables);

			return workingVariables;
		}


	}
}
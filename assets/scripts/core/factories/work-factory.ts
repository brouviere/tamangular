/// <reference path="../../framework/angular.d.ts"/>


module Application.Factories {
	export class workfactory {
		

		constructor(){
			
		}

		// Variables
		working(tiredPoints){
			let workingVariables = new Array;
			workingVariables['money'] = 1;
			workingVariables['tired'] = 1;
			workingVariables['mood'] = -1;
			workingVariables['life'] = -1;
			if (tiredPoints >= 30 && tiredPoints < 50) workingVariables['life'] = -2;
			else if (tiredPoints > 50) workingVariables['life'] = -3;


			console.log(workingVariables);

			return workingVariables;
		}

		getWorkList () {
			
		}

	}
}
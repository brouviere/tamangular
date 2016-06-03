/// <reference path="../../framework/angular.d.ts"/>


module Application.Factories {
	export class workfactory {
		wkService: any;

		constructor(worklistService: any) {
			this.wkService = worklistService;
		}

		// Variables
		working(v){
			let workingVariables = new Array;
			workingVariables['money'] = v.money;
			workingVariables['tired'] = v.tired;
			workingVariables['mood'] = v.mood;
			workingVariables['life'] = v.life;
			if (v.tired >= 30 && v.tired < 50) workingVariables['life'] = -2;
			else if (v.tired > 50) workingVariables['life'] = -3;


			console.log(workingVariables);

			return workingVariables;
		}

		getWorkList () {
			
		}

	}
}
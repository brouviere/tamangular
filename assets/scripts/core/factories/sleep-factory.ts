/// <reference path="../../framework/angular.d.ts"/>


module Application.Factories {
	export class sleepfactory {
		

		constructor(){
			
		}

		sleeping(tiredPoints){
			let Variables = new Array;
			Variables['money'] = 0;
			Variables['tired'] = -10;
			Variables['mood'] = 5;
			Variables['life'] = 5;

			return Variables;
		}


	}
}
/// <reference path="../../framework/angular.d.ts"/>


module Application.Factories {
	export class cyclefactory {
		

		constructor(){
			
		}

		gettingOlder(lifePoints) {
			
				setInterval(function(lifePoints) {
					console.log('plop', lifePoints);
					return this.lifePoints -= 1;
				},1000);
			
			

		}

		
	}
}
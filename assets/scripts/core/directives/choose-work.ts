/// <reference path="../../framework/angular.d.ts"/>

module Application.Directives {
	export class chooseworkDirective {
		wkService: any;
		close: boolean;

		constructor(worklistService:any) {
			this.close = true;
			this.wkService =  worklistService;
			return this.instanceDirective();
		}

		instanceDirective():any {
			let thesunhine=[];
			this.wkService.getWorkList().then(function(data) {
				let wk = Math.floor((Math.random() * 10));
				let i = 0;
				angular.forEach(data, function(value, key) {
					if (wk == i) thesunhine = value;
					i++;
				});
			});
			

			
			return {
				templateUrl: './assets/scripts/core/directives/templates/choosework.html',
				restrict: 'A',
				scope: {
					acceptWork: "&",


				},
				link: function(scope) {
					scope.work = thesunhine;
					scope.closework = this.close;
					
				}
			}
		}

		
	}
}
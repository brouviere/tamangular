/// <reference path="../../framework/angular.d.ts"/>

module Application.Directives {
	export class chooseworkDirective {
		wkService: any;
		close: boolean;
	
		constructor(worklistService:any) {
			this.close = false;
			this.wkService =  worklistService;
			return this.instanceDirective();
			
		}
		a () {
			console.log('yoooopyyyy');
		}
		instanceDirective():any {
			console.log('======================================');
			let thesunhine=[];
			let workKey = '';
			this.wkService.getWorkList().then(function(data) {
				let wk = Math.floor((Math.random() * 10));
				let i = 0;
				angular.forEach(data, function(value, key) {
					if (wk == i) {
						thesunhine = value;
						workKey = key;
					}
					i++;
				});
			});
			

			
			return {
				templateUrl: './assets/scripts/core/directives/templates/choosework.html',
				restrict: 'A',
				scope: {
					acceptWork: "&",
					changeOffer: "&"


				},
				link: function(scope) {
					scope.work = thesunhine;
					scope.workKey= workKey
					scope.closework = this.close;
					scope.changeOffer = this.a;

					
				}
			}
		}

		
	}
}
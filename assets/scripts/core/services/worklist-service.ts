/// <reference path="../../framework/angular.d.ts"/>


module Application.Services {
	export class worklistService {
		http: any;
		q: any;

		constructor($http: ng.IHttpService, $q: ng.IQService) {

			this.http = $http;
			this.q = $q;
		}

		getWorkList() {
			//  Initialisation du service "query" => Declaration de la promise
			var myDefer = this.q.defer();

			this.http({
				method: 'GET',
				url: './work-list.json'
			}).then(function success(response) {
				console.log(response.data)
				myDefer.resolve(response.data);
				
			}, function error(response) {
				console.log(response)
				return false;
			});
			return myDefer.promise;
		}

	}
}

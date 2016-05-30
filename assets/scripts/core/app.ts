/// <reference path="../framework/angular.d.ts"/>
/// <reference path="../controllers/home-controller.ts"/>
/// <reference path="./factories/gamevars-factory.ts"/>
/// <reference path="./factories/work-factory.ts"/>

var appModule = angular.module("tamangularApp", []);

appModule.controller("HomeController", 
	["$scope", "gamevarsfactory", "$interval", "workfactory",
	($scope, gamevarsfactory, $interval, workfactory) => 
			new Application.Controllers.HomeController($scope, gamevarsfactory, $interval, workfactory)]);

/** Declare factory for the game variables (life, mood, tired, money)  **/
appModule.factory("gamevarsfactory", () => Application.Factories.gamevarsfactory);

// Go to work factory
appModule.factory("workfactory", () => Application.Factories.workfactory);

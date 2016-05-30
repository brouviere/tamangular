/// <reference path="../framework/angular.d.ts"/>
/// <reference path="../controllers/home-controller.ts"/>
/// <reference path="./factories/gamevars-factory.ts"/>
/// <reference path="./factories/work-factory.ts"/>
/// <reference path="./factories/food-factory.ts"/>
/// <reference path="./factories/sleep-factory.ts"/>

var appModule = angular.module("tamangularApp", []);

appModule.controller("HomeController", 
	["$scope", "gamevarsfactory", "$interval", "workfactory", "foodfactory", "sleepfactory",
		($scope, gamevarsfactory, $interval, workfactory, foodfactory, sleepfactory) => 
			new Application.Controllers.HomeController($scope, gamevarsfactory, $interval, workfactory, foodfactory, sleepfactory)]);


/** Declare factory for the game variables (life, mood, tired, money)  **/
appModule.factory("gamevarsfactory", () => Application.Factories.gamevarsfactory);

// Go to work factory
appModule.factory("workfactory", () => Application.Factories.workfactory);

// Go to work factory
appModule.factory("foodfactory", () => Application.Factories.foodfactory);

// Go to sleep factory
appModule.factory("sleepfactory", () => Application.Factories.sleepfactory);



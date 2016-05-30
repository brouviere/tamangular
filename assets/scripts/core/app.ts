/// <reference path="../framework/angular.d.ts"/>
/// <reference path="../controllers/home-controller.ts"/>
/// <reference path="./factories/gamevars-factory.ts"/>

var appModule = angular.module("tamangularApp", []);

appModule.controller("HomeController", ["$scope", "gamevarsfactory", "$interval", ($scope, gamevarsfactory, $interval) =>
	new Application.Controllers.HomeController($scope, gamevarsfactory, $interval)]);

/** Declare factory for the game variables (life, mood, tired, money)  **/
appModule.factory("gamevarsfactory", () => Application.Factories.gamevarsfactory);

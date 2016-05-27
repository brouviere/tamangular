/// <reference path="../framework/angular.d.ts"/>
/// <reference path="../controllers/home-controller.ts"/>
/// <reference path="./factories/gamevars-factory.ts"/>

var appModule = angular.module("tamangularApp", []);

appModule.controller("HomeController", ["$scope", "gamevarsfactory", ($scope, gamevarsfactory) =>
	new Application.Controllers.HomeController($scope, gamevarsfactory)]);

/** Declare factory for the game variables (life, mood, tired, money)  **/
appModule.factory("gamevarsfactory", () => Application.Factories.gamevarsfactory);
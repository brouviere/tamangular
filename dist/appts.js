/// <reference path="../framework/angular.d.ts"/>
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($scope, gamevarsfactory, $interval, workfactory, foodfactory, sleepfactory) {
                this.scope = $scope;
                this.gameVars = new gamevarsfactory;
                this.workfactory = new workfactory;
                this.foodfactory = new foodfactory;
                this.sleepfactory = new sleepfactory;
                this.scope.gameStarted = false;
                this.listfood = this.foodfactory.getFoodList();
                this.lastScore = localStorage.getItem('lastScore');
                this.interval = $interval;
            }
            HomeController.prototype.readyToPlay = function (trigger) {
                if (trigger === "ok") {
                    // console.log(trigger);
                    this.ready = true;
                    // console.log(this.ready);
                    return this.ready;
                }
                else {
                    // console.log(trigger);
                    this.ready = false;
                    // console.log(this.ready);
                    return this.ready;
                }
            };
            /**
            * INIT the game variables
            **/
            HomeController.prototype.initGameVars = function () {
                this.lifePoints = this.gameVars.getLifePoints();
                this.moodPoints = this.gameVars.getMoodPoints();
                this.tiredPoints = this.gameVars.getTiredPoints();
                this.hasWorked = false;
                this.hasSlept = false;
                this.scope.gameStarted = true;
                this.scope.onAction = false;
                this.scope.state = "good";
                this.scope.score = 0;
                this.scope.lastScore = this.lastScore;
                this.money = this.gameVars.getMoney();
                this.becomeOlder();
            };
            // Start the lifetime cycle
            HomeController.prototype.becomeOlder = function () {
                var _this = this;
                var pdv = this.lifePoints;
                console.log("init pdv = " + pdv);
                this.cycle = setInterval(function () {
                    _this.scope.$apply(function () {
                        _this.setOlderVariables();
                        _this.scope.score++;
                        localStorage.setItem('lastScore', JSON.stringify(_this.scope.score));
                    });
                }, 5000);
            };
            HomeController.prototype.isDead = function () {
                clearInterval(this.cycle);
                this.scope.gameStarted = false;
                this.scope.state = "dead";
            };
            // Called on a cycle, defines the loss of points
            HomeController.prototype.setOlderVariables = function () {
                this.lifePoints--;
                if (this.lifePoints <= 0) {
                    this.isDead();
                    return false;
                }
                if (!this.hasWorked) {
                    this.lifePoints -= 3;
                }
                if (!this.hasSlept) {
                    if (this.hasWorked) {
                        this.tiredPoints += 5;
                        this.moodPoints -= 5;
                    }
                    this.tiredPoints += 10;
                }
                if (this.tiredPoints >= 100) {
                    this.lifePoints -= 15;
                    this.moodPoints -= 15;
                }
                this.hasWorked = false;
                this.hasSlept = false;
                console.log(this.lifePoints);
            };
            HomeController.prototype.setActionVariables = function (workingVariables) {
                this.lifePoints += workingVariables['life'];
                this.moodPoints += workingVariables['mood'];
                this.tiredPoints += workingVariables['tired'];
                this.money += workingVariables['money'];
                this.scope.workingVariables = workingVariables;
            };
            HomeController.prototype.goToWork = function () {
                this.scope.onAction = true;
                this.scope.state = "bad";
                this.setActionVariables(this.workfactory.working(this.tiredPoints));
                this.hasWorked = true;
                this.waitingAction(2000);
            };
            HomeController.prototype.goToSleep = function () {
                this.scope.onAction = true;
                this.scope.state = "dead";
                this.setActionVariables(this.sleepfactory.sleeping(this.tiredPoints));
                this.hasSlept = true;
                this.waitingAction(3000);
            };
            HomeController.prototype.goEating = function (food) {
                console.log(food);
                this.scope.onAction = true;
                this.scope.state = "bad";
                this.waitingAction(1000);
                this.setActionVariables(this.foodfactory.eating(food));
            };
            HomeController.prototype.waitingAction = function (time) {
                var _this = this;
                setTimeout(function () {
                    _this.scope.$apply(function () {
                        _this.scope.onAction = false;
                        _this.scope.state = "good";
                    });
                }, time);
            };
            HomeController.prototype.acceptWork = function (work) {
                console.log('yo', work);
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
/// <reference path="../../framework/angular.d.ts"/>
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var gamevarsfactory = (function () {
            function gamevarsfactory() {
                // Init the game variables
                this.gamevars = this.initGamevars();
            }
            /**
            ** Init the variables of the game
            **/
            gamevarsfactory.prototype.initGamevars = function () {
                this.lifePoints = 100;
                this.moodPoints = 100;
                this.tiredPoints = 0;
                this.money = 50;
            };
            /**
            ** GETTERS of game variables
            **/
            gamevarsfactory.prototype.getLifePoints = function () {
                return this.lifePoints;
            };
            gamevarsfactory.prototype.getMoodPoints = function () {
                return this.moodPoints;
            };
            gamevarsfactory.prototype.getTiredPoints = function () {
                return this.tiredPoints;
            };
            gamevarsfactory.prototype.getMoney = function () {
                return this.money;
            };
            return gamevarsfactory;
        }());
        Factories.gamevarsfactory = gamevarsfactory;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));
/// <reference path="../../framework/angular.d.ts"/>
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var workfactory = (function () {
            function workfactory() {
            }
            // Variables
            workfactory.prototype.working = function (tiredPoints) {
                var workingVariables = new Array;
                workingVariables['money'] = 1;
                workingVariables['tired'] = 1;
                workingVariables['mood'] = -1;
                workingVariables['life'] = -1;
                if (tiredPoints >= 30 && tiredPoints < 50)
                    workingVariables['life'] = -2;
                else if (tiredPoints > 50)
                    workingVariables['life'] = -3;
                console.log(workingVariables);
                return workingVariables;
            };
            workfactory.prototype.getWorkList = function () {
            };
            return workfactory;
        }());
        Factories.workfactory = workfactory;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));
/// <reference path="../../framework/angular.d.ts"/>
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var foodfactory = (function () {
            function foodfactory() {
            }
            foodfactory.prototype.getFoodList = function () {
                var foodList = {
                    'carrotes': {
                        name: 'carrotes',
                        price: -5,
                        life: 1,
                        mood: -1
                    },
                    'epinards': {
                        name: 'epinards',
                        price: -5,
                        life: 2,
                        mood: -3
                    },
                    'burger': {
                        name: 'burger',
                        price: -1,
                        life: -2,
                        mood: 3
                    },
                    'coca': {
                        name: 'coca',
                        price: -1,
                        life: -2,
                        mood: 3
                    },
                    'gateau': {
                        name: 'gateau',
                        price: -2,
                        life: 0,
                        mood: 2
                    }
                };
                return foodList;
            };
            foodfactory.prototype.eating = function (food) {
                var workingVariables = new Array;
                var fl = this.getFoodList();
                workingVariables['money'] = fl[food].price;
                workingVariables['tired'] = 0;
                workingVariables['mood'] = fl[food].mood;
                workingVariables['life'] = fl[food].life;
                console.log(workingVariables);
                return workingVariables;
            };
            return foodfactory;
        }());
        Factories.foodfactory = foodfactory;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));
/// <reference path="../../framework/angular.d.ts"/>
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var sleepfactory = (function () {
            function sleepfactory() {
            }
            sleepfactory.prototype.sleeping = function (tiredPoints) {
                var Variables = new Array;
                Variables['money'] = 0;
                Variables['tired'] = -10;
                Variables['mood'] = 5;
                Variables['life'] = 5;
                return Variables;
            };
            return sleepfactory;
        }());
        Factories.sleepfactory = sleepfactory;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));
/// <reference path="../../framework/angular.d.ts"/>
var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var chooseworkDirective = (function () {
            function chooseworkDirective(worklistService) {
                this.close = true;
                this.wkService = worklistService;
                return this.instanceDirective();
            }
            chooseworkDirective.prototype.instanceDirective = function () {
                var thesunhine = [];
                this.wkService.getWorkList().then(function (data) {
                    var wk = Math.floor((Math.random() * 10));
                    var i = 0;
                    angular.forEach(data, function (value, key) {
                        if (wk == i)
                            thesunhine = value;
                        i++;
                    });
                });
                return {
                    templateUrl: './assets/scripts/core/directives/templates/choosework.html',
                    restrict: 'A',
                    scope: {
                        acceptWork: "&"
                    },
                    link: function (scope) {
                        scope.work = thesunhine;
                        scope.closework = this.close;
                    }
                };
            };
            return chooseworkDirective;
        }());
        Directives.chooseworkDirective = chooseworkDirective;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
/// <reference path="../../framework/angular.d.ts"/>
var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var worklistService = (function () {
            function worklistService($http, $q) {
                this.http = $http;
                this.q = $q;
            }
            worklistService.prototype.getWorkList = function () {
                //  Initialisation du service "query" => Declaration de la promise
                var myDefer = this.q.defer();
                this.http({
                    method: 'GET',
                    url: './work-list.json'
                }).then(function success(response) {
                    console.log(response.data);
                    myDefer.resolve(response.data);
                }, function error(response) {
                    console.log(response);
                    return false;
                });
                return myDefer.promise;
            };
            return worklistService;
        }());
        Services.worklistService = worklistService;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
/// <reference path="../framework/angular.d.ts"/>
/// <reference path="../controllers/home-controller.ts"/>
/// <reference path="./factories/gamevars-factory.ts"/>
/// <reference path="./factories/work-factory.ts"/>
/// <reference path="./factories/food-factory.ts"/>
/// <reference path="./factories/sleep-factory.ts"/>
/// <reference path="./directives/choose-work.ts"/>
/// <reference path="./services/worklist-service.ts"/>
var appModule = angular.module("tamangularApp", []);
appModule.controller("HomeController", ["$scope", "gamevarsfactory", "$interval", "workfactory", "foodfactory", "sleepfactory",
    function ($scope, gamevarsfactory, $interval, workfactory, foodfactory, sleepfactory) {
        return new Application.Controllers.HomeController($scope, gamevarsfactory, $interval, workfactory, foodfactory, sleepfactory);
    }]);
/** Declare factory for the game variables (life, mood, tired, money)  **/
appModule.factory("gamevarsfactory", function () { return Application.Factories.gamevarsfactory; });
// Go to work factory
appModule.factory("workfactory", function () { return Application.Factories.workfactory; });
// Go to work factory
appModule.factory("foodfactory", function () { return Application.Factories.foodfactory; });
// Go to sleep factory
appModule.factory("sleepfactory", function () { return Application.Factories.sleepfactory; });
// Go to work list service
appModule.service("worklistService", ["$http", "$q", function ($http, $q) { return new Application.Services.worklistService($http, $q); }]);
// Choose work directive
appModule.directive("chooseworkDirective", ["worklistService", function (worklistService) { return new Application.Directives.chooseworkDirective(worklistService); }]);
/// <reference path="../../framework/angular.d.ts"/>
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var cyclefactory = (function () {
            function cyclefactory() {
            }
            cyclefactory.prototype.gettingOlder = function (lifePoints) {
                setInterval(function (lifePoints) {
                    console.log('plop', lifePoints);
                    return this.lifePoints -= 1;
                }, 1000);
            };
            return cyclefactory;
        }());
        Factories.cyclefactory = cyclefactory;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));

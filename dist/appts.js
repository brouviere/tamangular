var Application;!function(o){var t;!function(o){var t=function(){function o(o,t,i,e,n){this.scope=o,this.gameVars=new t,this.workfactory=new e,this.foodfactory=new n,this.scope.gameStarted=!1,this.listfood=this.foodfactory.getFoodList(),console.log(this.listfood),this.interval=i}return o.prototype.initGameVars=function(){this.lifePoints=this.gameVars.getLifePoints(),this.moodPoints=this.gameVars.getMoodPoints(),this.tiredPoints=this.gameVars.getTiredPoints(),this.hasWorked=!1,this.scope.gameStarted=!0,this.scope.onAction=!1,this.scope.state="good",this.scope.score=0,this.money=this.gameVars.getMoney(),this.becomeOlder()},o.prototype.becomeOlder=function(){var o=this,t=this.lifePoints;console.log("init pdv = "+t),this.cycle=setInterval(function(){o.scope.$apply(function(){o.setOlderVariables(),o.scope.score++})},3e3)},o.prototype.setOlderVariables=function(){return this.lifePoints--,this.lifePoints<=0?(clearInterval(this.cycle),this.scope.gameStarted=!1,!1):(this.hasWorked||(this.lifePoints-=3),this.hasWorked=!1,void console.log(this.lifePoints))},o.prototype.setActionVariables=function(o){this.lifePoints+=o.life,this.moodPoints+=o.mood,this.tiredPoints+=o.tired,this.money+=o.money},o.prototype.goToWork=function(){this.scope.onAction=!0,this.scope.state="bad",this.setActionVariables(this.workfactory.working(this.tiredPoints)),this.hasWorked=!0,this.waitingAction(3e3)},o.prototype.goEating=function(o){console.log(o),this.scope.onAction=!0,this.scope.state="bad",this.waitingAction(1e3),this.setActionVariables(this.foodfactory.eating(o))},o.prototype.waitingAction=function(o){var t=this;setTimeout(function(){t.scope.$apply(function(){t.scope.onAction=!1,t.scope.state="good"})},o)},o}();o.HomeController=t}(t=o.Controllers||(o.Controllers={}))}(Application||(Application={}));var Application;!function(o){var t;!function(o){var t=function(){function o(){this.gamevars=this.initGamevars()}return o.prototype.initGamevars=function(){this.lifePoints=100,this.moodPoints=100,this.tiredPoints=0,this.money=50},o.prototype.getLifePoints=function(){return this.lifePoints},o.prototype.getMoodPoints=function(){return this.moodPoints},o.prototype.getTiredPoints=function(){return this.tiredPoints},o.prototype.getMoney=function(){return this.money},o}();o.gamevarsfactory=t}(t=o.Factories||(o.Factories={}))}(Application||(Application={}));var Application;!function(o){var t;!function(o){var t=function(){function o(){}return o.prototype.working=function(o){var t=new Array;return t.money=1,t.tired=1,t.mood=-1,t.life=-1,o>=30&&50>o?t.life=-2:o>50&&(t.life=-3),console.log(t),t},o}();o.workfactory=t}(t=o.Factories||(o.Factories={}))}(Application||(Application={}));var Application;!function(o){var t;!function(o){var t=function(){function o(){}return o.prototype.getFoodList=function(){var o={carrotes:{name:"carrotes",price:-5,life:1,mood:-1},epinards:{name:"epinards",price:-5,life:2,mood:-3},burger:{name:"burger",price:-1,life:-2,mood:3},coca:{name:"coca",price:-1,life:-2,mood:3},gateauchocolat:{name:"gateau au chocolat",price:-2,life:0,mood:2}};return o},o.prototype.eating=function(o){var t=new Array,i=this.getFoodList();return t.money=i[o].price,t.tired=0,t.mood=i[o].mood,t.life=i[o].life,console.log(t),t},o}();o.foodfactory=t}(t=o.Factories||(o.Factories={}))}(Application||(Application={}));var appModule=angular.module("tamangularApp",[]);appModule.controller("HomeController",["$scope","gamevarsfactory","$interval","workfactory","foodfactory",function(o,t,i,e,n){return new Application.Controllers.HomeController(o,t,i,e,n)}]),appModule.factory("gamevarsfactory",function(){return Application.Factories.gamevarsfactory}),appModule.factory("workfactory",function(){return Application.Factories.workfactory}),appModule.factory("foodfactory",function(){return Application.Factories.foodfactory});var Application;!function(o){var t;!function(o){var t=function(){function o(){}return o.prototype.gettingOlder=function(o){setInterval(function(o){return console.log("plop",o),this.lifePoints-=1},1e3)},o}();o.cyclefactory=t}(t=o.Factories||(o.Factories={}))}(Application||(Application={}));
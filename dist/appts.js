var Application;!function(t){var o;!function(t){var o=function(){function t(t,o,i,e){this.scope=t,this.gameVars=new o,this.workfactory=new e,this.scope.gameStarted=!1,this.interval=i}return t.prototype.initGameVars=function(){this.lifePoints=this.gameVars.getLifePoints(),this.moodPoints=this.gameVars.getMoodPoints(),this.tiredPoints=this.gameVars.getTiredPoints(),this.hasWorked=!1,this.scope.gameStarted=!0,this.scope.working=!1,this.scope.state="good",this.money=this.gameVars.getMoney(),this.becomeOlder()},t.prototype.becomeOlder=function(){var t=this,o=this.lifePoints;console.log("init pdv = "+o),this.cycle=setInterval(function(){t.scope.$apply(function(){t.setOlderVariables()})},3e3)},t.prototype.setOlderVariables=function(){return this.lifePoints--,this.lifePoints<=0?(clearInterval(this.cycle),this.scope.gameStarted=!1,!1):(this.hasWorked||(this.lifePoints-=3),this.hasWorked=!1,void console.log(this.lifePoints))},t.prototype.setActionVariables=function(t){this.lifePoints+=t.life,this.moodPoints+=t.mood,this.tiredPoints+=t.tired,this.money+=t.money},t.prototype.goToWork=function(){var t=this;this.scope.working=!0,this.scope.state="bad",this.setActionVariables(this.workfactory.working(this.tiredPoints)),this.hasWorked=!0,setTimeout(function(){t.scope.$apply(function(){t.scope.working=!1,t.scope.state="good"})},3e3)},t}();t.HomeController=o}(o=t.Controllers||(t.Controllers={}))}(Application||(Application={}));var Application;!function(t){var o;!function(t){var o=function(){function t(){this.gamevars=this.initGamevars()}return t.prototype.initGamevars=function(){this.lifePoints=100,this.moodPoints=100,this.tiredPoints=0,this.money=50},t.prototype.getLifePoints=function(){return this.lifePoints},t.prototype.getMoodPoints=function(){return this.moodPoints},t.prototype.getTiredPoints=function(){return this.tiredPoints},t.prototype.getMoney=function(){return this.money},t}();t.gamevarsfactory=o}(o=t.Factories||(t.Factories={}))}(Application||(Application={}));var Application;!function(t){var o;!function(t){var o=function(){function t(){}return t.prototype.working=function(t){var o=new Array;return o.money=1,o.tired=1,o.mood=-1,o.life=-1,t>=30&&50>t?o.life=-2:t>50&&(o.life=-3),console.log(o),o},t}();t.workfactory=o}(o=t.Factories||(t.Factories={}))}(Application||(Application={}));var appModule=angular.module("tamangularApp",[]);appModule.controller("HomeController",["$scope","gamevarsfactory","$interval","workfactory",function(t,o,i,e){return new Application.Controllers.HomeController(t,o,i,e)}]),appModule.factory("gamevarsfactory",function(){return Application.Factories.gamevarsfactory}),appModule.factory("workfactory",function(){return Application.Factories.workfactory});var Application;!function(t){var o;!function(t){var o=function(){function t(){}return t.prototype.gettingOlder=function(t){setInterval(function(t){return console.log("plop",t),this.lifePoints-=1},1e3)},t}();t.cyclefactory=o}(o=t.Factories||(t.Factories={}))}(Application||(Application={}));
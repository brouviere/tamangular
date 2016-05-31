describe('hometest', function(){
	beforeEach(module('tamangularApp'));

	var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  beforeEach(inject(function($rootScope, $controller){
  	scope = $rootScope.$new();
  	controller = $controller('HomeController', { $scope: scope });
			
  }));


	describe('initGameVars', function() {
		it('Initialize the variables of the game', function() {
			controller.initGameVars();
			expect(controller.lifePoints).toBe(100);
			expect(controller.moodPoints).toBe(100);
			expect(controller.tiredPoints).toBe(0);
			expect(controller.money).toBe(50);
		});
	});
	describe('goToWork', function() {
		it('test variables after go to Work', function() {
			controller.initGameVars();
			controller.goToWork();

			expect(controller.lifePoints).toBe(99);
			expect(controller.moodPoints).toBe(99);
			expect(controller.tiredPoints).toBe(1);
			expect(controller.money).toBe(51);
		});
	});

	describe('goToSleep', function() {
		it('test variables after go to Sleep', function() {
			controller.initGameVars();
			controller.goToSleep();

			expect(controller.lifePoints).toBe(105);
			expect(controller.moodPoints).toBe(105);
			expect(controller.tiredPoints).toBe(-10);
			expect(controller.money).toBe(50);
		});
	});

});
/**
 *
 * Created by leason on 2017/6/14.
 */

"use strict";

/**
 * Controller单元测试
 */
describe('myController function', function() {
    describe('indexCtrl-test', function() {
        beforeEach(module('starter')); // will be run before each it() function
        var notesFactory;
            notesFactory = {
                notes: ['note1', 'note2'], //just two elements initially
                get: function() {
                    return this.notes;
                },
                put: function(content) {
                    this.notes.push(content);
                }
            };
        it('测试数组正确添加indexCtrl', inject(function($rootScope, $controller) { //injects the dependencies
            var scope = $rootScope.$new();
            var ctrl = $controller('indexCtrl', {$scope: scope, notesFactory:notesFactory});
            expect(scope.notes.length).toBe(2);
            scope.note = 'test3';
            scope.createNote();
            expect(scope.notes.length).toBe(3);
        }));

    });
});
/**
 * filter单元测试
 */
describe('filter', function() {
    beforeEach(module('starter'));


    describe('interpolate', function() {

        beforeEach(module(function($provide) {
            $provide.value('version', 'TEST_VER');
        }));


        it('should replace VERSION', inject(function(interpolateFilter) {
            expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
        }));
    });
});

/**
 * directive单元测试
 */
describe('Unit testing directive', function() {
    var $compile;
    var $rootScope;
    // Load the myApp module, which contains the directive
    beforeEach(module('starter'));
    //防止ui-router会定向到index
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile("<a-great-eye></a-great-eye>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
    });
});
/**
 * servers单元测试
 */
describe('http', function() {

    beforeEach(module('starter'));
    //防止ui-router会定向到index
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    var httpReq;
    var $httpBackend;
    beforeEach(inject(function(_httpReq_, _$httpBackend_) {
        httpReq = _httpReq_;
        $httpBackend = _$httpBackend_;
    }));
    describe('when sending a message', function() {
        beforeEach(function() {
            httpReq.sendMessage();
            $httpBackend.when('GET','http://it-ebooks-api.info/v1/search/JavaScript')
                .respond(200, {message: 'Ook.', id: 0});
            $httpBackend.flush();
        });
        it('should send an HTTP GET request', function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});
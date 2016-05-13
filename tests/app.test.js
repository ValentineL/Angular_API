describe('ApiCall', function() {
    var scope, httpBackend, createController;

    beforeEach(module('angularTable'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
        httpBackend = _$httpBackend_;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('listdata', {
                '$scope': scope
            });
        };
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should run the Test to get the repositories', function() {
        var repositories = [{"id": 41977278, "name": "android-material-drawer-template", "updated_at": "2015-09-05T22:11:02Z"},
                            {"id": 58416374, "name": "Angular-API", "updated_at": "2016-05-10T00:30:45Z"}];
        var controller = createController();

        httpBackend.expect('GET', 'https://api.github.com/users/valentinel/repos')
            .respond(repositories);

        $controller.list('repositories')
            .then(function(data) {
                expect(data.length).toEqual(2);
            });

        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        scope.$apply(function() {
            scope.fetchRepos();
        });

        expect(scope.parseOriginalUrlStatus).toEqual('calling');

        httpBackend.flush();

        expect(scope.parseOriginalUrlStatus).toEqual('waiting');
        expect(scope.doneScrapingOriginalUrl).toEqual(true);
    });
});
 
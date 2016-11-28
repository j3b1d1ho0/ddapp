namespace d_dapp {

    angular.module('d_dapp', ['ui.router', 'ngResource', 'ngMaterial', 'ngMessages']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider.state('Modules', {
             url: "/Modules",
             templateUrl: 'modulesPage.html',
             controller: d_dapp.Controllers.ModulesController,
             controllerAs: 'controller'
         }).state("Gear", {
             url: "/Gear",
             templateUrl:'gearPage.html',
             controller: d_dapp.Controllers.GearController,
             controllerAs: 'controller'
         }).state("Account", {
             url: "/Account",
             templateUrl:'accountPage.html',
             controller: d_dapp.Controllers.AccountController,
             controllerAs: 'controller'
        }).state("Forum", {
             url: "/Forum",
             templateUrl:'forumPage.html',
             controller: d_dapp.Controllers.ForumController,
             controllerAs: 'controller'
        }).state("Home", {
             url: "/",
             templateUrl:'/ngApp/views/home.html',
             controller: d_dapp.Controllers.HomeController,
             controllerAs: 'controller'
        }).state("Articles", {
             url: "/Articles",
             templateUrl:'articlesPage.html',
             controller: d_dapp.Controllers.ArticlesController,
             controllerAs: 'controller'
            });
            $urlRouterProvider.otherwise('/');


        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    

}

namespace d_dapp {

    angular.module('d_dapp', ['ui.router', 'ngResource', 'ngMaterial', 'ngMessages', 'ngCookies']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        $mdThemingProvider: ng.material.IThemingProvider,
        $mdIconProvider: ng.material.IIconProvider
        
    ) => {
        // Define routes
        $stateProvider.state('Modules', {
             url: "/Modules",
             templateUrl: '/ngApp/views/modules.html',
             controller: d_dapp.Controllers.ModulesController,
             controllerAs: 'controller'
         }).state("Gear", {
             url: "/gear",
             templateUrl:'/ngApp/views/gear.html',
             controller: d_dapp.Controllers.GearController,
             controllerAs: 'controller'
         }).state("Edit", {
             url: "/edit",
             templateUrl:'/ngApp/views/edit.html',
             controller: d_dapp.Controllers.EditController,
             controllerAs: 'controller'
         }).state("Login", {
             url: "/login",
             templateUrl:'/ngApp/views/login.html',
             controller: d_dapp.Controllers.LoginController,
             controllerAs: 'controller'
         }).state("Register", {
             url: "/register",
             templateUrl:'/ngApp/views/register.html',
             controller: d_dapp.Controllers.LoginController,
             controllerAs: 'controller'
         }).state("Account", {
             url: "/account",
             templateUrl:'/ngApp/views/account.html',
             controller: d_dapp.Controllers.AccountController,
             controllerAs: 'controller'
        }).state("Forum", {
             url: "/forum",
             templateUrl:'/ngApp/views/forum.html',
             controller: d_dapp.Controllers.ForumController,
             controllerAs: 'controller'
        }).state("Home", {
             url: "/",
             templateUrl:'/ngApp/views/home.html',
             controller: d_dapp.Controllers.HomeController,
             controllerAs: 'controller'
        }).state("Articles", {
             url: "/articles",
             templateUrl:'/ngApp/views/articles.html',
             controller: d_dapp.Controllers.ArticlesController,
             controllerAs: 'controller'
            });
            $urlRouterProvider.otherwise('/');

            $mdThemingProvider.theme('default')
        .backgroundPalette('grey', {
            'default': '100'
        })
        .primaryPalette('deep-orange', {
            'default': '900', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
        .accentPalette('blue', {
            'default': '700',
            'hue-1': '900'
        })

    // If you specify less than all of the keys, it will inherit from the
    // default shades
        .warnPalette('red', {
            'default': '900' // use shade 200 for default, and keep all other shades the same
        });
        const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    

}

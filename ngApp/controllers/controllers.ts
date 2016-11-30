namespace d_dapp.Controllers {

  export class HomeController {
        public maps;
        public map = {};

        public save() {
          this.mapService.save(this.map).then(()=> {
            this.maps = this.mapService.list(); 
            this.map = {};     
            }).catch((err) => {
            console.error(err);
          })
        }

        public remove(mapId) {
          this.mapService.remove(mapId).then(() => {
            this.maps = this.mapService.list(); 
          }).catch((err) => {
            console.error(err);
          });
        }

        constructor(private mapService:d_dapp.Services.MapService) {
          this.maps = this.mapService.list();
        }
    }

    export class EditController {
        public map;

        public save() {
          this.mapService.save(this.map).then(()=> {
            this.$state.go('home'); 
          }).catch((err) => {
            console.error(err);
          })
        }

        constructor(
          private mapService:d_dapp.Services.MapService,
          private $state: ng.ui.IStateService,
          private $stateParams: ng.ui.IStateParamsService
        ) {
          let mapId = $stateParams['id'];
          this.map = this.mapService.get(mapId);
        }
    }


    export class ModulesController {

    }
    export class ForumController {

    }
    export class ArticlesController {

    }
    export class AccountController {

    }
    export class GearController {

    }
    // export class RegisterController {
      

    // }
    export class LoginController {
      public user;
      public currentUser;
      public UserService;
      public CookieService;
      public login(user) {
        this.userService.login(user).then((res) => {
          this.CookieService.put('token', res.token);
          this.UserService.getUser(res._id).then((user) => {
            this.$rootScope['currentUser'] = user.user;
            console.log('-- Current User in $rootScope --');
            console.log(this.$rootScope['currentUser']);
            this.$state.go('home');
          }).catch((err) => {
            this.logout();
          });
        }).catch((err) => {
          alert('Bunk login, please try again.');
        });
      }

      public register(user) {
        this.userService.register(user).then((res) => {
          this.$state.go('Login');
        }).catch((err) => {
          alert('Registration error: please try again.');
        });
      }

      public logout() {
        //destroy the cookie
        this.$rootScope['currentUser'] = null;
        this.CookieService.remove('token');
        this.$state.go('Home');
      }
      
      constructor(
        private userService:d_dapp.Services.UserService,
        private $state: ng.ui.IStateService,
        private $rootScope: ng.IRootScopeService,
        private $cookies: ng.cookies.ICookiesService
      ) {
        this.UserService = userService;
        this.CookieService = $cookies;
      }

    }
}

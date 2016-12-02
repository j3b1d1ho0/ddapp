namespace d_dapp.Controllers {

  export class NavController {
    public currentUser;
    constructor(
      currentUser: ng.ui.IResolvedState,
      userService: d_dapp.Services.UserService
    ) {
      this.currentUser = currentUser
    }
  }

  export class HomeController {
        public maps;
        public map = {};
        public newMap;



        public sendRating(map) {
            this.mapService.editMaps(map).then(() => {
                this.currentMaps();
            });
        }
        public mapAdd() {
            this.mapService.saveMaps(this.newMap).then((maps) => {
                console.log(maps)
                this.currentMaps();
            }).catch((err) => {
                console.log(err)
            })
        }

        public removeMap(mapId) {
          this.mapService.removeMaps(mapId).then(() => {
              this.currentMaps();
          }).catch((err) => {
            console.log(err);
          });
        }

        public currentMaps() {
             this.mapService.listMaps().then((maps) => {
                this.maps = maps;
            }).catch((err) => {
                console.log(err)
            })
        }
        
        public save() {
          this.mapService.saveMaps(this.map).then(()=> {
            this.maps = this.mapService.listMaps(); 
            this.map = {};     
            }).catch((err) => {
            console.error(err);
          })
        }

        public remove(mapId) {
          this.mapService.removeMaps(mapId).then(() => {
            this.maps = this.mapService.listMaps(); 
          }).catch((err) => {
            console.error(err);
          });
        }

        constructor(
        private mapService:d_dapp.Services.MapService,
        private $state: ng.ui.IStateService,
        private $resource:ng.resource.IResourceService) 
          {this.mapService.listMaps().then((results) => {
            this.maps = results;
            console.log("grr")
          }).catch((err) => {
            console.log("again?")
          });
          console.log(this.maps)
        }
    }

    export class EditController {
        public map;
        public mapEdit;
        public save() {
          this.mapService.saveMaps(this.map).then(()=> {
            this.$state.go('nav.Home'); 
          }).catch((err) => {
            console.error(err);
          })
        }
        public editClear(form:ng.IFormController) {
          form.$setPristine()
        }

        constructor(
          private mapService:d_dapp.Services.MapService,
          private $state: ng.ui.IStateService,
          private $stateParams: ng.ui.IStateParamsService
        ) {
          let mapId = $stateParams['id'];
          console.log($stateParams)
          //MAKE SURE GETMAPS RETURNS AN OBJECT!
          this.mapService.getMaps(mapId).then((results) => {
            this.map = results;
          }).catch((err) => {
            console.log(err)
          }) ;
        }
    }


    export class ModulesController {

    }
    export class ForumController {

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
        this.UserService.login(user).then((res) => {
          this.CookieService.put('token', res.token);
          this.$state.transitionTo('nav.Home', null, {reload: true, notify:true});
        }).catch((err) => {
          alert('Bunk login, please try again.');
        });
      }

      public register(user) {
        this.userService.register(user).then((res) => {
          this.$state.go('nav.Login');
        }).catch((err) => {
          alert('Registration error: please try again.');
        });
      }

      public logout() {
        //destroy the cookie
        this.$rootScope['currentUser'] = null;
        this.CookieService.remove('token');
        this.$state.go('nav.Home');
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

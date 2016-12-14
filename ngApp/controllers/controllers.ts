namespace d_dapp.Controllers {

  export class NavController {
    public currentUser;
    public maps;
    public map = {};
    public newMap;
    public tags = [];
    public categories = ["Dungeon", "NPC", "World"];
    public newChip(chip) {
      return {
        name: chip,
        };
    };
    
    public openLeftMenu() {
      this.$mdSidenav('left').toggle();
    }
    public currentMaps() {
      this.mapService.listMaps().then((maps) => {
        this.maps = maps;
      }).catch((err) => {
        console.log(err)
      })
    }
    public mapAdd() {
      this.newMap.tags = this.tags;
      this.mapService.saveMaps(this.newMap).then((maps) => {
        console.log(maps)
        this.$state.go('nav.Home', null, {reload: true});
      }).catch((err) => {
        console.log(err)
      })
    }
    public save() {
      this.newMap.tags = this.tags;
          this.mapService.saveMaps(this.map).then(()=> {
            this.maps = this.mapService.listMaps(); 
            this.map = {};     
            }).catch((err) => {
            console.error(err);
          })
        }

    constructor(
      currentUser: ng.ui.IResolvedState,
      userService: d_dapp.Services.UserService,
      private mapService:d_dapp.Services.MapService,
      private $state: ng.ui.IStateService,
      $mdMedia: ng.material.IMedia,
      private $mdSidenav: ng.material.ISidenavService,

    ) {
      this.currentUser = currentUser

    this.mapService.listMaps().then((results) => {
            this.maps = results;
            console.log("grr")
          }).catch((err) => {
            console.log("again?")
          });
          console.log(this.maps)
        }
  }

  export class HomeController {
        public maps;
        public map = {};
        public newMap;
        public categories = ["Dungeon", "NPC", "World"];
// TODO: clean up the HomeController



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
        private currentUser: ng.ui.IResolvedState,
        private mapService:d_dapp.Services.MapService,
        private $state: ng.ui.IStateService,
        private $resource:ng.resource.IResourceService
        ) 
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
        public newMap;
        public categories = ["Dungeon", "NPC", "World"];
        public editTags = [];
        public newChip(chip) {
      return {
        name: chip,
        };
    };
        public save() {
          console.log(this.editTags, "heeeey")
          this.map.tags = this.editTags;
          this.mapService.saveMaps(this.map).then(()=> {
            this.$state.go('nav.Home'); 
          }).catch((err) => {
            console.error(err);
          })
        }
       

        constructor(
          private mapService:d_dapp.Services.MapService,
          private $state: ng.ui.IStateService,
          private $stateParams: ng.ui.IStateParamsService,
          $mdMedia: ng.material.IMedia,
        ) {console.log(this.editTags,"heeeey")
          let mapId = $stateParams['id'];
          console.log($stateParams)
          this.mapService.getMaps(mapId).then((results) => {
            this.map = results;
          }).catch((err) => {
            console.log(err)
          }) ;
        }
    }


    export class LoginController {
      public user;
      public adminPriv;
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
        this.userService.register({user:this.user, key: this.adminPriv}).then((res) => {
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

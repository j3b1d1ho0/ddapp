namespace d_dapp.Services {

      export class MapService {
      private MapResource;

      public get(id) {
        return this.MapResource.get({id:id});
      }

      public list() {
        return this.MapResource.query();
      }

      public save(map) {
        return this.MapResource.save({id:map._id}, map).$promise;
      }

      public remove(mapId) {
        return this.MapResource.remove({id:mapId}).$promise;
      }

      constructor($resource:ng.resource.IResourceService) {
        this.MapResource = $resource('/api/maps/:id');
      }
  }
  export class UserService {
      private LoginResource;
      private RegisterResource;
      private UserResource;
      public isLoggedIn;

      public login(user) {
        return this.LoginResource.save(user).$promise;
      }

      public register(user) {
        return this.RegisterResource.save(user).$promise;
      }

      public getUser(id) {
        return this.UserResource.get(id).$promise;
      }
      //ask about this /api/login/local stuff
      constructor($resource: ng.resource.IResourceService) {
        this.LoginResource = $resource('/api/Login/Local');
        this.RegisterResource = $resource('/api/Register');
        this.UserResource = $resource('/api/users/:id');
        this.isLoggedIn = function(){
        }
      }
    }

    angular.module('d_dapp').service('userService', UserService);

  angular.module('d_dapp').service('mapService', MapService);

    }

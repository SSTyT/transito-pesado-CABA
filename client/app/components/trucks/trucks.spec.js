import TrucksModule from './trucks'
import TrucksController from './trucks.controller';
import TrucksComponent from './trucks.component';
import TrucksTemplate from './trucks.html';

describe('Trucks', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TrucksModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TrucksController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(TrucksTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = TrucksComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(TrucksTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(TrucksController);
      });
  });
});

class SideMenuController {
  constructor(measured, $interval) {
    this.name = 'sideMenu';
    $interval(() => {
      this.metrics = measured.getCollection('reports').toJSON();
    }, 5000);
  }
}

export default ['measured', '$interval', SideMenuController];

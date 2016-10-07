class SideMenuController {
  constructor(measured, $interval) {
    this.options = {
    	showStop: true 
    }
    $interval(() => {
      let means = [] 
      this.metrics = measured.getCollection('reports').toJSON();
      this.vehiclesMetrics = measured.getCollection('vehicles').toJSON()
      this.means = [];

      Object.keys(this.vehiclesMetrics).forEach((vehicle) => {
        means.push({ vehicle, mean: Math.round(this.vehiclesMetrics[vehicle].mean * 100) / 100 });
      });

      means.sort(function(v1, v2) {
        return v2.mean - v1.mean;
      });

      this.means = means.slice(0, 5);
    }, 5000);
  }
}

export default ['measured', '$interval', SideMenuController];

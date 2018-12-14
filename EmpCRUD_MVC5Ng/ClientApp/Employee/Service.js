// ClientApp/Employee/Service.js

empApp.service('employeeService', function ($http) {

    // list all employees
    this.getEmployees = function () {
        return $http.get("/Employee/GetEmployee");
    }

    // Add employee 
    this.addEmployee = function (employee) {
        var request = $http({
            method: 'POST',
            url: '/Employee/CreateEmployee',
            data: employee
        });

        return request;
    }

    // Update employee info by id
    this.updateEmployee = function (employee) {
        var request = $http({
            method: 'POST',
            url: '/Employee/UpdateEmployee',
            data: employee  
        });

        return request;
    }

    // Delete employee by id
    this.deleteEmployee = function (updatedEmpID) {
        return $http.post('/Employee/DeleteEmployee/' + updatedEmpID);
    }
});
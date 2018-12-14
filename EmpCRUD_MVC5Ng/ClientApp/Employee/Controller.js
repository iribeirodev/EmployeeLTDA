// ClientApp/Employee/Controller.js

empApp.controller('employeeCtrl', function ($scope, employeeService) {

    loadEmployees();    // getting employees list when loading the page

    // list all employees
    function loadEmployees() {
        var empList = employeeService.getEmployees();

        empList.then(function (response) {
            $scope.employees = response.data;
        },  function () {
            console.log('An error ocurred while listing employees');
        });
    }

    // Add employee
    $scope.addEmployee = function () {
        var employee = {
            EmpID: $scope.empID,
            Name: $scope.name,
            Department: $scope.department,
            Role: $scope.role,
            Email: $scope.email
        };

        var info = employeeService.addEmployee(employee);

        info.then(function (response) {
            if (response.data.success === true) {
                loadEmployees();
                alert('Employee registered');

                $scope.cleanFields();
            } else {
                alert('Employee was not registered!');
            }
        },
        function () {
            alert('Error trying to add a new employee');
        });
    }

    // clean all fields when inserting new employee
    $scope.cleanFields = function () {
        $scope.empID = "";
        $scope.name = "";
        $scope.department = "";
        $scope.role = "";
        $scope.email = "";
    }

    // Update employee info by id
    $scope.updateEmployeeById = function (employee) {
        $scope.updatedEmpID = employee.EmpID;
        $scope.updatedName = employee.Name;
        $scope.updatedDepartment = employee.Department;
        $scope.updatedRole = employee.Role;
        $scope.updatedEmail = employee.Email;
    }

    $scope.deleteEmployeeById = function (employee) {
        $scope.updatedEmpID = employee.EmpID;
        $scope.updatedName = employee.Name;
        $scope.updatedDepartment = employee.Department;
        $scope.updatedRole = employee.Role;
    }

    // Send employee data to be updated
    $scope.updateEmployee = function () {
        var employee = {
            EmpID: $scope.updatedEmpID,
            Name: $scope.updatedName,
            Department: $scope.updatedDepartment,
            Role: $scope.updatedRole,
            Email: $scope.updatedEmail
        };

        var updateInfo = employeeService.updateEmployee(employee);
        updateInfo.then(function (response) {
            if (response.data.success === true) {
                loadEmployees();

                alert("Employee Updated");
                $scope.cleanUpdatedEmployee();
            } else {
                alert("Employee was not updated");
            }
        }, function () {
            alert('Error trying to update employee');
        });
    }

    // Clean all fields after updating an employee
    $scope.cleanUpdatedEmployee = function () {
        $scope.updatedEmpID = "";
        $scope.updatedName = "";
        $scope.updatedDepartment = "";
        $scope.updatedRole = "";
        $scope.updatedEmail = "";
    }

    // Delete employee by id
    $scope.deleteEmployee = function (updatedEmpID) {
        var deleteInfo = employeeService.deleteEmployee($scope.updatedEmpID);

        deleteInfo.then(function (response) {
            if (response.data.success === true) {
                loadEmployees();

                alert('Employee Deleted.');
            } else {
                alert('Employee was not deleted.');
            }
        }, function () {
            alert('Error trying to delete employee');
        });
    }
});

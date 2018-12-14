using EmpCRUD_MVC5Ng.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmpCRUD_MVC5Ng.Controllers
{
    public class EmployeeController : Controller
    {
        #region List Employees 

        // GET Employee/GetEmployee
        public JsonResult GetEmployee()
        {
            using (var db = new EmpDBEntities())
            {
                var list = db.Employees.ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Create an employee
        // POST Employee/CreateEmployee
        [HttpPost]
        public JsonResult CreateEmployee(Employee employee)
        {
            if (employee != null)
            {
                using (var db = new EmpDBEntities())
                {
                    db.Employees.Add(employee);
                    db.SaveChanges();

                    return Json(new { success = true });
                }

            }

            return Json(new { success = false });
        }
        #endregion

        #region Update Employee Info
        // POST Employee/UpdateEmployee
        [HttpPost]
        public JsonResult UpdateEmployee(Employee employeeInfo)
        {
            using (var db = new EmpDBEntities())
            {
                var currentEmployee = db.Employees.Find(employeeInfo.EmpID);
                if (currentEmployee == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    currentEmployee.Name = employeeInfo.Name;
                    currentEmployee.Department = employeeInfo.Department;
                    currentEmployee.Role = employeeInfo.Role;
                    currentEmployee.Email = employeeInfo.Email;
                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }
        }
        #endregion

        #region Delete Employee
        // POST Employee/DeleteEmployee
        [HttpPost]
        public JsonResult DeleteEmployee(int id)
        {
            using (var db = new EmpDBEntities())
            {
                var employeeToDelete = db.Employees.Find(id);
                if (employeeToDelete == null)
                {
                    return Json(new { success = false });
                }

                db.Employees.Remove(employeeToDelete);
                db.SaveChanges();

                return Json(new { success = true });
            }
        }
        #endregion
    }
}
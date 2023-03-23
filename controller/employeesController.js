const Employees = require('../model/Employees')

const getAllEmployees = (req, res) => {
    const allEmployees = Employees.find();
    res.status(200).json(allEmployees)
}

const postEmployees = async (req, res) => {
    
    const newEmployee = {
        _id: id,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ "message" : "firstname and lastname are required"})
    }
    const result = await Employees({newEmployee});
    await result.save();
    
}

const putEmployees = (req, res) => {
   const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))

   if (!employee ) {
    return res.json({ "message" : `employee ID ${req.body.id} not found`})
   }
   if (req.body.firstname) data.employees = req.body.firstname
   if (req.body.lastname) data.employees = req.body.lastname

   const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
   const UnfilteredArray = data.setEmployees([...filteredArray, employee])
   const sortedArray = UnfilteredArray.sort()
   res.json(sortedArray)

}

const deleteEmployees = (req, res) => {
    employee = data.employees.map(emp => emp.id === parseInt(req.body.id))

    if(! employee ) {
        return res.status(400).json({ "message" : `employee ID ${req.body.id} is not found`})
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    data.setEmployees = [...filteredArray]
    res.json(data.setEmployees)
}

const getEmployee = (req, res) => {
    employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    if (!employee) {
        return res.status(400).json({ "message" : `employee ${req.params.id} id not found`})
    }
    res.json({"id" : employee.id, 
        "firstname" : employee.firstname,
        "lastname" : employee.lastname})
   
}

module.exports = { 
    getAllEmployees,
    postEmployees,
    putEmployees,
    deleteEmployees,
    getEmployee
}
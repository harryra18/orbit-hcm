const Employee = require('../models/employee');

module.exports = {
  index: async (req, res) => {
    try {
      const employees = await Employee.find({}).sort({ name: 1 }).lean();
      res.render('employees/index', { employees });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  },

  newForm: (req, res) => {
    res.render('employees/new', { form: {}, error: null });
  },

  create: async (req, res) => {
    try {
      const payload = {
        hireDate: req.body.hireDate || null,
        status: req.body.status || 'PreStart',
        name: req.body.name,
        employeeNumber: req.body.employeeNumber,
        payClass: req.body.payClass,
        payType: req.body.payType,
        department: req.body.department,
        jobTitle: req.body.jobTitle,
        imageUrl: req.body.imageUrl,
        createdBy: req.session.user._id
      };
      await Employee.create(payload);
      res.redirect('/employees');
    } catch (err) {
      console.error(err);
      let message = 'Error creating employee';
      if (err.code === 11000) message = 'Employee number must be unique';
      res.status(400).render('employees/new', { error: message, form: req.body });
    }
  },

  show: async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id).lean();
      if (!employee) return res.redirect('/employees');
      res.render('employees/show', { employee });
    } catch (err) {
      console.error(err);
      res.redirect('/employees');
    }
  },

  editForm: async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id).lean();
      if (!employee) return res.redirect('/employees');
      res.render('employees/edit', { employee, error: null });
    } catch (err) {
      console.error(err);
      res.redirect('/employees');
    }
  },

  update: async (req, res) => {
    try {
      const updates = {
        hireDate: req.body.hireDate || null,
        status: req.body.status,
        name: req.body.name,
        employeeNumber: req.body.employeeNumber,
        payClass: req.body.payClass,
        payType: req.body.payType,
        department: req.body.department,
        jobTitle: req.body.jobTitle,
        imageUrl: req.body.imageUrl
      };
      await Employee.findByIdAndUpdate(req.params.id, updates, { runValidators: true });
      res.redirect(`/employees/${req.params.id}`);
    } catch (err) {
      console.error(err);
      let message = 'Error updating employee';
      if (err.code === 11000) message = 'Employee number must be unique';
      const employee = await Employee.findById(req.params.id).lean();
      res.status(400).render('employees/edit', { employee, error: message });
    }
  },

  destroy: async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.redirect('/employees');
    } catch (err) {
      console.error(err);
      res.redirect('/employees');
    }
  },

  terminateForm: async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id).lean();
      if (!employee) return res.redirect('/employees');
      res.render('employees/terminate', { employee, error: null });
    } catch (err) {
      console.error(err);
      res.redirect('/employees');
    }
  },

  saveTermination: async (req, res) => {
    try {
      const updates = {
        status: 'Terminated',
        terminationReason: req.body.terminationReason,
        terminationDate: req.body.terminationDate || new Date()
      };
      await Employee.findByIdAndUpdate(req.params.id, updates, { runValidators: true });
      res.redirect(`/employees/${req.params.id}`);
    } catch (err) {
      console.error(err);
      const employee = await Employee.findById(req.params.id).lean();
      res.status(400).render('employees/terminate', { employee, error: 'Error saving termination' });
    }
  }
};

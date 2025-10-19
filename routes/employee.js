const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const empCtrl = require('../controllers/employeeController');

// Index (list)
router.get('/', requireAuth, empCtrl.index);

// New
router.get('/new', requireAuth, empCtrl.newForm);
router.post('/', requireAuth, empCtrl.create);

// Show
router.get('/:id', requireAuth, empCtrl.show);

// Edit
router.get('/:id/edit', requireAuth, empCtrl.editForm);
router.put('/:id', requireAuth, empCtrl.update);

// Delete
router.delete('/:id', requireAuth, empCtrl.destroy);

// Termination
router.get('/:id/terminate', requireAuth, empCtrl.terminateForm);
router.put('/:id/terminate', requireAuth, empCtrl.saveTermination);

module.exports = router;

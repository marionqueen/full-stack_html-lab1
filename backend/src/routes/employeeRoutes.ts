import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';

const router = Router();

router.get('/', employeeController.getEmployees);
router.post('/', employeeController.createEmployee);
router.get('/departments', employeeController.getDepartments);

export default router;
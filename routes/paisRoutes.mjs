import express from 'express';

import { importarPaises }
from '../controllers/paisController.mjs';

const router = express.Router();

router.get('/importar', importarPaises);

export default router;
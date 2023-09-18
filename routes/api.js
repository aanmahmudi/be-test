const express = require('express');
const AuthController = require('../controllers/AuthController');
const TabungController = require('../controllers/TabungController');
const TarikController = require('../controllers/TarikController');
const SaldoController = require('../controllers/SaldoController');

const router = express.Router();

// Daftar
router.post('/daftar', AuthController.daftar);
router.post('/tabung', TabungController.tabung);
router.post('/tarik', TarikController.tarik);
router.get('/saldo/:no_rekening', SaldoController.lihatSaldo);

module.exports = router;
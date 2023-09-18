const pool = require('../connection');

const SaldoController = {
  async lihatSaldo(req, res) {
    try {
      const { no_rekening } = req.params;

      // Periksa apakah no_rekening dikenali
      const checkRekeningQuery = 'SELECT saldo FROM nasabah WHERE no_rekening = $1';
      const rekeningResult = await pool.query(checkRekeningQuery, [no_rekening]);

      if (rekeningResult.rows.length === 0) {
        return res.status(400).json({ remark: 'No Rekening tidak dikenali' });
      }

      // Dapatkan saldo saat ini
      const saldoSaatIni = rekeningResult.rows[0].saldo;

      // Return the response with saldo
      return res.status(200).json({ saldo: saldoSaatIni });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ remark: 'Terjadi kesalahan server' });
    }
  },
};

module.exports = SaldoController;
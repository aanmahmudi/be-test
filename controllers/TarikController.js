const pool = require('../connection');

const TarikController = {
  async tarik(req, res) {
    try {
      const { no_rekening, nominal } = req.body;

      // Periksa apakah no_rekening dikenali
      const checkRekeningQuery = 'SELECT * FROM nasabah WHERE no_rekening = $1';
      const rekeningResult = await pool.query(checkRekeningQuery, [no_rekening]);

      if (rekeningResult.rows.length === 0) {
        return res.status(400).json({ remark: 'No Rekening tidak dikenali' });
      }

      // Dapatkan saldo saat ini
      const saldoQuery = 'SELECT saldo FROM nasabah WHERE no_rekening = $1';
      const saldoResult = await pool.query(saldoQuery, [no_rekening]);
      const saldoSaatIni = saldoResult.rows[0].saldo;

      // Periksa apakah saldo mencukupi
      if (saldoSaatIni < nominal) {
        return res.status(400).json({ remark: 'Saldo tidak cukup' });
      }

      // Kurangi saldo sesuai dengan nominal penarikan
      const saldoBaru = saldoSaatIni - parseFloat(nominal);

      // Update saldo di database
      const updateSaldoQuery = 'UPDATE nasabah SET saldo = $1 WHERE no_rekening = $2';
      await pool.query(updateSaldoQuery, [saldoBaru, no_rekening]);

      // Return the response with updated saldo
      return res.status(200).json({ saldo: saldoBaru });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ remark: 'Terjadi kesalahan server' });
    }
  },
};

module.exports = TarikController;
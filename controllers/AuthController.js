const pool = require('../connection');

const AuthController = {
    async daftar(req, res) {
         try {
            const { nama, nik, no_hp, no_rekening } = req.body;
            console.log(req.body)
        // Periksa apakah nik atau no_hp sudah digunakan
            const checkNikQuery = 'SELECT * FROM nasabah WHERE nik = $1';
            const checkHpQuery = 'SELECT * FROM nasabah WHERE no_hp = $1';

            const nikResult = await pool.query(checkNikQuery, [nik]);
            const hpResult = await pool.query(checkHpQuery, [no_hp]);

            if (nikResult.rows.length > 0) {
                return res.status(400).json({ remark: 'NIK sudah digunakan' });
            }
        
            if (hpResult.rows.length > 0) {
                return res.status(400).json({ remark: 'Nomor HP sudah digunakan' });
            }

            const insertQuery = `INSERT INTO nasabah (no_rekening, nama, nik, no_hp) VALUES ($1, $2, $3, $4) RETURNING *`;

            // Jika nik dan no_hp belum digunakan, buat akun baru
            const insertResult = await pool.query(insertQuery, [no_rekening, nama, nik, no_hp]);
            const result = insertResult.rows[0];

            return res.status(200).json({ result });
        }  catch (error) {
            console.error(error);
            return res.status(500).json({ remark: 'Terjadi kesalahan server' });
        }
    },
};

module.exports = AuthController;
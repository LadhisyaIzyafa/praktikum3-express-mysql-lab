const ProdukModel = require('../models/produk.model');
const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produk.controller');

router.get('/produk', produkController.getDaftarProduk);
router.get('/produk/tambah', produkController.getFormTambah);
router.post('/produk/tambah', produkController.postTambahProduk);

router.get('/produk/edit/:id', produkController.getFormEdit);
router.post('/produk/edit/:id', produkController.postUpdateProduk);
router.post('/produk/hapus/:id', produkController.postHapusProduk);
router.get('/uji-keamanan', async (req, res) => {
  const inputPayload = req.query.kategori;

  // Skenario A: rentan (aktifkan ini untuk uji 1)
  // const hasil = await ProdukModel.getByKategoriInsecure(inputPayload);

  // Skenario B: aman (aktif secara default)
  const hasil = await ProdukModel.getByKategoriSecure(inputPayload);

  res.json({ input: inputPayload, totalDataDitemukan: hasil.length, data: hasil });
});
module.exports = router;
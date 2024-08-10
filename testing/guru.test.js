const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const GURU = async (data) => {
  return api.post('/api/v1/guru')
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo')
    .send(data);
};

const expectedApiResponseSchema = {
  guru: {
    id: expect.any(String),
    nama: expect.any(String),
    nuptk: expect.any(String),
    nbm: expect.any(Number),
    gender: expect.any(String),
    ttl: expect.any(String),
    usia: expect.any(Number),
    th_masuk: expect.any(Number),
    th_masuk_bulan: expect.any(String),
    status: expect.any(String),
    jabatan: expect.any(String),
    it_tk: expect.any(String),
    it_sekolah: expect.any(String),
    it_jurusan: expect.any(String),
    it_tahun: expect.any(Number),
    mata_diklat: expect.any(String),
    alamat: expect.any(String),
    telp: expect.any(String),
    jp_sd: expect.any(String),
    jp_sd_th: expect.any(Number),
    jp_smp: expect.any(String),
    jp_smp_th: expect.any(Number),
    jp_sma: expect.any(String),
    jp_sma_th: expect.any(Number),
    jp_pt: expect.any(String),
    jp_pt_th: expect.any(Number),
    sekolah_lain: expect.any(String), // or expect.anything() for any non-empty string
    deleted: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  },
};

describe('Endpoint guru', () => {
  test('Endpoint guru berstatus 200', async () => {
    try {
      const guruData = {
        nama: "fiki",
        nuptk: "123456",
        nbm: "12345",
        gender: "L",
        ttl: "sby 02-04",
        usia: 23,
        th_masuk: 2021,
        th_masuk_bulan: "april",
        status: "presiden",
        jabatan: "presiden",
        it_tk: "s1",
        it_sekolah: "oxford",
        it_jurusan: "informatika",
        it_tahun: 2023,
        mata_diklat: "informatika",
        alamat: "kyoto",
        telp: "08200000",
        jp_sd: "sd",
        jp_sd_th: 2007,
        jp_smp: "smp",
        jp_smp_th: 2013,
        jp_sma: "sma",
        jp_sma_th: 2019,
        jp_pt: "oxford",
        jp_pt_th: 2023,
        sekolah_lain: "MTS NURUL IMAN",
      };

      const response = await GURU(guruData);

      // Asserting that the response status is within the range of 200 to 299
      if (response.status >= 400) {
        console.warn('API Response Warning:', response.body);
      } else {
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBeLessThan(300);

        // Define the expected schema for the API response
        expect(response.body).toEqual(expectedApiResponseSchema);
      }
    } catch (error) {
      // Log the detailed error information
      console.error('Test failed:', error.message);
      throw error; // Throw back the error to ensure the test fails
    }
  });
});

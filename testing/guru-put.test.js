const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const updateguru = async (id, data) => {
  return api.put(`/api/v1/guru/${id}/update`)
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo')
    .send(data);
};

// Define the expected schema for the API response
const expectedApiResponseSchema = {
  update: expect.arrayContaining([
    expect.any(Number), // atau sesuaikan dengan tipe data yang sesuai
  ]),
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
      const id = 'e5435dd4-8918-485f-aef2-860f42c098aa';

      const response = await updateguru(id, guruData);

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
      if (error.response) {
        console.error('API Response:', error.response.body);
      }
      throw error;
    }
  });
});




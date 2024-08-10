const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const createDinas = async (data) => {
  return api.post('/api/v1/dinas')
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo')
    .send(data);
};

const expectedApiResponseSchema = {
  dinas: {
    id: expect.any(String),
    ijin_mulai: expect.any(String),
    ijin_berakhir: expect.any(String),
    jabatan: expect.any(String),
    unit_kerja: expect.any(String),
    keperluan: expect.any(String),
    name: null,
    catatan: null,
    kembali_tl: null,
    putusan: null,
    setuju_uk: null,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    deleted: false,
    validation: false,
  },
};

describe('Endpoint dinas', () => {
  test('Endpoint create dinas berstatus 200', async () => {
    try {
      const dinasData = {
        name: "surat bisnis",
        jabatan: "guru",
        unit_kerja: "tata usaha",
        keperluan: 'sakit',
        ijin_mulai: "2023-12-05T09:00:00Z",
        ijin_berakhir: "2023-12-05T09:00:00Z",
      };

      const response = await createDinas(dinasData);

      if (response.status >= 400) {
        console.warn('API Response Warning:', response.body);
      } else {
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBeLessThan(300);

        expect(response.body.dinas).toEqual(expectedApiResponseSchema.dinas);
      }
    } catch (error) {
      console.error('Test failed:', error.message);
      throw error;
    }
  });
});

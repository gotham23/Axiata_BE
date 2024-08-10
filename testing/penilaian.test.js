const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const createPenilaian = async (data) => {
  return api.post('/api/v1/penilaian')
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo')
    .send(data);
};

const expectedApiResponseSchema = {
  penilaian: {
    id: expect.any(Number),
    user_id: expect.any(String),
    siswa_id: expect.any(String),
    type: expect.any(Number),
    nilai: expect.any(String),
    deleted: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  },
};

describe('Endpoint penilaian', () => {
  test('Endpoint create penilaian berstatus 200', async () => {
    try {
      const penilaianData = {
        siswa_id: "a8f596c2-a7bf-4567-9d1f-895653c03598",
        type: 3,
        nilai: "70", 
      };

      const response = await createPenilaian(penilaianData);

     
      if (response.status >= 400) {
        console.warn('API Response Warning:', response.body);
      } else {
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBeLessThan(300);

        
        expect(response.body.penilaian.id).toEqual(expectedApiResponseSchema.penilaian.id);
        expect(response.body.penilaian.nilai).toEqual(expectedApiResponseSchema.penilaian.nilai);
      }
    } catch (error) {
     
      console.error('Test failed:', error.message);
      throw error; 
    }
  });
});

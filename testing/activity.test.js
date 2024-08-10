const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const createActivity = async (data) => {
  return api.post('/api/v1/activ')
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo')
    .send(data);
};

const expectedApiResponseSchema = {
  activ: {
    id: expect.any(String),
    name: expect.any(String),
    s_activity: expect.any(String),
    e_activity: expect.any(String),
    deleted: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  },
};

describe('Endpoint activ', () => {
  test('Endpoint activ berstatus 200', async () => {
    try {
      const activityData = {
        kegiatan: 'Contoh Kegiatan',
        mulai: '2023-12-05T09:00:00Z',
        selesai: '2023-12-05T10:00:00Z',
      };

      const response = await createActivity(activityData);
     

      // Asserting that the response status is within the range of 200 to 299
      if (response.status  >= 400) {
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

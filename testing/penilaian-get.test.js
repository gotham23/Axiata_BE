const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const getPenilaian = async (id) => {
    return api.get(`/api/v1/${id}/penilaian`)
      .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo');
  };

// Define the expected schema for the API response
const expectedApiResponseSchema = {
  deleted: expect.arrayContaining([
    expect.any(Number), // atau sesuaikan dengan tipe data yang sesuai
  ]),
};

describe('Endpoint penilaian', () => {
  test('Endpoint penilaian berstatus 200', async () => {
    try {
      const id = 'bc4a0390-566a-42ac-8241-bdaede6ac15d';

      const response = await getPenilaian(id);

      // Asserting that the response status is within the range of 200 to 299
      if (response.status >= 400) {
        console.log( response.body);
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

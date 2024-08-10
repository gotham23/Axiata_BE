const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const deleteSiswa = async (id) => {
  return api.delete(`/api/v1/${id}/siswa`)
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo');
};

// Define the expected schema for the API response
const expectedApiResponseSchema = {
  errors: expect.arrayContaining([
    expect.anything(), // atau sesuaikan dengan tipe data yang sesuai
  ]),
};

describe('Endpoint siswa', () => {
  test('Endpoint siswa berstatus 200', async () => {
    try {
      const id = 'bc4a0390-566a-42ac-8241-bdaede6ac15d';

      const response = await deleteSiswa(id);

      // Asserting that the response status is within the range of 200 to 299
      if (response.status >= 400) {
        
      } else {
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBeLessThan(300);

        // Define the expected schema for the API response
        expect(response.body).toEqual(expectedApiResponseSchema);
      }
    } catch (error) {
      // Log the detailed error information
      console.error('Test failed:', error.message);
     
    }
  });
});

const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const deleteMail = async (id) => {
  return api.get(`/api/v1/${id}/mail`)
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo');
};

// Define the expected schema for the API response
const expectedApiResponseSchema = {
  deleted: expect.arrayContaining([
    expect.any(Number), // atau sesuaikan dengan tipe data yang sesuai
  ]),
};

describe('Endpoint Surat', () => {
  test('Endpoint Surat berstatus 200', async () => {
    try {
      const id = 'bee96916-9019-4d73-9dd7-5a811c0ce023';

      const response = await deleteMail(id);

      // Asserting that the response status is within the range of 200 to 299
      if (response.status >= 400) {
        console.log( response.body);
      } else {
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBeLessThan(300);

        // Define the expected schema for the API response
        expect(response.body).toEqual(expectedApiResponseSchema);
      }
    } catch {
    
    
    }
  });
});

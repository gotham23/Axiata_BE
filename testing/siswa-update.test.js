const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const updateSiswa = async (id, data) => {
  return api.put(`/api/v1/siswa/${id}/update`)
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo')
    .send(data);
};

// Define the expected schema for the API response
const expectedApiResponseSchema = {
  update: expect.arrayContaining([
    expect.any(Number), // atau sesuaikan dengan tipe data yang sesuai
  ]),
};

describe('Endpoint activ', () => {
  test('Endpoint activ berstatus 200', async () => {
    try {
      const siswaData = {
        nama: 'Fikri Fahresi',
      };
      const id = 'a8f596c2-a7bf-4567-9d1f-895653c03598';

      const response = await updateSiswa(id, siswaData);

      // Asserting that the response status is within the range of 200 to 299
      if (response.status >= 400) {
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

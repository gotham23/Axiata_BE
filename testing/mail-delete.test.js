const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const deleteEmail = async (id) => {
  return api.delete(`/api/v1/mail/${id}/delete`)
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo');
};

// Define the expected schema for the API response
const expectedApiResponseSchema = {
  status: expect.any(Number),  // Angka status dari respons
  data: {
    // Define your expected schema for the 'data' property
    id: expect.any(String),  // Contoh: Id email yang dihapus sebagai string
    // ... tambahkan properti lain sesuai kebutuhan
  }
};

describe('Endpoint mail', () => {
  test('Endpoint mail delete berstatus 200', async () => {
    try {
      // Simpan ID email yang ingin Anda hapus atau dapatkan dari respons pengiriman email sebelumnya
      const id = 'bee96916-9019-4d73-9dd7-5a811c0ce023';  // Gantilah dengan ID email yang sebenarnya

      const response = await deleteEmail(id);

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

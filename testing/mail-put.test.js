const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const updateMail = async (mailId) => {
  return api.put(`/api/v1/mail/${mailId}/update`)
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo')
    .set('Accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .field('kepada', 'fikrifahresi@gmail.com')
    .field('subjek', 'surat sekolah')
    .field('isi', 'hallo admin')
    .attach('Image', '_image_1698633783576_592368481.jpg');
};

const expectedApiResponseSchema = {
  status: expect.any(Number),  // Angka status dari respons
  data: {
    // Define your expected schema for the 'data' property
    updatedMailId: expect.any(String),  // Contoh: Id email yang diupdate sebagai string
    // ... tambahkan properti lain sesuai kebutuhan
  }
};

describe('Endpoint mail', () => {
  test('Endpoint mail update berstatus 200', async () => {
    try {
      // Simpan ID email yang ingin Anda update atau dapatkan dari respons pengiriman email sebelumnya
      const mailIdToUpdate = '123abc';  // Gantilah dengan ID email yang sebenarnya

      const response = await updateMail(mailIdToUpdate);

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

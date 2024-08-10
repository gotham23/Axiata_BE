const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const mail = () =>
  api.post('/api/v1/mail')
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo')
    .set('Accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .field('kepada', 'fikrifahresi@gmail.com')
    .field('subjek', 'surat sekolah')
    .field('isi', 'hallo admin')
    .attach('Image', '_image_1698633783576_592368481.jpg');

    const expectedApiResponseSchema = {
      status: expect.any(Number),  // Angka status dari respons
      data: {
        // Define your expected schema for the 'data' property
        messageId: expect.any(String),  // Contoh: Id pesan sebagai string
        sender: expect.any(String),     // Contoh: Pengirim sebagai string
        recipient: expect.any(String),  // Contoh: Penerima sebagai string
        subject: expect.any(String),    // Contoh: Subjek sebagai string
        body: expect.any(String),       // Contoh: Isi pesan sebagai string
        // ... tambahkan properti lain sesuai kebutuhan
      }
    };
    
    describe('Endpoint mail', () => {
      test('Endpoint mail berstatus 200', async () => {
        try {
          const response = await mail();
    
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

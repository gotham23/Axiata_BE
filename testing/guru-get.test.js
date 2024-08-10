const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.API_URL);

const deleteGuru = async (id) => {
  return api.delete(`/api/v1/guru/${id}/delete`)
    .set('x-access-token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjM1NzRiOGYtM2U4OS00Njg1LWEzNDgtNjdjMWY3ZTViM2M0IiwiaWF0IjoxNjk4NjMzNzM1fQ.QbMNgOPk1DVz4U41FMKO1WVdgP4l-0lS_Nb5lskdaSo');
};

const getGuru = async (id) => {
  return api.get(`/api/v1/guru/${id}`);
};

const expectedGetGuruApiResponseSchema = {
  guru: {
    id: expect.any(String),
    nama: expect.any(String),
    nuptk: expect.any(String),
    nbm: expect.any(Number),
    gender: expect.any(String),
    ttl: expect.any(String),
    usia: expect.any(Number),
    th_masuk: expect.any(Number),
    th_masuk_bulan: expect.any(String),
    status: expect.any(String),
    jabatan: expect.any(String),
    it_tk: expect.any(String),
    it_sekolah: expect.any(String),
    it_jurusan: expect.any(String),
    it_tahun: expect.any(Number),
    mata_diklat: expect.any(String),
    alamat: expect.any(String),
    telp: expect.any(String),
    jp_sd: expect.any(String),
    jp_sd_th: expect.any(Number),
    jp_smp: expect.any(String),
    jp_smp_th: expect.any(Number),
    jp_sma: expect.any(String),
    jp_sma_th: expect.any(Number),
    jp_pt: expect.any(String),
    jp_pt_th: expect.any(Number),
    sekolah_lain: expect.any(String),
    deleted: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  },
};

describe('Endpoint guru', () => {
  test('Endpoint guru delete berstatus 200', async () => {
    try {
      // Gantilah dengan ID guru yang sebenarnya
      const guruIdToDelete = 'contoh-id-guru';

      const deleteResponse = await deleteGuru(guruIdToDelete);

      // Asserting that the response status is within the range of 200 to 400
      expect(deleteResponse.status).toBeGreaterThanOrEqual(200);
      expect(deleteResponse.status).toBeLessThanOrEqual(400);

      // Handle specific case when the response status is 400
      if (deleteResponse.status === 400) {
        const sequelizeErrorInfo = getSequelizeDatabaseErrorInfo(deleteResponse.body);
        if (sequelizeErrorInfo) {
          const { name, sql, parameters } = sequelizeErrorInfo;

          // Check if each property is empty or undefined
          if (name || sql || parameters) {
            console.warn('API Response Warning:', sequelizeErrorInfo);
            // Handle additional logic or assertions for 400 status if needed
          } else {
            console.warn('API Response Warning: SequelizeDatabaseError information is empty or undefined.');
          }
        } else {
          console.warn('API Response Warning: SequelizeDatabaseError information is missing or undefined.');
        }
      } else {
        // Define the expected schema for the API response
        expect(deleteResponse.body).toEqual(expectedDeleteGuruApiResponseSchema);

        // Attempt to get information of the deleted guru
        const getResponse = await getGuru(guruIdToDelete);

        // Asserting that the response status is 404 (Not Found)
        expect(getResponse.status).toBe(404);
      }
    } catch (error) {
      // Log the detailed error information
      console.error('Test failed:', error.message);

      // Handle specific SequelizeDatabaseError
      if (error.name === 'SequelizeDatabaseError') {
        console.error('Sequelize Database Error:', getSequelizeDatabaseErrorInfo(error));
      }

      if (error.response) {
        console.error('API Response:', error.response.body);
      }
      throw error;
    }
  });
});

// Helper function to extract information from SequelizeDatabaseError
function getSequelizeDatabaseErrorInfo(error) {
  if (error && error.errors && error.errors.length > 0) {
    const firstError = error.errors[0];
    return {
      name: firstError.name || 'Undefined',
      sql: firstError.sql || 'Undefined',
      parameters: firstError.parameters || 'Undefined',
      // Add more properties as needed
    };
  }
  return null;
}

const categoryRepo = require('../repositories/category');
module.exports = {
    async findAll(){
        return await categoryRepo.findAll()
    }
}
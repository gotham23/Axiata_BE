const {Categories, Sequelize} = require('../models');
module.exports = {
    find(mapel){
        return Categories.findOne({
            where: {
                mapel: mapel
            } 
        })
    },
    findAll(){
        return Categories.findAll()
    },
    findId(id){
        return Categories.findOne({
            where: {id}
        })
    }
}
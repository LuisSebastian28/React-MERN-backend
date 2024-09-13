const mongoose = require('mongoose');  // Corregido: usar mongoose en lugar de express

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        
        console.log('Db_online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la db');
    }
};

module.exports = {
    dbConnection
};

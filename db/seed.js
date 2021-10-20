const database = require('./index.js')
const {HashPassword} = require('../utils/index.js')
const CreateAdmin = async (req, res) => { 
    const password = 'nb64034535medine';
    const hashed_password = await HashPassword(password);
    const query_text = `
        INSERT INTO users(role_id, full_name, main_phone, email, password)
            VALUES (1, 'Medine', '64034535', 'nurana_bedew_pharmacy@gmail.com','${hashed_password}' )
    `
    try {
        const {rows} = database.query(query_text, [])
    } catch (e) {
        console.log(e)
        throw e
    }
}

CreateAdmin()
const xlsx = require('xlsx')
const database = require('./index.js')

const wb = xlsx.readFile("nurana_price.xlsx", {cellDates:true})
const ws = wb.Sheets["price_list"]

const data = xlsx.utils.sheet_to_json(ws)


const Adding = async (data)=>{
    let i=0;
    for(i=0; i<data.length; i++){
        product = data[i];
        let date = product.date_of_expire.toString().split('.')
        try{
            let producer_id = 0;
            const insert_producer = `INSERT INTO producers (producer_name) VALUES ('${product.producer}') RETURNING id`
            const {rows} = await database.query(`SELECT id FROM producers WHERE producer_name = '${product.producer}'`, [])
            console.log(rows)
            if(rows[0]){
                producer_id = rows[0].id
            }else{
                const rs = await database.query(insert_producer, [])
                producer_id = rs.rows[0].id
            }
            const query_text = `
                INSERT INTO products(product_name, 
                    producer_id, stock_count, price,  
                    quantity, date_of_expire, updated_at)
                    VALUES ($1, $2, 250, $3, $4, '20${date[1]}-${date[0]}-01'::DATE, CURRENT_DATE)
                ON CONFLICT (product_name, deleted) WHERE (deleted = false) DO NOTHING
                RETURNING *
                `
                await database.query(query_text, [product.product_name, producer_id, 
                                            product.price, product.quantity_in_box])
        }catch(e){
            console.log("product_name", product.product_name, "\nNumber of the row", i)
        }
    }
}
Adding(data)

// console.log(date)
// const AddProducer = async (req, res) =>{
//     const {producer_name} = req.body
//     const query_text = `
//         INSERT INTO producers(producer_name) VALUES ('${producer_name}') RETURNING *
//     `
//     try {
//         const {rows} = await database.query(query_text, [])
//         return res.status(status.success).json({"rows":rows[0]})
//     } catch (e) {
//         console.log(e)
//         return res.json(true)
//     }
// }


// const AddProduct = async (req, res) =>{
//     /**
//  {
//     "product_name":"Soma2252612", 
//     "producer_id":1, 
//     "stock_count":225, 
//     "price":250, 
//     "quantity":50, 
//     "date_of_expire":"2021-03-28",
//     "new_in_come":true,
//     "description_tm":"Su derman barada yazylan yazylar name diyseniz shony diyin bize tapawudy yok", 
//     "description_ru":"Bu name yazjak diyseniz shol yokarky zat yone bu dinekje orscasy name etseniz shony edin"
// }
//      */
//     const {product_name, producer_id, stock_count, 
//         price,  quantity, date_of_expire, description_tm, description_ru, new_in_come} = req.body
//     const query_text = `
//         INSERT INTO products(product_name, 
//             producer_id, stock_count, price,  
//             quantity, date_of_expire, description_tm, description_ru, updated_at, new_in_come)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_DATE, $9)
//         RETURNING *
//         `
//     try {
//         const {rows} = await database.query(query_text, [product_name, producer_id, 
//             stock_count, price, quantity, date_of_expire, description_tm, description_ru, new_in_come])
//         return res.status(status.success).json({"rows":rows[0]})
//     } catch (e) {
//         if(e.message == 'duplicate key value violates unique constraint "products_product_name_key"'){
//             return res.status(status.created).json({"message":"The medicine with this name was added"})
//         }
//         console.log(e)
//         return res.status(status.notfound).json(false)
//     }
// }

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
                    VALUES ($1, $2, 5000, $3, $4, '20${date[1]}-${date[0]}-01'::DATE, CURRENT_DATE)
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


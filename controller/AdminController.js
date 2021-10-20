const database = require('../db/index.js')
const AdminHelper = require('../utils/index.js')
const status = require('../utils/status.js');
const {SendSMS} = require('../utils/sms')
const {OrderGenerator} = require('../pdfmaker/pdf.js')
const fs = require('fs');
// const e = require('express');
const path = require('path');
const { success } = require('../utils/status.js');

const LoadAdminUser = async (req, res) =>{
    if(req.user){
        return res.status(status.success).send("true");
    }return res.status(status.unauthorized).send("false");
}

const AdminLogin = async (req, res) =>{
    /******
     {
         "password":"61123141"
         "phone":61123141
     }
     *********/
    console.log("I am in admin login controller")
    const {password, phone} = req.body
    const query_text = `
        SELECT * FROM users u WHERE u.main_phone = $1 AND role_id = 1
    `
    try {
        const {rows} = await database.query(query_text, [phone])
        const user = rows[0]
        if(!user){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.notfound).json(message)
        }
        const is_password_same = await AdminHelper.ComparePassword(password, user.password)
        if (!is_password_same){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.bad).json(message)
        }
        const data = {"id":user.id, "phone":user.phone, "email":user.email}
        const access_token = await AdminHelper.GenerateAdminAccessToken(data)
        return res.status(status.success).json({"access_token":access_token})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Operation wasn't succesfully"})
    }
}

const GetUsers = async (req, res) =>{
    const {page, limit, user_name} = req.query
    let OffSet = ``
    if(page && limit && page !== "undefined" && limit !== "undefined"){
        OffSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        OffSet = ``
    }
    let WherePart = ``
    if(user_name && user_name !== "undefined"){
        WherePart = ` AND full_name ~* '${user_name}'`
    }
    const query_text = `
        SELECT (
            SELECT json_agg(us) FROM (
                SELECT id, full_name, main_phone, email, password
                FROM users 
                WHERE role_id = 2 AND deleted = false${WherePart}
                ORDER BY added_time DESC
                ${OffSet}
                )us) AS users,
            (SELECT COUNT(*) FROM users 
            WHERE role_id = 2 ${WherePart});
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.bad).send(false)
    }
}

const AddUser = async (req, res) =>{
    /************
    {
        "full_name":"Hydyr Japarow",
        "main_phone": "62181816",
        "email":"somebody@gmail.com",
        "password":"somethinglikethis"
    }
    ******************/
    const {full_name, main_phone, email, password } = req.body
    const hashed_password = await AdminHelper.HashPassword(password);
    const query_text = `
        INSERT INTO users(role_id, full_name, main_phone, email, password) 
            VALUES (2, $1, $2, $3, $4) RETURNING id, full_name, main_phone, email, password
    `
    try {
        const {rows} = await database.query(query_text, [full_name, main_phone, email, password]);
        const mess = `Nurana Bedew Pharmacy programmasyna ${main_phone} nomer we  ${password} gizlin kodly girip bilersiniz`
        SendSMS({phone:`${main_phone}`, message:mess})
        return res.status(200).json({"rows":rows[0]});
    } catch (e) {
        console.log(e)
        return res.status(500).json({"error":e});
    }
};

const UpdateUser = async (req, res) =>{
    const {full_name, main_phone, email} = req.body

    const {id} = req.params
    try {
        const query_text = `UPDATE users SET full_name = $1, main_phone = $2, email = $3 WHERE id = $4`
        const {rows} = await database.query(query_text, [full_name, main_phone, email, id])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DeleteUser = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        UPDATE users SET deleted = true WHERE id = ${id}
        `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

// const AddCategory = async (req, res) =>{
//     const {category_name} = req.body
//     const query_text = `
//         INSERT INTO categories(category_name) VALUES ('${category_name}') RETURNING *
//     `
//     console.log(category_name)
//     try {
//         const {rows} = await database.query(query_text, [])
//         return res.status(200).json({"rows":rows[0]})
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json(false)
//     }
// }

const AddProducer = async (req, res) =>{
    const {producer_name} = req.body
    const query_text = `
        INSERT INTO producers(producer_name) VALUES ('${producer_name}') RETURNING *
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.json(true)
    }
}

const AddProduct = async (req, res) =>{
    /**
 {
    "product_name":"Soma2252612", 
    "producer_id":1, 
    "stock_count":225, 
    "price":250, 
    "quantity":50, 
    "date_of_expire":"2021-03-28",
    "new_in_come":true,
    "description_tm":"Su derman barada yazylan yazylar name diyseniz shony diyin bize tapawudy yok", 
    "description_ru":"Bu name yazjak diyseniz shol yokarky zat yone bu dinekje orscasy name etseniz shony edin"
}
     */
    const {product_name, producer_id, stock_count, 
        price,  quantity, date_of_expire, description_tm, description_ru, new_in_come} = req.body
    const query_text = `
        INSERT INTO products(product_name, 
            producer_id, stock_count, price,  
            quantity, date_of_expire, description_tm, description_ru, updated_at, new_in_come)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_DATE, $9)
        RETURNING *
        `
    try {
        const {rows} = await database.query(query_text, [product_name, producer_id, 
            stock_count, price, quantity, date_of_expire, description_tm, description_ru, new_in_come])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        if(e.message == 'duplicate key value violates unique constraint "products_product_name_key"'){
            return res.status(status.created).json({"message":"The medicine with this name was added"})
        }
        console.log(e)
        return res.status(status.notfound).json(false)
    }
}

const UpdateProduct = async (req, res) =>{
    const {id} = req.params
    const {product_name, producer_id, stock_count, 
        price,  quantity, date_of_expire, description_tm, description_ru } = req.body
    let data = {}
    try{
        const {rows} = await database.query(`SELECT * FROM products WHERE id = ${id}`, [])
        data = rows[0]
    }catch(e){
        console.log(e);
        return res.status(status.error).send(false)
    }

    if (data.stock_count === 0 && stock_count >0){
        try {
            const query_text = `
                WITH updated AS (UPDATE products SET product_name = $1, producer_id = $2, stock_count = $3, 
                    price = $4, quantity = $5, date_of_expire = $6, 
                    description_tm = $7, description_ru = $8 WHERE id = ${id}
                ) SELECT u.main_phone, u.full_name, p.product_name
                    FROM users u
                        INNER JOIN notifications n
                            ON n.user_id = u.id
                        INNER JOIN products  p
                            ON p.id = n.product_id
                    WHERE p.id = ${id}
                `
            const {rows} = await database.query(query_text, [product_name, producer_id, stock_count, 
                price,  quantity, date_of_expire, description_tm, description_ru])
            for (let i=0; i<rows.length; i++){
                const mess = `HORMATLY ${rows[0].full_name}. Sizin bellige goyan ${rows[0].product_name} dermanyn gelendigini size habar beryaris`;
                SendSMS({phone:`${rows[0].main_phone}`, message:mess})
            }
            return res.status(status.success).send(true)
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }    
    }else{
        const query_text = `UPDATE products SET product_name = $1, producer_id = $2, 
            stock_count = $3, price = $4, quantity = $5, date_of_expire = $6, 
                description_tm = $7, description_ru = $8 WHERE id = ${id}
            `
        try {
            const {rows} = await database.query(query_text, [product_name, producer_id, stock_count, 
                price,  quantity, date_of_expire, description_tm, description_ru])
            return res.status(status.error).send(true)
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }
    }
}

const UpdateProducer = async (req, res) =>{
    const {id} = req.params
    const {producer_name} = req.body
    const query_text = `
        UPDATE producers SET producer_name = $1 WHERE id = $2
    `
    try {
        const {rows} = await database.query(query_text, [producer_name, id])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const UpdateNewInCome = async (req, res) =>{
    const {id, bool} = req.params;
    const query_text = `
        UPDATE products SET new_in_come = ${bool} WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DeleteProduct = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        UPDATE products SET deleted = true WHERE id = ${id}    
    `
    try {
        await database.query(query_text, [])
        // const directory = path.join(__dirname, `../uploads/${id}`)
        // fs.readdir(directory, (e, files)=>{
        //     if(files){
        //     for (const file of files){
        //         fs.unlink(path.join(directory, file), err =>{

        //         })
        //         console.log("i am in for cikl")
        //     }
        //     fs.rmdirSync(directory)
        //     }
        // }
        // )
        
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddProductImage = async (req, res) =>{
    const {id} = req.params
    const path = req.file.path
    const query_text = `
        INSERT INTO product_images(product_id, destination) VALUES (${id}, '${path}')
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const SendSMSNewInCome = async (req, res) =>{
    const query_text = `
        SELECT main_phone, full_name FROM users WHERE sms_sending = true AND role_id = 2 AND deleted = 'false'
    `
    try {
        const {rows} = await database.query(query_text, [])
	for (let i=0; i<rows.length; i++){
            const mess = `Nurana BEDEW Pharmacy karhanasyna taze derman serisdelerin gelendigini Size habar beryaris`
            SendSMS({phone:`${rows[i].main_phone}`, message:mess})
        }
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

// const GetAllCategory = async (req, res) =>{
//     const query_text = `
//         SELECT 
//             (SELECT json_agg(cat) FROM 
//                 (SELECT * FROM categories ORDER BY category_name ASC 
//             )cat) AS categories
//     `
//     try {
//         const {rows} = await database.query(query_text, [])
//         return res.status(status.success).json({"rows":rows[0]})
//     } catch (e) {
//         return res.status(status.error).send("Error")
//     }
// }

// const UpdateCategory = async (req, res) =>{
//     console.log("I am in controller of category")
//     const {id} = req.params
//     const {category_name} = req.body
//     console.log(category_name)
//     const query_text = `
//         UPDATE categories SET category_name = $1 WHERE id = $2 
//     `
//     try {
//         await database.query(query_text, [category_name, id])
//         return res.status(status.success).send(true)
//     } catch (e) {
//         return res.status(status.error).send(false)
//     }
// }

const GetProducers = async (req, res) =>{
    const query_text = `
        SELECT 
            (SELECT json_agg(pr) FROM
                (SELECT * FROM producers)pr) AS producers
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetAllProducts = async (req, res) =>{
    const {page, limit, product_name, producer_id} = req.query
    let offSet = ``
    if (page && limit && page !== 'undefined' && limit !== 'undefined'){
        offSet = `OFFSET ${(page)*limit} LIMIT ${limit}`
    }else{
        offSet = ``
    }
    let WherePart = ``
    if (product_name && product_name !== 'undefined'){
        WherePart += ` AND  p.product_name ~* '${product_name}'`
    }
    if(producer_id && producer_id !== 'undefined'){
        WherePart += ` AND p.producer_id = ${producer_id}`
    }
    const query_text = `
        SELECT (
            SELECT COUNT(*) 
            FROM products p
                WHERE p.id > 0 ${WherePart}
            ) AS count,
            (SELECT json_agg(pr) FROM
                (SELECT p.id, product_name, producer_name, p.producer_id,
                    stock_count, price, date_of_expire, new_in_come,
                        quantity, description_tm, description_ru,
                    (SELECT destination FROM product_images
                    WHERE product_id = p.id LIMIT 1    
                    ) AS image
                FROM products p
                    INNER JOIN producers prd 
                        ON prd.id = p.producer_id
                WHERE p.deleted = false ${WherePart}
                ORDER BY p.id ASC
                ${offSet}
            )pr) AS products
                `   
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const GetOrders = async (req, res) =>{
    const {page, limit, user_name} = req.query
    let OffSet = ``
    if (page && limit){
        OffSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        OffSet = ``
    }
    let WherePart = ``
    if (user_name && user_name !== 'undefined'){
        WherePart += ` AND u.full_name ~* '${user_name}' `
    }
    const query_text= `
        SELECT 
            (SELECT COUNT(*) 
            FROM orders o
                INNER JOIN users u
                    ON u.id = o.user_id 
            WHERE o.id>0 ${WherePart}) AS count,
            (SELECT json_agg(ord) FROM
                (SELECT to_char(o.created_at, 'DD-MM-YYYY') AS created_date, to_char(o.created_at, 'HH-MM') AS created_time,
                  o.has_seen, o.accepted, o.total_price, o.id, u.full_name, u.main_phone, accepted, top.paymant_name
                FROM orders o
                    INNER JOIN users u 
                        ON u.id = o.user_id
                    INNER JOIN type_of_paymants top
                        ON top.id = o.payment_id
                WHERE o.id>0 ${WherePart}
                ORDER BY created_at DESC
                ${OffSet}
            )ord) AS orders
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const AcceptOrder = async (req, res) =>{
    const {id} =req.params
    const {accepted} = req.body
    const query_text = `
        UPDATE orders SET accepted = ${accepted} WHERE id = ${id}
        `
    try {
        await database.query(query_text, [])
        return res.status(success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetOrderById = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        SELECT u.id, u.full_name, u.email, u.main_phone, o.total_price, o.id, 
            to_char(o.created_at, 'DD-MM-YYYY') AS created_date, to_char(o.created_at, 'HH-MM') AS created_time,
            (SELECT json_agg(oi) FROM (
                SELECT p.product_name, p.id, oit.product_price, oit.quantity
                FROM order_items oit
                    INNER JOIN products p
                        ON p.id = oit.product_id
                WHERE oit.order_id = ${id}
            )oi) AS items
            FROM orders o
                INNER JOIN users u
                    ON u.id = o.user_id
            WHERE o.id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const CreateOrderPDF = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        SELECT o.id AS order_id, to_char(o.created_at, 'DD/MM/YYYY') AS created_date, o.has_seen,
            total_price, u.full_name, u.main_phone, u.email, 
            (SELECT json_agg(ori) FROM(
                SELECT p.id AS product_id, p.product_name, oi.quantity, oi.product_price,
                    (SELECT oi.quantity*oi.product_price) AS total_product_price
                FROM products p
                    INNER JOIN order_items oi
                        ON oi.product_id = p.id
                WHERE oi.order_id = o.id
            )ori) AS order_items
        FROM orders o
            INNER JOIN users u
                ON o.user_id = u.id
        WHERE o.id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        const data = rows[0]
        if(data){
            res.setHeader('Content-type', 'application/pdf');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-disposition', 'attachment; filename=Untitled.pdf');
            const response = await OrderGenerator(data)
            await database.query('UPDATE orders SET has_seen = true WHERE id = $1', [id])
            return res.status(status.success).send(response)
        }
        return res.status(status.notfound).send(false)
    } catch (e) {
        console.log(e)
        return res.json(false)
        
    }      
}


module.exports = {
    LoadAdminUser,
    AdminLogin,
    AddProducer,
    AddUser,
    DeleteUser,
    AddProduct,
    UpdateNewInCome,
    DeleteProduct,
    GetProducers,
    GetAllProducts,
    GetOrders,
    GetOrderById,
    AcceptOrder,
    UpdateProduct,
    AddProductImage,
    GetUsers,
    UpdateUser,
    CreateOrderPDF,
    SendSMSNewInCome,
    UpdateProducer
}

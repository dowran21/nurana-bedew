const database = require('../db/index.js')
const AuthHelper = require('../utils/index.js')
const status = require('../utils/status.js')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const UserLogin = async (req, res) =>{
    const {phone, password} = req.body
    const query_text = `
        SELECT * FROM users u WHERE u.main_phone = $1 AND  deleted = 'false'
    `
    try {
        const {rows} = await database.query(query_text, [phone])
        const user = rows[0]
        if(!user){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"}
            return res.status(status.notfound).send(message)
        }

        if(user.password != password){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"}
            return res.status(status.notfound).send(message)
        }
        const data = {"id":user.id, "user": user.main_phone, "name":user.full_name, "email":user.email}
        const access_token = await AuthHelper.GenerateUserAccessToken(data)
        const refresh_token = await AuthHelper.GenerateUserRefreshToken(data)
        return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token, data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")        
    }
}

const UserRefresh = async (req, res) =>{
    const {refresh_token} = req.body
    if(!refresh_token){
        return res.status(status.not_authorized).json({"message":"Unauthorized"})
    }
    JWT.verify(refresh_token, process.env.REFRESH_SECRET_KEY, async(err, decoded)=>{
        if(err){
            return res.status(status.unauthorized).json({"message":"Unauthorized"})
        }if(decoded){
            try {
                const query_text = `SELECT * FROM users WHERE id = ${decoded.id} AND role_id = 2`
                const {rows} = await database.query(query_text, [])
                const user = rows[0]
                if(!user){
                    return res.status(status.notfound).send("Not Found")
                }
                const data = {"id":user.id, "user": user.main_phone, "name":user.full_name, "email":user.email}
                const access_token = await AuthHelper.GenerateUserAccessToken(data)
                const refresh_token2 = await AuthHelper.GenerateUserRefreshToken(data)
                return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token2, data})
            } catch (e) {
                console.log(e)
                return res.status(status.error).send("Error")
            }
        }
    })
}

const GetProducts = async (req, res) =>{
    const {page, limit} = req.query
    // const user_id = req.user.id
    const {product_name, price, new_in_come, producer_id} = req.query //price true bolse artyan tertipde gruppirowka false bolsa kemelyan tertipde
    // console.log(country_id)
    let WherePart = ``
    if (producer_id){
        let co_id = producer_id.replace('[','').replace(']','').replace(' ', '').split(',')
        WherePart += ` AND p.producer_id IN (${co_id.map(item => `${item}`).join(',')})`
    }
    if (product_name ){
        WherePart += ` AND (product_name ~* '${product_name}' OR description_tm ~* '${product_name}')`
    }
    let OffSet = ``
    if(page && limit){
        OffSet = ` OFFSET ${(page-1)*limit} LIMIT ${limit}`
    }else{
        OffSet = ``
    }  
    let OrderPart = ``
    if (price == 1){
        OrderPart = `ORDER BY p.price DESC`
    }else if(price == 2){
        OrderPart = `ORDER BY p.price ASC`        
    }
    if(price != 1 || price != 2){
        OrderPart = `ORDER BY p.product_name ASC, p.id ASC`
    }
    if(new_in_come == '1'){
        WherePart += ` AND new_in_come = true`
    }
    const query_text = `
        SELECT 
            (SELECT COUNT(*) 
            FROM products p
                INNER JOIN producers prd 
                    ON prd.id = p.producer_id
            WHERE p.id > 0 AND p.deleted = 'false' ${WherePart}) AS count,

            (SELECT json_agg(prod) FROM
                
                (SELECT p.id, p.product_name,
                    p.price::text, p.stock_count::INTEGER, 
                        (SELECT destination FROM product_images pi
                        WHERE pi.product_id = p.id LIMIT 1
                        ) AS image
                FROM products p
                    INNER JOIN producers prd 
                        ON prd.id = p.producer_id
                WHERE p.deleted = 'false' ${WherePart}
                ${OrderPart}
                ${OffSet}

                )prod) AS products
            
                `   
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const GetProductById = async (req, res) => {
    const {id} = req.params
    // const user_id = req.user.id
    const query_text = `
                SELECT p.id, p.product_name, p.price::text, p.stock_count, p.quantity::INTEGER,
                    prd.producer_name, p.description_tm, p.description_ru, 
                    to_char(p.date_of_expire, 'DD-MM-YYYY') AS date_of_expire, 
                    (SELECT destination FROM 
                    product_images pi WHERE pi.product_id = p.id LIMIT 1
                    ) AS image
                FROM products p
                    INNER JOIN producers prd 
                        ON prd.id = p.producer_id
                WHERE p.id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetCategories = async (req, res) => {
    const query_text = `
            SELECT 
                (SELECT json_agg(cat) FROM 
                    (SELECT * FROM categories 
                    ORDER BY category_name ASC
                )cat) AS categories
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const GetProducers = async (req, res) =>{
    const query_text = `
        SELECT (SELECT json_agg(co) FROM (
            SELECT * FROM producers
            )co) AS producers
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddToCart = async (req, res) => {
    const {id} = req.params
    const {quantity} = req.query
    const user_id = req.user.id
    let cart = {}
    let query_text = ``
    try {
        query_text = `
            SELECT * FROM carts WHERE carts.user_id = ${user_id} AND is_active = true
        `
        const {rows} = await database.query(query_text, [])
        cart = rows[0]
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
    if(!cart){
        query_text = `
            WITH inserted AS (
                INSERT INTO carts(user_id) VALUES (${user_id}) RETURNING id
            ) INSERT INTO cart_products(product_id, cart_id, quantity) 
                    VALUES(${id}, (SELECT id FROM inserted), ${quantity})
                ON CONFLICT (product_id, cart_id) DO UPDATE SET quantity = EXCLUDED.quantity
        `
        
    }
    if (cart){
        query_text = `
            INSERT INTO cart_products(product_id, cart_id, quantity)
                VALUES(${id}, ${cart.id}, ${quantity})
                ON CONFLICT (product_id, cart_id) DO UPDATE SET quantity = EXCLUDED.quantity
        `
    }
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).json(false)
    }
}

const GetCartProducts = async (req, res) => {
    const {qty} = req.body
    if (qty && qty != '[]'){
        let order_products = JSON.parse(qty)
        if (order_products && order_products != []){
            const query_text = `
                SELECT (
                    SELECT json_agg(pro) FROM (
                        SELECT p.product_name, p.id, p.stock_count, p.quantity, p.price::text,
                        (SELECT destination 
                            FROM product_images pi 
                        WHERE pi.product_id = p.id LIMIT 1) AS image
                    FROM products p
                    WHERE p.id IN (${order_products.map(item => `${item.id}`).join(',')})
                    ORDER BY id ASC
                )pro) AS products
            `
            try {
                const {rows} = await database.query(query_text, [])
                
                return res.status(status.success).json({"rows":rows[0]})
            } catch (e) {
                console.log(e)
                return res.status(status.error).send(false)
            }
        }
    }
    return res.status(status.success).json({"rows":null})
}

const UpdateCartProduct = async (req, res) =>{
    const {cart_id, product_id} = req.params
    const {quantity} = req.query
    let query_text = ``
    if (quantity == 0){
        query_text = `DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2`
    }else{
        query_text = `
            UPDATE cart_products SET quantity = ${quantity} WHERE cart_id = $1 AND product_id = $2
        `
    }
    
    try {
        const {rows} = await database.query(query_text, [cart_id, product_id])
        return res.status(status.success).json(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).json(false)
    }
}

const RemoveFromCart = async (req, res) =>{
    const {cart_id, product_id} = req.params
    const query_text = `
        DELETE FROM cart_products WHERE product_id = $1 AND cart_id = $2
        `
    try {
        console.lo
        const {rows} = await database.query(query_text, [product_id, cart_id])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const CreateOrder = async (req, res) =>{
    const user_id = req.user.id
    const {qty} = req.body
    let order_products = JSON.parse(qty)
    console.log(order_products)
    const {payment_id} = req.params
    let OrderProductPart = ``
    let i = 0;
    for (i=0; i<order_products.length; i++){
        let product = order_products[i]
        OrderProductPart += `, insertprod${i} AS (
            INSERT INTO order_items(product_id, quantity, order_id, product_price)
            VALUES(${product.id}, ${product.cartQuantity}, (SELECT id FROM inserted), 
                (SELECT price FROM products WHERE id = ${product.id}) )

        ), updated_stock${i} AS (
            UPDATE products SET stock_count = products.stock_count - ${product.cartQuantity} WHERE id = ${product.id}
        
        ), update_total_price${i} AS (
            UPDATE orders SET 
                total_price = orders.total_price + ((SELECT price FROM products WHERE id = ${product.id})*${product.cartQuantity}) 
                WHERE id = (SELECT id FROM inserted)
        )`
    }

    const query_text = `
        WITH inserted AS (
            INSERT INTO orders(user_id, total_price, payment_id) 
            VALUES (${user_id}, 0, ${payment_id})
            RETURNING *
        ) ${OrderProductPart} SELECT id FROM inserted
    `
    try{
        console.log(query_text)
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
    }

}

const GetOrders = async (req, res) =>{
    const user_id = req.user.id
    const query_text = `
        SELECT (SELECT json_agg(ord) FROM 
            (SELECT id, total_price::text, to_char(created_at, 'DD-MM-YYYY') AS created_at  FROM orders WHERE user_id = $1
        )ord) AS orders
    `
    try {
        const {rows} = await database.query(query_text, [user_id])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const GetOrderById = async (req, res) =>{
    const {id} = req.params
    const {user_id} = req.user.id
    const query_text = `
        SELECT (SELECT json_agg(pro) FROM
            (SELECT p.product_name, oi.product_price::text AS price, oi.quantity,
                (SELECT destination FROM product_images WHERE product_id = p.id LIMIT 1) AS image
            FROM products p
                INNER JOIN order_items oi
                    ON oi.product_id = p.id
            WHERE oi.order_id = ${id}
            )pro) AS products
    `
    try{
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddNotification = async (req, res) =>{
    const {id} = req.params
    const user_id = req.user.id
    const query_text = `
        INSERT INTO notifications(product_id, user_id) VALUES (${id}, ${user_id})
    `
    try{
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }

}


const GetNotifications = async (req, res) =>{
    const user_id = req.user.id
    const query_text = `
        SELECT p.product_name, p.id::INTEGER, p.price, (n.id::INTEGER) AS notification_id, 
            (SELECT destination FROM product_images WHERE product_id = p.id LIMIT 1)
        FROM products p
        INNER JOIN notifications n
            ON p.id = n.product_id
        WHERE n.user_id = $1
    `
    try {
        const {rows} = await database.query(query_text, [user_id])
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const RemoveFromNotifications = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        DELETE FROM notifications WHERE id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetCategoryProducts = async (req, res) =>{
    const {id} = req.params
    const {page, limit} = req.query
    let OffSet = ``
    if (page && limit){
        OffSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        OffSet = ``
    }
    const query_text = `
        SELECT 
            (SELECT COUNT(*) 
            FROM products p
                INNER JOIN categories c 
                    ON c.id = p.category_id
                INNER JOIN countries ct 
                    ON ct.id = p.producer_country_id
                INNER JOIN type_of_box tob
                    ON tob.id = p.box_id
                INNER JOIN unity u
                    ON u.id = p.unity_id
            WHERE p.id > 0 AND p.category_id = $1) AS count,
            (SELECT json_agg(prod) FROM
                (SELECT p.id, product_name, category_name, country_name, 
                    stock_count, price, date_of_expire, box_name, 
                        quantity, unity_name, description_tm, description_ru,
                        (SELECT destination FROM product_images 
                        WHERE product_id = p.id LIMIT 1
                        ) AS image
                FROM products p
                    INNER JOIN categories c 
                        ON c.id = p.category_id
                    INNER JOIN countries ct 
                        ON ct.id = p.producer_country_id
                    INNER JOIN type_of_box tob
                        ON tob.id = p.box_id
                    INNER JOIN unity u
                        ON u.id = p.unity_id
                WHERE p.id > 0 AND p.category_id = $1
                ${OffSet}
                )prod) AS products
                `   
    try {
        const {rows} = await database.query(query_text, [id])
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
}

const GetNews = async (req, res) =>{
    const {page, limit} = req.query;
    let offSet = ``
    if(page && limit){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    const query_text = `
        SELECT (SELECT COUNT (*) FROM news WHERE validity::tsrange @> localtimestamp), 
        (SELECT json_agg(new) FROM (
            SELECT id, title, text, lower(validity)::text AS low_val, upper(validity)::text AS upper_val
            FROM news 
            WHERE validity::tsrange @> localtimestamp
            ${offSet}
        )new) AS news
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(e)
    }
}

module.exports = {
    UserLogin,
    UserRefresh,
    GetProducts,
    GetCategories,
    AddToCart,
    GetCartProducts,
    CreateOrder,
    AddNotification,
    GetOrders,
    GetProductById,
    RemoveFromCart,
    GetNotifications,
    RemoveFromNotifications,
    GetCategoryProducts,
    UpdateCartProduct,
    GetProducers,
    GetOrderById,
    GetNews
}

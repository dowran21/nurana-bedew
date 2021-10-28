import {$host, $authHost} from './index.js';

export const login = async (phone, password) =>{
    const response = await $host.post('api/admin/login', {phone, password})
    localStorage.setItem('token', response.data.access_token)
    return {"response":response}
};

export const add_user = async (data )=>{
    const response = await $authHost.post(`api/admin/add-user/`, {...data})
    return response.data
};

export const update_user = async (full_name, email, main_phone, id) => {
    const response = await $authHost.post(`api/admin/update-user/${id}`, {full_name, email, main_phone})
    return response
};

export const get_users = async ({page, limit, user_name}) => {
    console.log(user_name)
    const response = await $authHost.get(`api/admin/get-users?page=${page}&limit=${limit}&user_name=${user_name}`)
    return response.data
};

export const get_orders = async ({page, limit, user_name}) =>{
    const response = await $authHost.get(`api/admin/get-orders?page=${page}&limit=${limit}&user_name=${user_name}`)
    // console.log(response.data)
    return response.data
};

export const delete_user = async (id) =>{
    const response = await $authHost.post(`api/admin/delete-user/${id}`)
    return response.data
};

export const GeneratePdf = async (id) =>{
    const response = await $authHost.get(`api/admin/get-order-pdf/${id}`)
    return response.data
};

export const AcceptOrder = async (id, accepted)=>{
    const response = await $authHost.post(`api/admin/accept-order/${id}`, {accepted})
    return response.data
}

export const get_products = async (page, limit, product_name, producer_id) =>{
    const response = await $authHost.get(`api/admin/get-products?page=${page}&limit=${limit}&product_name=${product_name}&producer_id=${producer_id}`)
    return response.data
};

export const get_categories = async () =>{
    const response = await $authHost.get(`api/admin/get-categories`)
    return response.data
};

export const get_producers = async () =>{
    const response = await $authHost.get(`api/admin/get-producers`)
    return response.data
};

export const update_product = async (data) =>{
    const response = await $authHost.post(`api/admin/update-product/${data.id}`, {...data})
    return response.data
};

export const new_in_come_update = async (id, bool) =>{
    const response = await $authHost.post(`api/admin/update-in-come/${id}/${bool}`)
    return response.data
};

export const delete_product = async (id) =>{
    const response = await $authHost.post(`api/admin/delete-product/${id}`)
    return response.data
}

export const add_product = async (data) =>{
    const response = await $authHost.post(`api/admin/add-product`, {...data})
    return response.data
};

export const load_user = async () =>{
    const response = await $authHost.get(`api/admin/load-user`)
    return response.data
}

export const add_product_image = async (id, data)=>{
    const response = await $authHost.post(`api/admin/add-product-image/${id}`, data)
    return response.data
}

export const update_category = async (id, data) =>{
    const response = await $authHost.post(`api/admin/update-category/${id}`, data)
    return response.data
}

export const add_category = async (category_name) =>{
    const response = await $authHost.post(`api/admin/add-category`, category_name)
    return response.data
}

export const update_producer = async (id, data) =>{
    const response = await $authHost.post(`api/admin/update-producer/${id}`, data)
    return response.data
}

export const add_producer = async (data) =>{
    const response = await $authHost.post(`api/admin/add-producer`, data)
    return response.data
}

export const send_sms_all = async() =>{
    const response = await $authHost.post(`api/admin/send-sms-new-in-come`)
    return response.data
}

export const get_order = async (id)=>{
    const response = await $authHost.get(`api/admin/get-order/${id}`)
    return response.data
}

export const update_image = async (id, data) => {
    const response = await $authHost.post(`api/admin/update-product-image/${id}`, data)
    return response.data
}
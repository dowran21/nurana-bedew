export default class ProductStore {
    constructor() {
        this._categories = [
            {id:1, category_name:"Antibiotiki"},
            {id:2, category_name:"Antioksidant"},
            {id:3, category_name:"Antigistamin"},
            {id:4, category_name:"Something"},
        ]
        this._countries = [
            {id:1, country_name:"Turkmenistan"},
            {id:2, country_name:"Antibiotiki"},
            {id:3, country_name:"Turkiye"},
        ]
        this._products = [
            {id: 20, product_name: 'Soma22612', price: 250, stock_count: 225, image: null},
            {id: 19, product_name: 'Soma226', price: 250, stock_count: 225, image: null},
            {id: 17, product_name: 'Soma2', price: 250, stock_count: 224, image: null},
            {id: 21, product_name: 'Soma2252612', price: 250, stock_count: 224, image: null},
            {id: 91, product_name: 'Somasdasd ', price: 250, stock_count: 85, image: 'uploads/9/02102021-121442_684-7'}
        ]
    }

    setTypes(types){
        this._types = types
    }
    
    setCountries(countries){
        this._countries = countries
    }

    setProducts(products){
        this._products = products
    }

    get types(){
        return this._types
    }

    get categories(){
        return this._categories
    }

    get products(){
        return this._products
    }
}
DROP DATABASE IF EXISTS nurly_bedew;

CREATE DATABASE nurly_bedew;

\c nurly_bedew;

CREATE TABLE roles(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(30)
);

CREATE TABLE users(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    role_id SMALLINT NOT NULL,
    full_name VARCHAR (100) NOT NULL,
    main_phone VARCHAR (8) NOT NULL,
    email VARCHAR(50) NOT NULL,
    "password" VARCHAR(300),
    sms_sending BOOLEAN DEFAULT TRUE,
    deleted BOOLEAN DEFAULT FALSE,
    added_time TIMESTAMP WITHOUT TIME ZONE DEFAULT clock_timestamp(),
    UNIQUE(main_phone),

    CONSTRAINT role_id_fk FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE CASCADE
);
CREATE UNIQUE INDEX ON users(role_id) WHERE (role_id = 1);


CREATE TABLE producers(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    producer_name VARCHAR (150),
    deleted BOOLEAN DEFAULT FALSE,
    UNIQUE(producer_name)
);

CREATE TABLE products(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR (250),
    producer_id SMALLINT NOT NULL,
    stock_count INTEGER CHECK(stock_count>=0),
    price NUMERIC(8, 2),
    date_of_expire DATE NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL,
    new_in_come BOOLEAN DEFAULT FALSE,
    quantity INTEGER NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    description_tm TEXT NOT NULL,
    description_ru TEXT NOT NULL,
    UNIQUE(product_name),

    CONSTRAINT producer_id_fk FOREIGN KEY (producer_id) REFERENCES producers(id)
);

CREATE INDEX ON products (LOWER(description_ru));
CREATE INDEX ON products (LOWER(description_tm)); 
CREATE INDEX ON products (LOWER(product_name)); 



CREATE TABLE product_images(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    product_id SMALLINT NOT NULL,
    destination VARCHAR (150),

    CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE type_of_paymants(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    paymant_name VARCHAR(50)
);

CREATE TABLE orders(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id SMALLINT NOT NULL,
    has_seen BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT clock_timestamp(),
    total_price NUMERIC(10, 2),
    accepted BOOLEAN DEFAULT FALSE,
    payment_id SMALLINT NOT NULL,

    CONSTRAINT payment_id_fk FOREIGN KEY (payment_id) REFERENCES type_of_paymants(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE 
);

CREATE TABLE order_items(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    order_id INTEGER NOT NULL,
    product_price NUMERIC(10, 2),

    CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT order_id_fk FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE notifications(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id SMALLINT NOT NULL,
    product_id SMALLINT NOT NULL,
    added_date DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO guych;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO guych;
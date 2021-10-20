CREATE OR REPLACE FUNCTION order_total_price_func() RETURNS TRIGGER AS $order_items_add$  
BEGIN
    UPDATE orders SET total_price = orders.total_price + NEW.product_price*NEW.quantity
    WHERE id = NEW.order_id;
    RETURN NULL;
END;
$order_items_add$ LANGUAGE plpgsql;

CREATE TRIGGER order_items_add 
    AFTER INSERT ON order_items
    FOR EACH ROW EXECUTE PROCEDURE order_total_price_func();
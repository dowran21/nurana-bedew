const PDFDocument = require('pdfkit')
const fs = require('fs');
// const { height } = require('pdfkit/js/page');
const path = require('path');
let robotoRegular = path.join(__dirname, 'Roboto-Regular.ttf');
let arial = path.join(__dirname, 'arial.ttf')

async function OrderGenerator (data){
    const {order_id, created_date, total_price, full_name, main_phone, email, order_items} = data

    let doc = new PDFDocument({ size: "A4", margins : {top: 0,bottom:30,left: 30,right: 30}});
    doc.font(robotoRegular);
    doc
        .image('./nurana_bedew.png', 0, 0, { width: 150, height:150})
        .fillColor('#000')
        .fontSize(20)
        .text('Sargyt', 275, 50, {align: 'right'})
        .fontSize(10)
        .text(`Sargyt belgisi: ${order_id}`, {align: 'right'})
        .text(`Sargydyň güni: ${created_date}`, {align: 'right'})
        .text(`Sargydyň jemi bahasy: ${total_price}TMT`, {align: 'right'})
        .moveDown()
        .text(`Sargyt ediji:\n ${full_name}\n${email}\n+993${main_phone}`, {align: 'right'})

    const beginningOfPage = 50
    const endOfPage = 550


    doc.moveDown()
    doc.moveDown()
    const tableTop = 200
    const itemCodeX = 20
    const descriptionX = 60
    const quantityX = 420
    const priceX = 460
    const amountX = 520

    doc
        .fontSize(10)
        .text('Kody', itemCodeX, tableTop, {bold: true})
        .text('Ady', descriptionX, tableTop)
        .text('Sany', quantityX, tableTop)
        .text('Bahasy', priceX, tableTop)
        .text('Jemi', amountX, tableTop)
    doc.rect(17, tableTop - 5, 540, 0.2).fillColor('#000').stroke('#000')

    // const items = invoice.items
    let i = 0

    let h = 0

    for (i = 0; i < order_items.length; i++) {
        const item = order_items[i]
        const y = tableTop + 25 + (i * 25)
        h=y;
        doc
            .fontSize(10).font(arial)
            .text(item.product_id, itemCodeX, y)
            .text(`${item.product_name.substring(0, 70)}`, descriptionX, y)
            .text(item.quantity, quantityX, y)
            .text(`${item.product_price} TMT`, priceX, y)
            .text(`${item.total_product_price} TMT`, amountX, y)
        doc.rect(17, y - 5, 540, 0.2).fillColor('#000').stroke('#000')
    }
    doc.rect(17, h + 20, 540, 0.2).fillColor('#000').stroke('#000')
    doc.rect(itemCodeX -3, tableTop-4, 0.2, (h-tableTop+20)).fillColor('#000').stroke('#000')
    doc.rect(descriptionX-3, tableTop-4, 0.2, (h-tableTop+20)).fillColor('#000').stroke('#000')
    doc.rect(quantityX-3, tableTop-4, 0.2, (h-tableTop+20)).fillColor('#000').stroke('#000')
    doc.rect(priceX-3, tableTop-4, 0.2, (h-tableTop+20)).fillColor('#000').stroke('#000')
    doc.rect(amountX-3, tableTop-4, 0.2, (h-tableTop+20)).fillColor('#000').stroke('#000')


    const pdfBuffer = await new Promise(resolve => {
//	doc.pipe(fs.createWriteStream('some.pdf');
        doc.end()
        // console.log("hello")
        doc.pipe(fs.createWriteStream("something.pdf"))
        const buffers = []
        doc.on("data", buffers.push.bind(buffers))
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers)
            resolve(pdfData)
        })
    });
    return {
        headers: {
            "content-type": "application/pdf",
	    "charset":"utf-8"
        },
        body: pdfBuffer.toString("base64"),
        isBase64Encoded: true,
    }


    

    // write out file
    theOutput.end()


}

module.exports = {OrderGenerator}

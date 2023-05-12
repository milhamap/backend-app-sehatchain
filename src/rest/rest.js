const express = require('express');
// const puppeteer = require('puppeteer');
const knex = require('../databases')
const templateHelper = require('./template');
const router = express.Router();

router.get('/pdf/rme/:random/view', async (req, res) => {
    try {
        const random = req.params.random;
        const data = await knex('rme').where('random', random).first();
        const rs = await knex('users').where('id', data.user_id).first();
        const date_visit = new Date(data.visit).toDateString().split(' ');
        const date_birthday = new Date(data.birthday).toDateString().split(' ');
        const item = {
            ...data,
            hospital_name: rs.fullname,
            hospital_address: rs.address,
        }
        const template_items = templateHelper.rme_item(item, date_visit, date_birthday);
        const html_template = templateHelper.template_rme(template_items);
        res.send(html_template);
        // const file = html_template.toString();
        // const html = file;
        // const file_name = `rme|${random}|${new Date(data.visit).toISOString().slice(0, 10)}.pdf`;
        // returnPDF(html, file_name, res);
    } catch (error) { res.status(400).send(error); }
})

// const returnPDF = (html, file_name, res, is_landscape=false) => {
//     let fileName = file_name;
//     //Here we are passing options to puppeteer. most of the settings are self explanatory
//     //read puppeteer documentation for more options
//     let options = {
//         printBackground: true,
//         landscape: is_landscape,
//         format: 'A4',
//         margin: {
//             top: '20px',
//             bottom: '20px',
//             right: '20px',
//             left: '20px'
//         }
//     }
    //lets launch a headless chromium browser to process the te,palte and generate pdf
    //headless=true makes the browser headless
//     const browser = puppeteer.launch({
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         headless: true
//     }).then(function (browser) {
//         //create a headless browser page
//         browser.newPage().then(function (page) {
//             //we are disabling javascript execution on the headless browser to avoid any security vulnerabilities
//             page.setJavaScriptEnabled(true).then(function () {
//                 page.setContent(html, {waitUntil: ['domcontentloaded', 'load', "networkidle0"]})
//                     .then(function () {
//                         //use page.pdf funciton to convert the html to pdf
//                         var buffer = page.pdf(options).then(function (buffer) {
//                             browser.close().then(function () {
//                                 // logger.debug('succesfully generated PDF');
//                                 //set the pdf and send it back as API response
//                                 res.status(200)
//                                     .set({
//                                         'Content-Type': 'application/pdf',
//                                         'Content-Length': buffer.length,
//                                         "Content-Disposition": "attachment; filename=" + fileName,
//                                     })
//                                     .send(buffer)
//                             });
//                         });
//                     });
//             });
//         });
//     });
// }

module.exports = router;
/**
 * template untuk style report rme
 */ 
 const style_template = () => {
    let ret = `
    <style type="text/css">
        .container {
            display: flex;
            justify-content: center;
        }
        .card {
            width: 1192px;
            height: 941px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card-body {
            width: 1192px;
            height: 941px;
            background-color: white;
            border-radius: 10px;
            position: relative;
        }
        #title-no-rm {
            width: 80.64px;
            height: 38.88px;
            left: 61.94px;
            top: 269.6px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-no-rm {
            width: 94.66px;
            height: 35px;
            left: 61.94px;
            top: 308.48px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #title-nama-pasien {
            width: 158.93px;
            height: 38.88px;
            left: 61.94px;
            top: 369.4px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-nama-pasien {
            width: 172.96px;
            height: 35px;
            left: 61.94px;
            top: 408.29px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #title-jenis-kelamin {
            width: 167.11px;
            height: 38.88px;
            left: 61.94px;
            top: 469.2px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-jenis-kelamin {
            width: 98.16px;
            height: 35px;
            left: 61.94px;
            top: 508.09px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #title-tanggal-lahir {
            width: 162.44px;
            height: 38.88px;
            left: 61.94px;
            top: 569.01px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-tanggal-lahir {
            width: 195.16px;
            height: 35px;
            left: 61.94px;
            top: 607.89px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #title-pekerjaan {
            width: 120.37px;
            height: 38.88px;
            left: 648.59px;
            top: 460.13px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-pekerjaan {
            width: 216.2px;
            height: 35px;
            left: 648.59px;
            top: 499.02px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #title-jaminan {
            width: 107.51px;
            height: 38.88px;
            left: 648.59px;
            top: 360.33px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-jaminan {
            width: 167.11px;
            height: 35px;
            left: 648.59px;
            top: 399.21px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #title-tanggal-kunjungan {
            width: 236.06px;
            height: 38.88px;
            left: 648.59px;
            top: 269.6px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-tanggal-kunjungan {
            width: 193.99px;
            height: 35px;
            left: 648.59px;
            top: 308.48px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #title-poli {
            width: 43.24px;
            height: 38.88px;
            left: 61.94px;
            top: 663.63px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-poli {
            width: 82.97px;
            height: 35px;
            left: 61.94px;
            top: 702.51px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #title-alamat {
            width: 196.33px;
            height: 38.88px;
            left: 648.59px;
            top: 565.12px;
            position: absolute;
            font-size: 20px;
            font-weight: 600;
            line-height: 100%;
            color: black;
        }
        #content-alamat {
            width: 447.58px;
            height: 104.99px;
            left: 648.59px;
            top: 604px;
            position: absolute;
            font-size: 18px;
            line-height: 100%;
            color: black;
        }
        #logo-rs {
            width: 119px;
            height: 152px;
            left: 55px;
            top: 36px;
            position: absolute;
        }
        #name-rs {
            width: 601.84px;
            height: 35px;
            left: 188.15px;
            top: 63.51px;
            position: absolute;
            font-size: 18px;
            font-weight: 500;
            line-height: 100%;
            color: black;
        }
        #alamat-rs {
            width: 669.62px;
            height: 54.44px;
            left: 184.64px;
            top: 110.17px;
            position: absolute;
            font-size: 14px;
            line-height: 100%;
            color: black;
        }
    </style>`;
    return ret;
 };
 /**
 * template untuk html pdf RME
 */
 const html_template = (body) => {
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${style_template()}
        <title>PDF RME</title>
    </head>
    <body>
        ${body}
    </body>
    </html>`
 }
 module.exports = {
    html_template
 }
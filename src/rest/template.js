const { html_template } = require('./html_template');

const rme_item = (item, visit, birthday) => {
    let gender
    (item.gender) === 'L' ? gender = "Laki - laki" : gender = "Perempuan";
    return `
        <p id="title-no-rm">
            No. RM
        </p>
        <p id="content-no-rm">
            ${item.nomor}
        </p>
        <p id="title-nama-pasien">
            Nama Pasien
        </p>
        <p id="content-nama-pasien">
            ${item.name}
        </p>
        <p id="title-jenis-kelamin">
            Jenis Kelamin
        </p>
        <p id="content-jenis-kelamin">
            ${gender}
        </p>
        <p id="title-tanggal-lahir">
            Tanggal Lahir
        </p>
        <p id="content-tanggal-lahir">
            ${ birthday[2] + ' ' + birthday[1] + ' ' + birthday[3] }
        </p>
        <p id="title-pekerjaan">
            Pekerjaan
        </p>
        <p id="content-pekerjaan">
            ${item.profession}
        </p>
        <p id="title-jaminan">
            Jaminan
        </p>
        <p id="content-jaminan">
            ${item.assurance}
        </p>
        <p id="title-tanggal-kunjungan">
            Tanggal Kunjungan
        </p>
        <p id="content-tanggal-kunjungan">
            ${ visit[2] + ' ' + visit[1] + ' ' + visit[3] }
        </p>
        <p id="title-poli">
            Poli
        </p>
        <p id="content-poli">
            ${item.poli}
        </p>
        <p id="title-alamat">
            Alamat Lengkap
        </p>
        <p id="content-alamat">
            ${item.address}
        </p>
        <img id="logo-rs"src="https://i.postimg.cc/bvZXzZvW/rs.png"/>
        <p id="name-rs">
            ${item.hospital_name}
        </p>
        <p id="alamat-rs">
            ${item.hospital_address}
            <br />
        </p>
    `
} 

const template_rme = (rme_item) => {
    let body = `
    <div class="container">
        <div class="card">
            <div class="card-body">
                ${rme_item}
            </div>
        </div>
    </div>`;
    return html_template(body);
}

module.exports = { 
    template_rme, 
    rme_item 
}
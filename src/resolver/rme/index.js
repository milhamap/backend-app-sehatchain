const knex = require('../../databases')
const Validator = require('fastest-validator')
const { v4: uuidv4 } = require('uuid')

const v = new Validator()

module.exports = {
    createRME: async (req, res) => {
        const { nomor, name, gender, birthday, visit, poli, nik, assurance, address, profession, blockhash } = req.body
        try {
            const schema = {
                nomor: 'string|empty:false|min:1|max:10',
                name: 'string|empty:false',
                nik: 'string|empty:false|min:16|max:16',
                gender: 'string|empty:false|min:1|max:1',
                birthday: 'string|empty:false',
                address: 'string|empty:false',
                profession: 'string|empty:false|max:100',
                assurance: 'string|empty:false|max:100',
                visit: 'string|empty:false',
                poli: 'string|empty:false|max:100',
                blockhash: 'string|empty:false'
            }
            const validate = v.validate(req.body, schema)
            if (validate.length) return res.status(400).json({message: validate})
            do {
                random = uuidv4()
            } while(await knex('rme').where({ random: random }).length)
            if(await knex('rme').where({ nomor: nomor }).length) return res.status(400).json({message: 'Nomor already exists'})
            const result = await knex('rme').insert({
                nomor,
                name,
                gender,
                birthday,
                visit,
                poli,
                nik,
                assurance,
                address,
                profession,
                random,
                user_id: req.user.id,
                blockhash: blockhash,
                created_at: new Date()
            })
            if (result) return res.status(200).json({message: 'RME success created'})
        } catch (error) {
            return res.status(500).json({message: 'Internal server error', error: error.message})
        }
    },
    getRME: async (req, res) => {
        const random = req.params.random
        try {
            const rme = await knex('rme').where({random}).first()
            const created = await knex('users').where({id: rme.user_id}).first()
            res.status(200).json({message: 'Get RME Success', data: {
                ...rme,
                hospital_name: created.fullname,
                hospital_address: created.address,
            }})
        } catch(error) {
            return res.status(500).json({message: 'Internal server error', error: error.message})
        }
    },
    getsRME: async (req, res) => {
        try {
            const { offset, limit, nik, date_min, date_max, name, sort, sortType } = req.query
            const rme = knex('rme')
            nik && rme.where('nik', 'like', `%${nik}%`)
            name && rme.where('name', 'like', `%${name}%`)
            if (date_min && date_max) rme.whereBetween('visit', [date_min, date_max])
            const cloneRME = rme.clone()
            const count = await cloneRME.count('id as count')
            if(limit && offset) rme.limit(limit).offset(offset*limit)
            sort ? rme.orderBy(sort, sortType) : rme.orderBy('id', 'asc')
            const data = await rme
            res.status(200).json({message: 'Get RME Success', count: count[0].count, data})
        } catch(error) {
            return res.status(500).json({message: 'Internal server error', error: error.message})
        }
    },
    getsRMEisPublic: async (req, res) => {
        try {
            const { offset, limit, date_min, date_max, sort, sortType } = req.query
            const rme = knex('rme').where('nik', req.user.nik)
            if (date_min && date_max) rme.whereBetween('visit', [date_min, date_max])
            const cloneRME = rme.clone()
            const count = await cloneRME.count('id as count')
            if(limit && offset) rme.limit(limit).offset(offset*limit)
            sort ? rme.orderBy(sort, sortType) : rme.orderBy('id', 'asc')
            const data = await rme
            // const users = await knex('users').where({id: data.user_id}).first()
            res.status(200).json({
                message: 'Get RME Success', 
                count: count[0].count, 
                data
            })
        } catch(error) {
            return res.status(500).json({message: 'Internal server error', error: error.message})
        }
    },
    vertifikasiRME: async (req, res) => {
        try {
            const { nomor } = req.query
            const schema = {
                nomor: 'string|empty:false'
            }
            const validate = v.validate(req.query, schema)
            if (validate.length) return res.status(400).json({message: validate})
            const result = await knex('rme').where({nomor}).first()
            const user = await knex('users').where({id: result.user_id}).first()
            if (!result) return res.status(404).json({message: 'RME not found'})
            return res.status(200).json({
                message: 'RME success vertifikasi',
                data: {
                    ...result,
                    hospital_name: user.fullname,
                    hospital_address: user.address,
                }
            })
        } catch (error) {
            return res.status(500).json({message: 'Internal server error', error: error.message})
        }
    },
    getCountRME: async (req, res) => {
        try {
            const rme = knex('rme')
            const counts = await rme.count('id as count')
            const count = await rme.count('id as total').where('user_id', req.user.id).where('created_at', new Date().toISOString().slice(0, 10))
            res.status(200).json({message: 'Get RME Success', counts: counts[0].count, count: count[0].total})
        } catch(error) {
            return res.status(500).json({message: 'Internal server error', error: error.message})
        }
    }
}

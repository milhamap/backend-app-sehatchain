const knex = require('../../databases')
const Validator = require('fastest-validator')
const { v4: uuidv4 } = require('uuid')

const v = new Validator()

module.exports = {
    createRole: async (req, res) => {
        const name = req.body.name
        try {
            const schema = {
                name: { type: "string", min: 3, max: 255 }
            }
            const validate = v.validate(req.body, schema)
            if (validate.length) return res.status(400).json({message: validate})
            const data = {
                random: uuidv4(),
                name: name,
                created_at: new Date(),
            }
            await knex('roles').insert(data)
            res.status(200).json({
                message: 'Role created successfully',
                data
            })
        } catch(err) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        }
    },
    getsRole: async (req, res) => {
        try {
            const data = await knex('roles').select()
            res.status(200).json({
                message: 'Role fetched successfully',
                data
            })
        } catch(err) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        }
    }
}
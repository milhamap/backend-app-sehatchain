const knex = require('../../databases')
const { formatPhoneNumber } = require('../../helpers/phone')
const { createUserToken, createRefreshToken } = require('../../helpers/tokens')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
let verifToken = {
    token: '',
    get get_token() {
        return this.token
    },
    set gen_token (value) {
        this.token = value
    }
}

const v = new Validator()

module.exports = {
    register: async (req, res) => {
        const { fullname, phone, gender, address, email, nik, publicAddress } = req.body
        try {
            const telepon = formatPhoneNumber(phone)
            const schema = {
                fullname: 'string|empty:false',
                phone: 'string|empty:false|min:10|max:13',
                gender: 'string|empty:false|min:1|max:1',
                address: 'string|empty:false',
                email: 'email|empty:false',
                nik: 'string|empty:false|min:16|max:16',
                publicAddress: 'string|empty:false',
            }
            const validate = v.validate({
                fullname,
                phone: telepon,
                gender,
                address,
                email,
                nik,
                publicAddress
            }, schema)
            if (validate.length) return res.status(400).json({message: validate})
            const checkEmail = await knex('users').where({ email: email })
            if (checkEmail.length) return res.status(400).json({message: 'Email already exists'})
            const checkNIK = await knex('detail_users').where({ nik: nik })
            if (checkNIK.length) return res.status(400).json({message: 'NIK already exists'})
            const checkPhone = await knex('users').where({ phone: telepon })
            if (checkPhone.length) return res.status(400).json({message: 'Phone already exists'})
            
            let random
            do {
                random = uuidv4()
            } while (await knex('users').where({ random: random }).length)
            const data_user = {
                fullname: fullname,
                phone: telepon,
                address: address,
                email: email,
                publicAddress: publicAddress,
                random: random,
                role_id: 3,
                created_at: new Date()
            }
            const res_user = await knex('users').insert(data_user).returning('id')
            do {
                random = uuidv4()
            } while (await knex('detail_users').where({ random: random }).length)
            const data_detail_user = {
                gender,
                nik,
                user_id: res_user[0].id,
                random,
                created_at: new Date()
            }
            await knex('detail_users').insert(data_detail_user)
            res.status(200).json({
                message: 'Register Success',
                id: res_user[0].id
            })
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    registerAdmin: async (req, res) => {
        const { fullname, email, address, phone, publicAddress, key } = req.body
        console.log(req.body)
        try {
            //const telepon = formatPhoneNumber(phone)
            
            const schema = {
                fullname: 'string|empty:false',
                phone: 'string|empty:false|min:10|max:13',
                address: 'string|empty:false',
                email: 'email|empty:false',
                publicAddress: 'string|empty:false',
                key: 'string|empty:false',
            }
            const validate = v.validate({
                fullname,
                phone,
                address,
                email,
                publicAddress,
                key
            }, schema)
            if (validate.length) return res.status(400).json({message: validate})
            const checkEmail = await knex('users').where({ email: email })
            if (checkEmail.length) return res.status(400).json({message: 'Email already exists'})
            const checkPhone = await knex('users').where({ phone: phone })
            if (checkPhone.length) return res.status(400).json({message: 'Phone already exists'})
            const checkKey = await knex('active_key').where({ key: key }).first();
            if (checkKey == null) return res.status(400).json({message: 'Key doesnt exists'})
            
            let random
            do {
                random = uuidv4()
            } while (await knex('users').where({ random: random }).length)
            const data = {
                fullname,
                email, 
                address,
                phone,
                publicAddress,
                random,
                role_id: 2,
                created_at: new Date(),
            }
            const user = await knex('users').insert(data).returning('id')
            const deleteKey = await knex('active_key').where({ key: key }).del();

            res.status(200).json({
                message: 'Register Success',
                id: user[0].id
            })
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    login: async (req, res) => {
        const { nik } = req.body
        try {
            const schema = {
                nik: 'string|empty:false|min:16|max:16',
            }
            const validate = v.validate(req.body, schema)
            if (validate.length) return res.status(400).json({message: validate})
            const detail_user = await knex('detail_users').where({ nik: nik }).first()
            const user = await knex('users').where({ id: detail_user.user_id }).first()
            if(!detail_user) return res.status(400).json({message: 'Wrong nik or password'})
            const token = createUserToken({
                id: user.id,
                role_id: user.role_id,
                nik: detail_user.nik
            })
            const refreshToken = createRefreshToken({
                id: user.id,
                role_id: user.role_id,
                nik: detail_user.nik
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            await knex('users').where({ id: user.id }).update({ refresh_token: refreshToken })
            res.status(200).json({
                message: 'Login Success',
                user,
                token            
            })
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    loginAdmin: async (req, res) => {
        const { email } = req.body
        try {
            const schema = {
                email: 'email|empty:false',
            }
            const validate = v.validate(req.body, schema)
            if (validate.length) return res.status(400).json({message: validate})
            const user = await knex('users').where({ email }).first()

            const token = createUserToken({
                id: user.id,
                role_id: user.role_id
            })
            const refreshToken = createRefreshToken({
                id: user.id,
                role_id: user.role_id
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            await knex('users').where({ id: user.id }).update({ refresh_token: refreshToken })
            res.status(200).json({
                message: 'Login Success',
                user,
                token            
            })
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) return res.status(400).json({message: 'Refresh token expired'})
            const user = await knex('users').where({ refresh_token: refreshToken }).first()
            if (!user) return res.status(400).json({message: 'Invalid refresh token'})
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403)
                const token = createUserToken({
                    id: user.id,
                    fullname: user.fullname,
                    phone: user.phone,
                })
                res.status(200).json({
                    message: 'Refresh token success',
                    token
                })
            })
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    logout: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204)
        const user = await knex('users').where({ refresh_token: refreshToken }).first()
        if(!user) return res.sendStatus(204)
        await knex('users').where({ id: user.id }).update({ refresh_token: null })
        res.clearCookie('refreshToken')
        res.status(200).json({
            message: 'Logout success'
        })
    },
    getUser: async (req, res) => {
        try {
            const user = await knex('users').where({ id: req.user.id }).first()
            const { fullname, email, address, phone, image, password, refresh_token, role_id, random } = user
            const detail_user = await knex('detail_users').where({ user_id: req.user.id }).first()
            res.status(200).json({
                message: 'Get user success',
                data: {
                    ...detail_user,
                    random_user: random,
                    fullname,
                    email,
                    address,
                    phone,
                    image,
                    password,
                    refresh_token,
                    role_id
                }
            })
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    updateUser: async (req, res) => {
        const { firstname, lastname, email, old_password, new_password, new_password_confirmation } = req.body
        try {
            const schema = {
                'firstname': 'string|empty:false',
                'lastname': 'string|empty:false',
                'email': 'email|empty:false',
            }
            const validate = v.validate(req.body, schema)
            if (validate.length) return res.status(400).json({message: validate})
            const data = await knex('users').where({ id: req.user.id }).first()
            const checkEmail = await knex('users').where({ email: email })
            if(checkEmail.length > 1) return res.status(400).json({message: 'Email already exist'})
            await knex('users').where({ id: req.user.id }).update({
                fullname: `${firstname} ${lastname}`,
                email: email
            })
            res.status(200).json({
                message: 'Update user success',
                data: {
                    fullname: `${firstname} ${lastname}`,
                    email: email,
                }
            })
        } catch(error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    updatePassword: async (req, res) => {
        const { old_password, new_password, new_password_confirmation } = req.body
        try {
            const schema = {
                'old_password': 'string|min:6',
                'new_password': 'string|min:6|same:new_password_confirmation',
                'new_password_confirmation': 'string|min:6|same:new_password'
            }
            const validate = v.validate(req.body, schema)
            if (validate.length) return res.status(400).json({message: validate})
            if(new_password !== new_password_confirmation) return res.status(400).json({message: 'Password confirmation not match'});
            const data = await knex('users').where({ id: req.user.id }).first()
            if(!await bcrypt.compare(old_password, data.password)) return res.status(400).json({message: 'Wrong old password'})
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(new_password, salt)
            await knex('users').where({ id: req.user.id }).update({
                password: hashedPassword
            })
            res.status(200).json({
                message: 'Update password success',
                data: {
                    password: hashedPassword
                }
            })
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    sendEmailVerification: async (req, res) => {
        const { email } = req.body
        try {
            const schema = {
                'email': 'email|empty:false'
            }
            const validate = v.validate(req.body, schema)
            if (validate.length) return res.status(400).json({message: validate})
            let email_verification = ''
            do {
                email_verification = randomstring.generate(6)
            } while (await knex('email_verifications').where({ kode: email_verification }).length)
            let random
            do {
                random = uuidv4()
            } while (await knex('users').where({ random: random }).length)
           const verifToken = await knex('email_verifications').where({ email: email }).first()

            if(verifToken) {
                if(verifToken.is_active === true) 
                    return res.status(400).json({message: 'Email already verified'})
                else {
                    await knex('email_verifications').where({ 
                        email: email 
                    }).update({ kode: email_verification })
                }
            } else {
                await knex('email_verifications').insert({
                    random,
                    email: email,
                    kode: email_verification
                })
            }
            
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    user: process.env.EMAIL_NAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            })

            const mailOptions = {
                from: process.env.EMAIL_NAME,
                to: email,
                subject: 'Email Verification Sehat Ledger',
                text: `Your verification code is ${email_verification}`
            }

            await transporter.sendMail(mailOptions, (err, info) => {
                err ? res.status(500).json({message: err}) : res.status(200).json({message: 'Verification code sent in ' + email})
            })
        } catch(error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    confirmVerificationEmail: async(req, res) => {
        try {
            const code = req.body.code;
            const schema = {
                'code': { type: 'string', min: 6, max: 6, nullable: false }
            }
            const validate = v.validate(req.body, schema);
            if (validate.length) return res.status(400).json(validate);

            const result = await knex('email_verifications').where({ kode: code }).update({ is_active: 1 });
            if(result === 0) return res.status(400).json({ message: 'Wrong verification code' });
            
            res.status(200).json({ message: 'Email verified' });
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },

    createActiveKey: async(req, res) => {
        try {
            const key = Math.random().toString(36).substring(2,10);

            const data = {
                key,
                created_at: new Date(),
            }
            const result = await knex('active_key').insert(data).returning('id')
            res.status(200).json({
                message: 'Berhasil membuat key',
                id: result[0].id
            })

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },

    checkActiveKey: async(req, res) => {
        try {
            const key = req.body.key

            const result = await knex('active_key').where({ key: key }).first();
            
            if(result == null) return res.status(400).json({ message: 'Wrong key code' });

            res.status(200).json({ message: 'Key verified' });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
}
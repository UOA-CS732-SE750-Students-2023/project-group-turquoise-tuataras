import jwt from 'jsonwebtoken'
import { User } from '../database/schema/user-schema.js'

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    // Send error when there's no authorization header
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // Remove 'Bearer' from bearer token string
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        // Attach user's _id property to request body for each endpoint
        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

export default requireAuth
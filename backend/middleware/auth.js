import jwt from 'jsonwebtoken'  //// 👉 Library use ho rahi hai token verify karne ke liye

const authUser = async (req, res, next) => {  /////next: next middleware/function call
    const { token } = req.headers;  //// 👉 Token frontend se headers me aata hai

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        /* 👉 Token ko check karta hai: valid hai ya nahi,expire hua ya nahi ,tampered hai ya nahi */
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        /* Ab request me userId inject kar diya
        👉 Aage jo bhi function chalega usko mil jayega */
        req.body.userId = token_decode.id
        next()  //// 👉 "Sab sahi hai → next function ko chalao"
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser
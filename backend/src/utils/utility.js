import jwt from "jsonwebtoken";

export function authanticateToken(req, res, next){
    const authHeader = req.headers["authorization"]
    
    

    const token = authHeader && authHeader.split(" ")[1];
    

    if(!token){
        return res.status(401).json({message: "Access token not found"});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err){
            return res.status(403).json({message: "Invalid or expired token"});
        }
        req.user = user;
        next();


    })
}

// export default authanticateToken;
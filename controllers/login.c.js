const userM=require('../model/user.m');
const CryptoJS=require('crypto-js');
const hashLength=64;
exports.render= async(req, res, next) =>{
    try {
        res.render('login',{errWrongPassword:"none",errWrongUsername:"none",display1:"d-block",display2:"d-none"});
    } catch(err) {
        next(err);
    }
}
exports.check=async(req, res, next)=>{
    try {
        var user=req.body;
        userM.getByUsername(user.username).then(rs=>{
            if (rs.length==0) {
                res.render('login',{errWrongPassword:"none",errWrongUsername:"block", username:user.username, password:user.password,display1:"d-block",display2:"d-none"});
                return false;
            }
            else {
                const pwDb=rs[0].Password;
                const salt=pwDb.slice(hashLength);
                const pwSalt=user.password+salt;
                const pwHashed=CryptoJS.SHA3(pwSalt, {outputLength:hashLength*4}).toString(CryptoJS.enc.Hex);
                if (pwDb!==(pwHashed+salt)) {
                    res.render('login',{errWrongPassword:"block",errWrongUsername:"none", username:user.username, password:user.password,display1:"d-block",display2:"d-none"});
                    return false;
                }
                req.session.Username=rs[0].Username;
                res.redirect('/');
                return true;
            }
        })
    } catch(err) {
        next(err);
    }
};
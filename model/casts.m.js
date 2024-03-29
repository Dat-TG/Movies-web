const {pgp, db}=require('../model/DBconnection.m');
module.exports={
    getAll: async()=>{
        const rs=await db.any('SELECT * FROM "Casts"');
        return rs;
    },
    checkID: async(data) => {
        const rs=db.one('select exists(select 1 from "Casts" where "id"=$1)', [data]);
        return rs;
    }
    ,
    getByID: async(data)=> {
        try {
        const rs=db.any('SELECT * FROM "Casts" WHERE "id"=$1', [data]);
        return rs;
        } catch(err) {
            next(err);
        }
    },
    add: async(data)=>{
        const rs=await db.one('INSERT INTO "Casts"("id","image","legacyNameText","name","birthDate","birthPlace","gender","heightCentimeters","nicknames","realName") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
        [data.id, data.image, data.legacyNameText, data.name, data.birthDate, data.birthPlace, data.gender, data.heightCentimeters, data.nicknames, data.realName]);
        return rs;
    },
    deleteAll: async()=>{
        const rs=await db.none('DELETE FROM "Casts"');
    }
}
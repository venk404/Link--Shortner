const URL = require("../Models/Schema");
const ShortUniqueId = require('short-unique-id');
const ConnectwithDb = require('../Connect');
const Url = require("../Models/Schema");


 


const uid = new ShortUniqueId({ length: 8 });

async function HandleGenrateShortID(req, res) {
    try {

        const body = req.body;
        if(body.url !== null)
        {
            const shortid = uid.rnd();
            const newUrl = await URL.create({
                shortId: shortid,
                originalUrl: body.url,
                visitHistory: []
            });
    

            return res.json({id: shortid})
        }else{
            return res.status(500).json({ error: "Please provide the url..." }); 
        }
    } catch (error) {
        console.error("Error generating short ID:", error);
        return res.status(500).json({ error: "Failed to generate short ID" });
    }
}

async function HandleGetOrg_url(req,res){
    try{
        let shortId = req.params.shortid;
        
        const org_url = await Url.findOneAndUpdate(
            {shortId: shortId}, // Filter: Find the document by its ID 
            { $push: { visitHistory: {timestamp : Date.now()} }}
        );

        if (org_url !== null)
        {   
            return res.redirect(org_url.originalUrl);
        }
        return res.status(500).json({ error: "No data found or invalid shortid" }); 
    }
    catch (error) {
        console.error("We got some error please look into it...:", error);
        return res.status(500).json({ error: "Sorry for inconvience we got some error right now" });
    }
}


async function HandleAnalytics(req,res) {
    try{

        let shortId = req.params.shortid;

        const ClickCount = await Url.findOne({shortId: shortId})
        if (ClickCount !== null)
        {   
            return res.json({"TotalClick":ClickCount.visitHistory.length,"History" :ClickCount.visitHistory });
        }
        return res.status(500).json({ error: "No data found or invalid shortid" }); 
    }
    catch (error) {
        console.error("We got some error please look into it...:", error);
        return res.status(500).json({ error: "Sorry for inconvience we got some error right now" });
    }
    
}

module.exports = {
    HandleGenrateShortID,HandleGetOrg_url,HandleAnalytics
};

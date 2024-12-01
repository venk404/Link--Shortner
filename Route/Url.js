const express = require("express")
const { HandleGenrateShortID, HandleGetOrg_url,HandleAnalytics } = require("../Controller/Url")

const router = express.Router();

router.get('/', HandleGenrateShortID)

router.get('/:shortid', HandleGetOrg_url)

router.get('/Analytics/:shortid', HandleAnalytics)

module.exports = router
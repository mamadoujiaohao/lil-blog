const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientId(IMGUR_CLIENT_ID)

const imgurFileHandler = async pic => {
  try {
    if (!pic) return null
    const imgurHelpMe = await imgur.uploadFile(pic.path)
    if (!imgurHelpMe?.link) return null
    return imgurHelpMe.link
  } catch (err) {
    return err
  }
}
module.exports = {
  imgurFileHandler
}

const errors = require('../../../../mixins/errors');
const okResp = require('../../../../mixins/okResponseConstructor');

module.exports = async (req, res, next) => {
  try {          
    return res.json(okResp({ validatingPower: req.foundValidPower }));
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
};
module.exports = (err, req, res, next) => {
  let errMsg = ""
  let errStatus = 0
  switch (err.name) {
      case "SequelizeUniqueConstraintError" :
          errMsg = err.errors[0].message
          errStatus = 400
          break;
          
      case "customErr" :
          errMsg = err.message
          errStatus = err.status
          break;

      case "SequelizeValidationError" :
          let errResult = [] 
          err.errors.forEach(error => {
              errResult.push(error.message)
          });
          errMsg = errResult
          errStatus = 400
          break;

      case "Internal Server Error" :
          errMsg = err.name
          errStatus = 500
          break;
  }
  res.status(errStatus).json({message: errMsg})
}
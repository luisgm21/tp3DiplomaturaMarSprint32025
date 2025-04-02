import { validationResult } from "express-validator";

export const handleValidationSuperHeroeErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status:'error',
            message: 'Error de validación',
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
         });
    }
    next();
}
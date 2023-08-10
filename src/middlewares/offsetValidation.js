export const offsetValidation = (req, res, next) => {

    let { offset } = req.query;
    if (!offset) {
        offset = 0;

    } else {

        if (!Number(offset) || Number(offset) < 0) {
            return res.status(400).send("Offset inválido");
        }
    }
    req.query.offset = offset;
    next();
}
import { stripHtml } from "string-strip-html";

export const dataSanitization = (req, res, next) => {

    const dataBody = {...req.body};
    const dataParams = {...req.params};

    function sanitize (data) {

        for (const [key, value] of Object.entries(data)) {
            if (typeof value === "string") {
                data[key] = stripHtml(value).result.trim();
            }
        }
        return data;
    }

    req.body = sanitize(dataBody);
    req.params = sanitize(dataParams);
    next();
}
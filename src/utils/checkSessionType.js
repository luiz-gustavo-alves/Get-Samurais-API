export function checkSessionType(payload) {

    const session = {};
    if (payload.hasOwnProperty("userEmail")) {
        session["type"] = "userSession";
        session["id"] = "userId";

    } else if (payload.hasOwnProperty("serviceProviderEmail")) {
        session["type"] = "serviceProviderSession";
        session["id"] = "serviceProviderId";
    }
    return session;
}
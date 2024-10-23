/* eslint-disable */
export default async () => {
    const t = {
        ["./shared/models/text.value.response"]: await import("./shared/models/text.value.response"),
        ["./models/request/organizations/create.organization.request"]: await import("./models/request/organizations/create.organization.request")
    };
    return { "@nestjs/swagger": { "models": [], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./domains/user/user.controller"), { "UserController": { "findAll": {}, "findOne": {}, "delete": {}, "create": {}, "update": {} } }], [import("./domains/organization/organization.controller"), { "OrganizationController": { "findAll": { type: t["./shared/models/text.value.response"].TextValueResponse }, "create": { type: t["./models/request/organizations/create.organization.request"].CreateOrganizationRequest } } }]] } };
};
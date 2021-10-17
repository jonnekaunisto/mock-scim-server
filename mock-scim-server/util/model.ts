import { z } from "zod";


export const PostUsersRequestValidator = z.object({
    schemas: z.array(z.string()).nonempty(),
    userName: z.string(),
    externalId: z.string(),
    name: z.object({
      formatted: z.string(),
      familyName: z.string(),
      givenName: z.string(),
    }),
});

type UserSchema = "urn:ietf:params:scim:schemas:core:2.0:User";

export interface PostUsersResponse {
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    id: string,
    externalId: string,
    meta: {
        resourceType: string,
        created: string,
        lastModified: string,
        location: string,
        version: number,
    },
    name:{
        formatted: string,
        familyName: string,
        givenName: string,
    },
    userName: string,
}
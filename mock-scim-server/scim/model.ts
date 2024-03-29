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

export interface UserResourceResponse {
    schemas: [UserSchema],
    id: string,
    externalId: string,
    meta: {
        resourceType: string,
        created: string,
        lastModified: string,
        location: string,
        version: number,
    },
    name: {
        formatted: string,
        familyName: string,
        givenName: string,
    },
    userName: string,
}

export const PostGroupsRequestValidator = z.object({
    schemas: z.array(z.string()).nonempty(),
    displayName: z.string(),
});

type GroupSchema = "urn:ietf:params:scim:schemas:core:2.0:Group";

export interface GroupResourceResponse {
    schemas: [GroupSchema],
    id: string,
    displayName: string,
}
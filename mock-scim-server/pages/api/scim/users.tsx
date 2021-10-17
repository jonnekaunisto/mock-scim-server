// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DAL } from '../../../util/dal';
import { PostUsersRequestValidator, PostUsersResponse } from '../../../util/model';

interface UserResponse {
    schemas: string[],
    id: string,
    userName: string,
    name: {
        familyName: string,
        givenName: string,
        middleName: string,
    },
    active: boolean,
    meta: {
        resourceType: string,
        location: string,
    }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const dal = await DAL.create();

    if (req.method === 'GET') {
        const response = getUser(dal);
        res.status(200).json(response);
    } else if (req.method === 'POST') {
        await postUser(dal, req.body, res);
    } else if (req.method === 'PUT') {
    } else if (req.method === 'PATCH') {
    } else if (req.method === 'DELETE') {
    } else {
        // Handle any other HTTP method
    }
}

function getUser(dal: DAL): UserResponse {
    return {
        schemas: ['urn:ietf:params:scim:schemas:core:2.0:User'],
        id: 'id',
        userName: 'name',
        name: {
            familyName: 'name',
            givenName: 'name',
            middleName: 'name',
        },
        active: true,
        meta: {
            resourceType: '',
            location: '',
        }
    }
}

async function postUser(dal: DAL, requestBody: any, res: NextApiResponse<any>) {
    const result = PostUsersRequestValidator.safeParse(requestBody);

    if (result.success == false) {
        console.log(result.error)
        res.status(500).json({message: "Validation error"});
    } else {
        const body = result.data;
        const user = await dal.createUser({
            externalId: body.externalId,
            active: true,
            userName: body.userName,
            familyName: body.name.familyName,
            middleName: "NoMiddleName",
            givenName: body.name.givenName,
        })

        const response: PostUsersResponse = {
            schemas: ['urn:ietf:params:scim:schemas:core:2.0:User'],
            id: user.id,
            externalId: user.externalId,
            meta: {
                resourceType: 'User',
                created: 'sometime',
                lastModified: '',
                location: 'hi',
                version: 1,
            },
            name: {
                formatted: 'Not Formatted',
                familyName: user.familyName,
                givenName: user.givenName,
            },
            userName: user.userName,
        }
        res.status(200).json(response)
    }
}

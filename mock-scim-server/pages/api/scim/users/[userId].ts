// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DAL } from '../../../../database/dal';
import { PostUsersRequestValidator, UserResourceResponse } from '../../../../scim/model';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const dal = await DAL.create();
    if (req.method === 'GET') {
        getUser(dal, req.query.userId as string, res);
    } else {
        // Handle any other HTTP method
    }
}

function getUser(dal: DAL, userId: string, res: NextApiResponse<any>) {
    const user = dal.getUser(userId);

    if (user == undefined) {
        res.status(404).json({message: "Not Found"});
        return;
    }

    const response: UserResourceResponse = {
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
    res.status(200).json(response);
}
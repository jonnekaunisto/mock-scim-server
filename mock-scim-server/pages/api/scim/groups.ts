// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DAL } from '../../../database/dal';
import { GroupResourceResponse, PostGroupsRequestValidator} from '../../../scim/model';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const dal = await DAL.create();
    if (req.method === 'GET') {
        //db.data.groups.push({ id: 1, title: 'lowdb is awesome' })
        //await db.write()
        //res.status(200).json({ name: 'John Doe' })
    } else if (req.method === 'POST') {
      await postGroup(dal, req.body, res);
    } else if (req.method === 'PUT') {
    } else if (req.method === 'PATCH') {
    } else if (req.method === 'DELETE') {
    } else {
        // Handle any other HTTP method
    }
}

async function postGroup(dal: DAL, requestBody: any, res: NextApiResponse<any>) {
  const result = PostGroupsRequestValidator.safeParse(requestBody);

  if (result.success == false) {
      console.log(result.error)
      res.status(500).json({message: "Validation error"});
  } else {
      const body = result.data;
      const group = await dal.createGroup({
          displayName: body.displayName,
          members: [], // TODO: take in members from the request
      })

      const response: GroupResourceResponse = {
          schemas: ['urn:ietf:params:scim:schemas:core:2.0:Group'],
          id: group.id,
          displayName: group.displayName,
      }
      res.status(200).json(response)
  }
}

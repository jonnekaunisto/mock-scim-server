// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataBase } from '../../../database/database'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const db = await getDataBase();
    if (req.method === 'GET') {
        //db.data.groups.push({ id: 1, title: 'lowdb is awesome' })
        //await db.write()
        res.status(200).json({ name: 'John Doe' })
    } else if (req.method === 'POST') {
    } else if (req.method === 'PUT') {
    } else if (req.method === 'PATCH') {
    } else if (req.method === 'DELETE') {
    } else {
        // Handle any other HTTP method
    }
}

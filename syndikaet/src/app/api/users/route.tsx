import { NextApiRequest, NextApiResponse } from 'next';
import Artist from '../../../../db/models/artist';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const artists = await Artist.findAll();
        res.status(200).json(artists);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch artists' });
      }
      break;

    case 'POST':
      try {
        const artist = await Artist.create(req.body);
        res.status(201).json(artist);
      } catch (error) {
        res.status(400).json({ error: 'Unable to create artist' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { IPatient } from "@/lib/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await create(req, res);
  }
  if (req.method === 'GET' && req.query.id) {
    return await getById(req, res);
  }
  if (req.method === 'GET') {
    return await read(req, res);
  }
  if (req.method === 'DELETE') {
    return await del(req, res);
  }
  if (req.method === 'PUT' && req.query.id) {
    return await update(req, res);
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connectToDatabase();
    const patient = req.body as IPatient;

    await db.collection('patients').insertOne(patient);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error inserting patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const read = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connectToDatabase();

    const patients = await db.collection('patients').find().toArray();
    res.status(200).json({ patients });
  } catch (error) {
    console.error('Error reading patients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const del = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connectToDatabase();
    const id = req.query.id as string;

    const objectId = new ObjectId(id);
    const result = await db.collection('patients').deleteOne({ _id: objectId });
    if (result.deletedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.query;
    const patient = req.body as IPatient;


    await db.collection('patients').findOneAndUpdate({ _id: new ObjectId(id as string) }, { $set: patient });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getById = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const { id } = req.query;

    const db = await connectToDatabase();
    const patient = await db.collection('patients').findOne({ _id: new ObjectId(id as string) });

    if (!patient) {
      console.error('Patient not found');
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json({ patient });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

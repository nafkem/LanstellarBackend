import { Request, Response, NextFunction } from 'express';
import { FindUsersInDatabase } from './data/get_contacts';
import { saveBeneficiary } from './data/save_beneficiary';
import { saveTransfer } from './data/save_transfer';
import { getUserBeneficiary } from './data/get_benficiary';
import { getUserTransactions } from './data/get_transactions';
import { getUserTBILLTransactions } from './data/get_tbill_transactions';
export class UserData {



  public MatchUsersToPhonebook = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {
      let data = await FindUsersInDatabase(req.body)

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  public SaveABeneficiary = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {
      let data = await saveBeneficiary(req.body)

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public GetBeneficiary = async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id)
    if (!id) {
      return res.status(400).json({ error: 'No id provided' });
    }


    try {
      let data = await getUserBeneficiary(id)

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  public GetTransaction = async (req: Request, res: Response) => {
    const id = req.params.id;
   
    if (!id) {
      return res.status(400).json({ error: 'No id provided' });
    }


    try {
      let data = await getUserTransactions(id)

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  public GetTbillTransaction = async (req: Request, res: Response) => {
    const id = req.params.id;
   
    if (!id) {
      return res.status(400).json({ error: 'No id provided' });
    }


    try {
      let data = await getUserTBILLTransactions(id)

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  public SaveTransferHistory = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ error: 'No payload' });
    }
    try {
      let data = await saveTransfer(req.body)

      res.send(data)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
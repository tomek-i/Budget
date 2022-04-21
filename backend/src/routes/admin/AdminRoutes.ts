import csv from 'csv-parser';
import { Router, Request, Response } from 'express';
import { createReadStream } from 'fs';
import { AdminController } from '../../controllers/AdminController';
import { ImportService } from '../../services/ImportService/ImportService';
import { DatabaseRoutes } from './database/DatabaseRoutes';
import { Transaction } from '../../entity/Transaction';
// import { DatabaseConnection } from '../../services/DatabaseService/DatabaseService';
import { WestpacBankTransaction } from '../../types/bankTransaction';

import { BankExport } from '../../entity/BankExport';
import { Westpac } from '../../utils/Westpac';
import { Windows } from '../../utils/Windows';

export const AdminRoutes = Router();
// const repositoryBankExport = DatabaseConnection.getRepository(BankExport);
// const repositoryTransaction = DatabaseConnection.getRepository(Transaction);
AdminRoutes.get('/last-import', async (_req: Request, res: Response) => {
  // let all = await repositoryBankExport.find();
  return res.json('all');
});

AdminRoutes.get('/import/:fileName', async (req: Request, res: Response) => {
  let filename = req.params.fileName;

  let newpath = `${process.cwd()}\\__files\\${filename}`;

  try {
    await new Promise((_resolve, reject) => {
      let entities: Transaction[] | undefined = [];

      createReadStream(newpath)
        .pipe(csv())
        .on('data', async (data: WestpacBankTransaction) => {
          entities?.push(new Transaction(data));
        })
        .on('end', async () => {
          if (!entities) return;
          // entities = await repositoryTransaction.save(entities);
          let bankExport = new BankExport();
          bankExport.fileName = newpath;
          bankExport.dateImported = new Date();
          bankExport.imported = true;
          // await repositoryBankExport.save(bankExport);
          res.json(entities);
        })
        .on('error', reject);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
AdminRoutes.get('/import', async (_req: Request, res: Response) => {
  let filename = Westpac.GetExportdataFilename();

  //TODO: need to check if folder '__files' exist
  //TODO: need to check if file in '__files' exist
  let newpath = `${process.cwd()}\\__files\\${filename}`;

  try {
    await new Promise((_resolve, reject) => {
      let entities: Transaction[] | undefined = [];

      createReadStream(newpath)
        .pipe(csv())
        .on('data', async (data: WestpacBankTransaction) => {
          entities?.push(new Transaction(data));
        })
        .on('end', async () => {
          if (!entities) return;
          // entities = await repositoryTransaction.save(entities);
          let bankExport = new BankExport();
          bankExport.fileName = newpath;
          bankExport.dateImported = new Date();
          bankExport.imported = true;
          // await repositoryBankExport.save(bankExport);
          res.json(entities);
        })
        .on('error', reject);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

AdminRoutes.get('/move', async (_req: Request, res: Response) => {
  //Data_export_31 10 2021.csv
  let d = new Date();
  let day = d.getDate().toString().padStart(2, '0');
  let month = (d.getMonth() + 1).toString().padStart(2, '0');
  let year = d.getFullYear();
  let ds = `${day}${month}${year}`;
  //C:\Users\thomas.iwainski\Downloads

  return res.sendStatus(500);
});

AdminRoutes.get('/get-latest', async (_req: Request, res: Response) => {
  try {
    // let latestResult = await repositoryBankExport.findOne({
    //   order: {
    //     dateImported: 'ASC',
    //   },
    // });

    // try {
    //   await ImportService.ImportData(latestResult?.dateImported);
    // } catch (error) {
    //   res.status(500).json(error);
    //   return;
    // }

    let filename = Westpac.GetExportdataFilename();
    let newpath = `${process.cwd()}\\__files\\${filename}`;
    if (Windows.MoveFileFromDownloadsFolder(filename, newpath)) {
      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
});

// URL: ./admin/
AdminRoutes.get('/user/:id', AdminController.getAdminById);
AdminRoutes.get('/user/:username', AdminController.getAdminByUsername);
AdminRoutes.get('/', (_req: Request, res: Response) => {
  res.send('OK');
});

AdminRoutes.use('/db', DatabaseRoutes);

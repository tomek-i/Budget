import csv from 'csv-parser';
import { Router } from 'express';
import { createReadStream } from 'fs';
import { AdminController } from '../../controllers/adminController';
import { ImportService } from '../../services/ImportService';
import { DatabaseRoutes } from './database';
import { Transaction } from '../../entity/Transaction';
import { DatabaseService } from '../../services/DatabaseService';
import { WestpacBankTransaction } from '../../types/bankTransaction';
import { FileHelper } from '../../utils';
import { BankExport } from '../../entity/BankExport';

export const AdminRoutes = Router();

AdminRoutes.get('/last-import', async (req, res) => {
  let all = await DatabaseService.getAll(BankExport);
  console.log('BANK EXPORT:', all);

  res.json(all);
});
AdminRoutes.get('/import', async (req, res) => {
  let d = new Date();
  let day = d.getDate().toString().padStart(2, '0');
  let month = (d.getMonth() + 1).toString().padStart(2, '0');
  let year = d.getFullYear();

  let ds = `${day}${month}${year}`;

  let filename = `Data_export_${ds}.csv`;

  let newpath = `${process.cwd()}\\__files\\${filename}`;

  try {
    await new Promise((resolve, reject) => {
      let entities: Transaction[] | undefined = [];

      createReadStream(newpath)
        .pipe(csv())
        .on('data', async (data: WestpacBankTransaction) => {
          entities?.push(new Transaction(data));
        })
        .on('end', async () => {
          entities = await DatabaseService.save(entities);
          let bankExport = new BankExport();
          bankExport.fileName = newpath;
          bankExport.dateImported = new Date();
          bankExport.imported = true;
          await DatabaseService.save(bankExport);
          res.json(entities);
        })
        .on('error', reject);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
AdminRoutes.get('/test', async (req, res) => {
  try {
    let latestResult = await DatabaseService.findOne<BankExport>(BankExport, {
      order: {
        dateImported: 'ASC',
      },
      take: 1,
    });

    try {
      await ImportService.ImportData(latestResult?.dateImported);
    } catch (error) {
      console.error('CATCHING ERROR:', error);
      res.status(500).json(error);
      return;
    }
    //Data_export_31 10 2021.csv
    let d = new Date();
    let day = d.getDate().toString().padStart(2, '0');
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let year = d.getFullYear();
    let ds = `${day}${month}${year}`;
    //C:\Users\thomas.iwainski\Downloads

    let filename = `Data_export_${ds}.csv`;
    let newpath = `${process.cwd()}\\__files\\${filename}`;
    let oldpath = `C:\\Users\\thomas.iwainski\\Downloads\\${filename}`;

    if (FileHelper.Exists(oldpath)) {
      FileHelper.Move(oldpath, newpath);
    }

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});
// URL: ./admin/
AdminRoutes.get('/user/:id', AdminController.getAdminById);
AdminRoutes.get('/user/:username', AdminController.getAdminByUsername);
AdminRoutes.get('/', (req, res) => {});

AdminRoutes.use('/db', DatabaseRoutes);

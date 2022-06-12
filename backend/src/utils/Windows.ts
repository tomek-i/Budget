import { FileHelper } from './FileHelper';
import os from 'os';

export namespace Windows {
  export const MoveFileFromDownloadsFolder = (
    filename: string,
    destination: string,
  ) => {
    const source = `${os.homedir()}\\Downloads\\${filename}`;

    if (FileHelper.Exists(source)) {
      FileHelper.Move(source, destination);
      return true;
    }
    return false;
  };
}

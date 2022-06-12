import csv from 'csv-parser';
import { createReadStream, existsSync, ReadStream, rename } from 'fs';
/**
 * Utility for dealing with Files
 */
export namespace FileHelper {
  /**
   * Checks if a file exists at the path.
   * @param path the path & filename to check
   * @returns true if the file exists otherwise false
   */
  export const Exists = (path: string) => {
    return existsSync(path);
  };

  /**
   * Moves a file from the source to the target path
   *
   * @remarks changing the target filename will also rename the file
   *
   * @param source the absolute sourche path
   * @param target the absolute target path
   */
  export const Move = (source: string, target: string) => {
    rename(source, target, () => {});
  };

  /**
   * Opens up a Readstream of the file specified
   * @param path the absolute path to the file
   * @returns the readstream of the file
   */
  export const Read = (path: string): ReadStream => {
    return createReadStream(path);
  };

  export const ReadCSV = async <T>(path: string): Promise<T[]> => {
    return new Promise(function (resolve, reject) {
      const fetchData: T[] = [];
      createReadStream(path)
        .pipe(csv())
        .on('data', (row) => {
          fetchData.push(row);
        })
        .on('end', () => {
          resolve(fetchData);
        })
        .on('error', reject);
    });
  };

  /**
   * Opens up a Readstream of the file specified that allows you to pipes
   * to a write able stream. Specify callbacks to intercept the 'on Data'
   * events as well as the 'on End' event.
   * @param path the absolute path to the file
   * @param writeableStream a writeable stream to pipe to
   * @param onDataCallback handler on data event
   * @param onEndCallback handler on end event
   */
  export const ReadPipe = (
    path: string,
    writeableStream: NodeJS.WritableStream,
    onDataCallback?: Function,
    onEndCallback?: Function,
  ) => {
    Read(path)
      .pipe(writeableStream)
      .on('data', async (data) => {
        if (onDataCallback) {
          await onDataCallback(data);
        }
      })
      .end('end', async () => {
        if (onEndCallback) {
          await onEndCallback();
        }
      });
  };
}

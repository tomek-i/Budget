export namespace Westpac {
  export const GetExportdataFilename = () => {
    let d = new Date();
    let day = d.getDate().toString().padStart(2, '0');
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let year = d.getFullYear();
    let ds = `${day}${month}${year}`;

    return `Data_export_${ds}.csv`;
  };
}

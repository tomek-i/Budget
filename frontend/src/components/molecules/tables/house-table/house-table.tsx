import { useEffect, useMemo, useState } from 'react';
import { Table } from '../../../atoms/table/table';
import { LoadingSpinner } from '../../../atoms/loading-spinner/loading-spinner';
import { useFetch } from '../../../../hooks/useFetch';
import { useTable, Column } from 'react-table';

interface HouseTableProps {
  url: string;
  canEdit: boolean;
  canDelete: boolean;

  fullWidth?: boolean;
}
interface House {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Name: string;
    Description: string;
    Area: number;
    BedRooms: number;
    Rent: number;
    Multiunit: boolean;
    Bathrooms: number;
    RentType: string;
  };
}

class TableColumn {
  text: string;
  key: string;
  visible: boolean;

  constructor(displayText: string, key?: string, visible: boolean = true) {
    this.text = displayText;
    this.key = key ?? displayText;
    this.visible = visible;
  }

  ToColumn = (): Column<object> | undefined => {
    //TODO: either its handled here or should be handled in the table itself?!
    if (!this.visible) return undefined;

    return {
      Header: this.text,
      accessor: this.key,
    };
  };
}
class HouseTableColumns {
  constructor() {
    console.log('CONSTRUCTOR');
  }
  Columns = [
    // new TableColumn('Id', 'ID', false),
    new TableColumn('Name'),
    new TableColumn('Description'),
    new TableColumn('Area'),
    new TableColumn('Bedrooms'),
    new TableColumn('Rent'),
    new TableColumn('Multi Unit', 'Multiunit'),
    new TableColumn('Bathrooms'),
    new TableColumn('Rent Freq.', 'RentType'),
    new TableColumn('Created at', 'createdAt'),
    new TableColumn('Updated at', 'updatedAt'),
    new TableColumn('Published at', 'publishedAt'),
  ];

  SetOrder = (key: string, index: number): any => {
    let foundIndex = this.Columns.findIndex((items) => items.key === key);
    let original = this.Columns[index];
    this.Columns[index] = this.Columns[foundIndex];
    this.Columns[foundIndex] = original;

    return JSON.parse(JSON.stringify(this.Generate()));
    //TODO: find column based of key
    //TODO: swap found colum with new index
  };

  Generate = () => {
    let res = this.Columns.map((col) => col.ToColumn()).filter(this.notEmpty);
    return res;
  };

  private notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }
}

export const HouseTable: React.FC<HouseTableProps> = ({
  fullWidth,
  canDelete,
  canEdit,
}) => {
  useEffect(() => {}, [canEdit, canDelete]);
  const { data, error, loading } = useFetch<House>(
    'http://localhost:1337/api/properties',
    true,
  );

  const houseTableColumns = new HouseTableColumns();

  //required to now call .Generate() twice
  const [columns, setColumns] = useState(houseTableColumns.Generate());

  if (loading) return <LoadingSpinner color="red" />;
  if (error) return <div>ERROR,something went wrong</div>;

  return (
    <>
      <button
        onClick={() => {
          console.log({ columns });
          const updatedColumns = houseTableColumns.SetOrder(
            'Name',
            Math.floor(Math.random() * 9),
          );

          console.log({ updatedColumns });
          setColumns(updatedColumns);
        }}
      ></button>
      <Table
        headings={columns}
        content={data.data?.map((x) => x.attributes)}
        fullWidth={fullWidth}
        loading={loading}
        canDelete={canDelete}
        canEdit={canEdit}
      />
    </>
  );
};

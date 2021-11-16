import type { NextPage } from 'next';
import { useTable, Column } from 'react-table';
import React, { useEffect, useState } from 'react';
import Table from '../src/components/molecules/Table';
import axios from 'axios';

import { CategoryType } from '../../common/types/category.type';
import { TransactionType } from '../../common/types/transaction.type';

export class Category implements CategoryType {
  id!: string;
  title!: string;
  description?: string;
  icon?: string;
  transactions?: TransactionType[];
}

class CategoryDisplay {
  title!: string;
  description?: string;
  icon?: string;
  // transactions?: TransactionType[];

  constructor(data: Category) {
    this.title = data.title;
    this.description = data.description;
    this.icon = data.icon;
    // if (data.icon) {
    //   this.icon = `<img width="50" src=${data.icon} alt="${this.title}" />`;
    // }
  }
}

const Categories: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]); //TODO: use memo?!
  const [columns, setColumns] = useState<Column<object>[]>([]); //TODO: use memo??
  const [loading, setLoading] = useState(false);

  const init = async () => {
    let data = axios.get<Category[]>(`${process.env.BASE_API_URL}/categories`);

    return data;
  };

  useEffect(() => {
    setLoading(true);
    createColumns();
    async function fetchData() {
      const response = await init();

      console.log('CATEGORY DATA:', response.data);
      if (response.data && response.data.length > 0) {
        let display: CategoryDisplay[] = [];

        response.data.map((cat) => {
          display.push(new CategoryDisplay(cat));
        });
        setCategories(response.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const IconCell = ({ values }: { values: string }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return <img src={values} alt={''} />;
  };

  const createColumns = () => {
    let cols: Column<object>[] = Object.getOwnPropertyNames(new Category()).map(
      (columnName) => {
        let cell: Column<object> = {
          Header: columnName.toUpperCase(),
          accessor: columnName,
        };

        //if we are an icon cell then we render differently
        if (columnName.toLowerCase().includes('icon')) {
          cell = {
            ...cell,
            // Cell method will provide the cell value; we pass it to render a custom component
            Cell: ({
              cell: { value },
            }: {
              cell: {
                value: any;
              };
            }) => <IconCell values={value} />,
          };
        }

        return cell;
      },
    );
    setColumns(cols);
  };

  // useEffect(()=>{
  // },[loading]);

  const render = () => {
    if (loading) {
      //TODO: maybe i can display the headers already and then the table body as loading ???
      return <div>loading ...</div>;
    }

    return <Table columns={columns} data={categories} />;
  };

  return render();
};

export default Categories;

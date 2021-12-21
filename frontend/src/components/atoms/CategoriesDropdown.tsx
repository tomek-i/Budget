import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Category } from '../../../pages/categories';
import Dropdown from './Dropdown';

const CategoriesDropdown: React.FC = () => {
  let [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      let result = await axios.get<Category[]>(
        `${process.env.BASE_API_URL}/categories`,
      );
      let titles: string[] = [''];
      for (const category of result.data) {
        titles.push(category.title);
      }
      setCategories(titles);
    };
    fetchCategories();
  }, []);

  return <Dropdown items={categories} />;
};

export default CategoriesDropdown;

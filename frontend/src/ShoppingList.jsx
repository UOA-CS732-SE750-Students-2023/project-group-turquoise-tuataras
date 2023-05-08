import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import getShoppingListIngredients from "./getShoppingListIngredients";
import shoppingListRecipes from './Recipes.json'

export default function ShoppingList() {


  const tableData = getShoppingListIngredients(shoppingListRecipes);

  const columns = [
    {
      title: 'Ingredient Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
  };

  return (
      <>
        <Table columns={columns} dataSource={tableData} onChange={onChange} />
      </>
  );
}

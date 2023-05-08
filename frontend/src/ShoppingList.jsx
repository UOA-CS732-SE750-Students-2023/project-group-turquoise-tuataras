import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import getShoppingListIngredients from "./getShoppingListIngredients";
import shoppingListRecipes from './Recipes.json'
import styles from './ShoppingList.module.css';

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
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
  };

  return (
      <>
        <div>
          <img src="" alt="" />
        </div>
        <div>
        <Table className={styles.shoppingListTable} columns={columns} dataSource={tableData} onChange={onChange} />
        </div>
      </>
  );
}

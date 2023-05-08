import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button , Table} from 'antd';
import getShoppingListIngredients from "./getShoppingListIngredients";
import shoppingListRecipes from './Recipes.json'
import styles from './ShoppingList.module.css';

export default function ShoppingList() {

  const tableData = getShoppingListIngredients(shoppingListRecipes);

  const columns = [
    {
      title: 'Ingredient Name',
      dataIndex: 'name',
      align: 'center',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      align: 'center',
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
  };

  return (
      <div>
        <div className={styles.shopping_list_title}>
          <div className={styles.shopping_list_img}>
            <img src="./shopping_list_title2.jpg"  style={{ width: 400 , height: 80}} alt="shopping_list_title" />
          </div>
          <div className={styles.ShoppinListButtonTable}>
              <div className={styles.shopping_list_date}>
                <span> Date:  {date} (One Week)</span>
              </div>  
              <div className={styles.shopping_list_button}>            
                <Link to={`../stores-near-me`}>
                  <Button type="primary">
                    Stores Near Me
                  </Button>
                </Link> 
              </div>                   
      </div>
        </div>
        <div className={styles.custom_table} >
        <Table   columns={columns} dataSource={tableData} onChange={onChange} />
        </div>
      </div>
  );
}


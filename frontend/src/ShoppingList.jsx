import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button , Table} from 'antd';
import getShoppingListIngredients from "./getShoppingListIngredients";
import shoppingListRecipes from './Recipes.json'
import styles from './ShoppingList.module.css';

export default function ShoppingList() {

  const [ shoppingListData, setShoppingListData] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
        const response = await axios(
          'http://localhost:3000/api/shopping-list',
        );
        setShoppingListData(response.data);
      };
      fetchData();
    }, [shoppingListData]);


  //---------------------------------------------------  
  const recipes = [...shoppingListData[0].recipes];

  const tableData = getShoppingListIngredients(recipes);

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

  // Display One week from now  ----------
  const todatTime = new Date();
  const nextWeek = new Date(todatTime.getTime() + 7 * 24 * 60 * 60 * 1000)

  const year = todatTime.getFullYear(); 
  const month = todatTime.getMonth() + 1; 
  const day = todatTime.getDate(); 

  const yearWeek = nextWeek.getFullYear(); 
  const monthWeek = nextWeek.getMonth() + 1; 
  const dayWeek = nextWeek.getDate(); 

  const innertComment = {
      date: `${day}/${month}/${year} ~ ${dayWeek}/${monthWeek}/${yearWeek}`
  }
  // Display One week from now ----------

  return (
      <div>
        <div className={styles.shopping_list_title}>
          <div className={styles.shopping_list_img}>
            <img src="./shopping_list_title2.jpg"  style={{ width: 400 , height: 80}} alt="shopping_list_title" />
          </div>
          <div className={styles.ShoppinListButtonTable}>
              <div className={styles.shopping_list_date}>
                <span> Date: {innertComment.date.toLocaleString()} </span>
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


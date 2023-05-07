
import React from "react";
import { Pie, G2 } from '@ant-design/plots';
import styles from './NutritionPie.module.css';

const G = G2.getEngine('canvas');

export default function NutritionPie({recipe}) {

    const data = getNutrituionData(recipe);

    console.log("data = " , data)

    function getNutrituionData(recipe) {

        const PieData = [];

        for (let index = 0; index < recipe.nutrition.length-1; index++) {
            PieData[index] = {type:recipe.nutrition[index+1]["name"] , 
                              value: Math.floor(recipe.nutrition[index].amount)}
        };

        console.log("PieData = " , PieData)

        return PieData;
    } 

    const pieconfig = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        innerRadius: 0.4,

        legend: {
          layout: 'horizontal',
          position: 'top',
          offsetX: 0
        },

        label: {

          type: 'spider',
          labelHeight: 40,

          formatter: (data, mappingData) => {
            const group = new G.Group({});
            group.addShape({
              type: 'circle',
              attrs: {
                x: 0,
                y: 0,
                width: 40,
                height: 50,
                r: 5,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: 'text',
              style: {
              fontSize: 14,
              textAlign: 'center',
              },
              attrs: {
                x: 10,
                y: 8,
                text: `${data.type}`,
                fill: mappingData.color,
              },
            });
            group.addShape({
              type: 'text',
              attrs: {
                x: 0,
                y: 25,
                text: `${(data.percent * 100).toFixed(2)}% (${data.value})`,
                fill: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 700,
                
              },
            });
            return group;
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-highlight', //element-active
          },
        ],
      };

    return(
        <div style={{ width: 750 , height: 500} }>
            <Pie {...pieconfig}/>    
            <span className={styles.Calories} >Calories: {recipe.nutrition[0].amount} cal</span>             
        </div>
    );
}

from numbers import Integral
import pandas as pd
import numpy as np
from sklearn.metrics import r2_score
from catboost import CatBoostRegressor
from datetime import datetime 
import os
from odoo import fields, models, api
from odoo.modules.module import get_module_resource



class Predictor(models.Model):
    _name = 'predictor'
    
    def predict(self,car_values):
        path = os.path.expanduser('/opt/odoo15/final_year/backend/models/columns.csv')
        columns_file = open(path, 'r')
        cars = pd.read_csv(columns_file)

        fuel = ''
        if car_values.fuel == 'petrol':
            fuel = 'Gasoline'
        else: 
            fuel = 'Diesel'

        testCars = {
            'mileage':  car_values.mileage,
            'make':     car_values.brand_id.name.capitalize(),
            'model':    car_values.car_model_id.name.capitalize(),
            'fuel':     fuel,
            'gear':     car_values.transmission.capitalize(),
            'offerType': car_values.offer_type.capitalize(),
            'hp':        car_values.hp,
            'year':      car_values.year.year,
        }

        
        model = CatBoostRegressor()      # parameters not required.
        model.load_model(os.path.join('/opt/odoo15/final_year/backend/models/', 'car_model'))


        estCars = car_values
        
        testCars = pd.DataFrame.from_records([testCars])

        testCars['age'] = datetime.now().year - testCars['year'] 
        testCars = testCars.drop(columns='year') 
        testCars = testCars.drop(columns='model') 

        #spreading out the categorical data and then dropping the columns
        offerTypeDummies = pd.get_dummies(testCars.offerType) 
        testCars = testCars.join(offerTypeDummies) 
        testCars = testCars.drop(columns='offerType') 

        gearDummies = pd.get_dummies(testCars.gear) 
        testCars = testCars.join(gearDummies) 
        testCars = testCars.drop(columns='gear')

        fuelDummies = pd.get_dummies(testCars.fuel) 
        testCars = testCars.join(fuelDummies) 
        testCars = testCars.drop(columns='fuel')  

        makeDummies = pd.get_dummies(testCars.make) 
        testCars = testCars.join(makeDummies, lsuffix='_left', rsuffix='_right') 
        testCars = testCars.drop(columns='make') 


        cars = cars.loc[:, ~cars.columns.str.contains('^Unnamed')]
        fitModel = pd.DataFrame(columns=cars.columns) 
        fitModel = fitModel.append(testCars, ignore_index=True) 
        fitModel = fitModel.fillna(0) 
 
        preds = model.predict(fitModel) 
        preds = preds.astype(np.int64)
        price = int(preds[0]) * 3800 # 3800 is the dollar to shillings'''
        
        return price
from numbers import Integral
from django.db import models
import pandas as pd
import numpy as np
from sklearn.metrics import r2_score
from catboost import CatBoostRegressor
from datetime import datetime 
import os
from simple_multivendor_site.settings import PROJECT_ROOT

class Predictor(models.Model):

    def predict(car_values):
        columns_file = open(os.path.join(PROJECT_ROOT, 'columns.csv'))
        cars = pd.read_csv(columns_file)
        
        model = CatBoostRegressor()      # parameters not required.
        model.load_model(os.path.join(PROJECT_ROOT, 'car_model'))
        testCars = car_values
        for i in testCars:        
            testCars[i] = testCars[i][0]
            if testCars[i].isnumeric():
                testCars[i] = int(testCars[i])

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
        price = int(preds[0]) * 3800 # 3800 is the dollar to shillings
        
        return price
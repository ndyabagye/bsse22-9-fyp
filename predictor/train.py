from datetime import datetime 
from matplotlib import pyplot as plt
import pandas as pd

cars = pd.read_csv('germany-cars-zenrows.csv') 
cars['age'] = datetime.now().year - cars['year'] 

#remove the rows year,make and model from 
# the dataframe wont be used for prediction
cars = cars.drop(columns='year')
#cars = cars.drop(columns='make') 
cars = cars.drop(columns='model') 

#drop null values and remove all values that deviate more 
#than three standard deviations from the mean.
from scipy import stats
cars = cars.dropna() 
cars = cars[stats.zscore(cars.price) < 3] 
cars = cars[stats.zscore(cars.hp) < 3] 
cars = cars[stats.zscore(cars.mileage) < 3] 


#spreading out the categorical data and then dropping the columns
offerTypeDummies = pd.get_dummies(cars.offerType) 
cars = cars.join(offerTypeDummies) 
cars = cars.drop(columns='offerType') 

gearDummies = pd.get_dummies(cars.gear) 
cars = cars.join(gearDummies) 
cars = cars.drop(columns='gear')

fuelDummies = pd.get_dummies(cars.fuel) 
cars = cars.join(fuelDummies) 
cars = cars.drop(columns='fuel') 

makeDummies = pd.get_dummies(cars.make) 
cars = cars.join(makeDummies, lsuffix='_left', rsuffix='_right') 
cars = cars.drop(columns='make') 

# not to train the model
from sklearn.model_selection import train_test_split  
X = cars.drop(columns='price') 
Y = cars.price 
X_train, X_test, y_train, y_test = train_test_split( 
	X, Y, train_size=0.7, test_size=0.3, random_state=100) 

#second training model (catboost is best)
from catboost import CatBoostRegressor 
model = CatBoostRegressor(iterations=6542, learning_rate=0.03) 
model.fit( 
	X_train, y_train, 
	eval_set=(X_test, y_test), 
) 

model.save_model('car_model')
print(model.score(X, Y)) # 0.92416

cars = pd.DataFrame(columns=cars.columns)
cars = cars.loc[:, ~cars.columns.str.contains('^Unnamed')]
cars.to_csv('columns.csv')

#--------------EXTRA EXPLANATORY CODE----------------------#
"""
cars = pd.DataFrame(columns=cars.columns)
cars = cars.loc[:, ~cars.columns.str.contains('^Unnamed')]
cars.to_csv('columns.csv')

makeDummies = pd.get_dummies(cars.make) 
cars = cars.join(makeDummies, lsuffix='_left', rsuffix='_right') 
cars = cars.drop(columns='make') 

modelDummies = pd.get_dummies(cars.model) 
cars = cars.join(modelDummies) 
cars = cars.drop(columns='model')

#now we check the correlation to +ve and -ve correlation.
import seaborn as sns 
sns.heatmap(cars.corr(), annot=True, cmap='coolwarm') 
#plt.show() 

# showing the correlation between horsepower and price.
sns.set_theme(style="darkgrid") 
sns.jointplot(x="hp", y="price", data=cars, 
    kind="reg", color="m", line_kws={'color': 'red'}) 
#plt.show()"""

#first training model
"""from sklearn import linear_model 
from sklearn.metrics import r2_score 
lm = linear_model.LinearRegression() 
lm.fit(X_train, y_train) 
y_pred = lm.predict(X_test) 
print(r2_score(y_true=y_test, y_pred=y_pred)) # 0.81237"""

#third training model
"""import statsmodels.api as sm 
X = cars[['mileage', 'hp', 'age']] 
model = sm.OLS(Y, X).fit() 
predictions = model.predict(X) 
print(model.rsquared) # 0.91823


# establishment of the most important features
sorted_feature_importance = model.get_feature_importance().argsort( 
	)[-20:] 
plt.barh( 
	cars.columns[sorted_feature_importance], 
	model.feature_importances_[sorted_feature_importance] 
) 
plt.xlabel("Feature Importance") 
plt.show()"""

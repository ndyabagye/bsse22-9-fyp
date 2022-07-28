#!/usr/bin/env python
# coding: utf-8

# In[76]:


import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.ticker import FormatStrFormatter


# In[77]:


df = pd.read_csv('responses.csv')


# In[78]:


df


# In[109]:


data = df['When to bargain']

data = data.dropna()

data = data.value_counts().sort_values()

plt.bar(x=data.index, height=data.values, color="orange", width=0.5)
 
plt.xticks(rotation=90)

plt.xlabel("No. Of Correspondents")

plt.ylabel("Response")

plt.title("How Respondents Choose When To Bargain")

plt.savefig('when_to_bargain.png',bbox_inches='tight')


# In[110]:


data = df['Choosing traders to buy from']

data = data.dropna()

data = data.dropna()

data = data.value_counts().sort_values()

plt.bar(x=data.index, height=data.values, color="blue", width=0.5)
 
plt.xticks(rotation=90)

plt.xlabel("Responses")

plt.ylabel("No Of Correspondents")

plt.title("Linear graph")

plt.title("How Respondents Choose Where TO Buy From")

plt.savefig('where_to_buy_from.png',bbox_inches='tight')


# In[111]:


data = df['Decide on best price']

data = data.dropna()

data = data.dropna()

data = data.value_counts().sort_values()

plt.bar(x=data.index, height=data.values, color="red", width=0.5)
 
plt.xticks(rotation=90)

plt.xlabel("Responses")

plt.ylabel("No Of Correspondents")

plt.title("How Respondents Decide On A Final Price")

plt.savefig('decide_on_the_best_price.png',bbox_inches='tight')


# In[112]:


data = df['Difficulties faced']

data = data.dropna()

data = data.dropna()

data = data.value_counts().sort_values()

plt.bar(x=data.index, height=data.values, color="green", width=0.5)
 
plt.xticks(rotation=90)

plt.xlabel("Responses")

plt.ylabel("No Of Correspondents")

plt.title("Difficulties Faced By Correspondents During Bargaining")

plt.savefig('difficulties_faced.png',bbox_inches='tight')


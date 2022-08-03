#import library
import pandas as pd

"""Price/Quality - 10
Reviews/Referral - 11
Nearest/Random - 6
Experience - 1
Seller has many options - 1
Other - 4"""

"""Lower price  - 8
Satisfaction - 10
Know Price - 2
Quality vs The price - 3
Comparison with others - 5
Other - 3"""

"""Language Barrier - 4
Rigid Sellers - 5
Price Ignorance - 7
Low bargaining power - 3
Rude Traders - 4
Time Consuming - 4
Other - 3"""


df = pd.DataFrame({'Response': [
    'High Price', 'Knows Price', 'No set Price',
    'Compare Prices', 'Always', 'Other' 
    ], 'No. Of Correspondents': [15,5,4,3,3,3]})

bargraph = df.plot.bar(x = 'Response', y = 'No. Of Correspondents', fontsize='9')



df = pd.DataFrame({'Response': [
    'High Price', 'Knows Price', 'No set Price',
    'Compare Prices', 'Always', 'Other' 
    ], 'No. Of Correspondents': [15,5,4,3,3,3]})

bargraph = df.plot.bar(x = 'Response', y = 'No. Of Correspondents', fontsize='9')
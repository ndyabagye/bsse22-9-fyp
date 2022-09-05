from django.db import models
import random


#changed asking_price to client_offer
#changed display_value to selling_price
#changed base_price to base_price

class Negotiator(models.Model):
    _name = 'negotiator'

    def negotiate(fraction, old_offer, client_offer, old_price):
        #if the buyer lowers his/her offer than what he/she previously offered, the bot sticks to the old offer.
        if (client_offer <= old_price):
            return old_offer
        else:
            bargain = old_offer - ((old_offer - client_offer) * fraction)
            return round(bargain, -2)

    def lower_price(client_offer, old_price_list, selling_price, base_price):
        if (selling_price <= client_offer):
            print(selling_price)
            return "Deal!"
        elif (selling_price > client_offer):
            if(client_offer >= base_price):
                fraction_list = [0, 1/3, 2/3]
                selling_price = Negotiator.negotiate(random.choice(fraction_list), selling_price, client_offer, old_price_list[-2])
                print(selling_price)
                return "I can only do "+ str(selling_price) +" UGX, Deal or No deal!", selling_price
            else:
                print("or here")
                return "You can't enter a lower price than the last one!"
        else:
            print("here")
            return "No deal!"
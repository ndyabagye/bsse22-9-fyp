import random

def lower_price(asking_price, old_price_list, display_value, last_price):
    
    if (asking_price >= display_value): #if a customer offers a price higher than the bot's offer
        return ["Deal!", display_value]

    else:
        if (asking_price <= old_price_list[-2]):  #if customer lowers the price from the initial one then stick to the old offer
            return ["You can't lower the price from your initial offer. Our offer is still "+str(display_value)  , display_value]

        elif (asking_price < 2/3*(last_price)): #if customer offers a very low price from that expected
            return ["We recommend you to increase your offer or try out another product.", display_value]

        elif(asking_price > last_price): #if customer offers a price lower than the bot's offer
            if len(old_price_list) >= random.choice(3,5):
                display_value = asking_price
                return ["Ok we will have a deal"]
            display_value = negotiate(random.uniform(0,1/3), display_value, asking_price, old_price_list[-2])
            return ["I can only do.... "+ str(display_value) +" ugx |]\n\t Deal or No deal!", display_value]

def negotiate(fraction, old_offer, asking_price, old_price):

    #if the buyer lowers his/her offer than what he/she previously offered, the bot sticks to the old offer.
    if (asking_price <= old_price):
        return old_offer
    else:
        bargain = old_offer - ((old_offer - asking_price) * fraction)
        return round(bargain, -2)

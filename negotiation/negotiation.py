import random

def lower_price(asking_price, old_price_list, display_value, last_price):
    
    if (display_value <= asking_price):
        print(display_value)
        return "Deal!"

    elif (display_value > asking_price):
        if(asking_price >= last_price):
            fraction_list = [0, 1/3, 2/3]
            display_value = negotiate(random.choice(fraction_list), display_value, asking_price, old_price_list[-2])
            print(display_value)
            return "I can only do.... "+ str(display_value) +" ugx |]\n\t Deal or No deal!", display_value
        else:
            print("or here")
            return "You can't enter a lower price than the last one!"
    else:
        print("here")
        return "No deal!"

def negotiate(fraction, old_offer, asking_price, old_price):

    #if the buyer lowers his/her offer than what he/she previously offered, the bot sticks to the old offer.
    if (asking_price <= old_price):
        return old_offer
    else:
        bargain = old_offer - ((old_offer - asking_price) * fraction)
        return round(bargain, -2)

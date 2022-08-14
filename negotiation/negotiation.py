import random

def negotiate(fraction, old_offer, asking_price, old_price):
    if (asking_price <= old_price):
        # print("You can't lower your offer")
        return old_offer
    else:
        bargain = old_offer - ((old_offer - asking_price) * fraction)
        return round(bargain, -2)

def lower_price(asking_price, old_price_list, display_value, last_price):
    if (display_value <= asking_price):
        return "Deal!"
    elif (display_value > asking_price):
        if(asking_price >= last_price):
            fraction_list = [0, 1/3, 2/3]
            display_value = negotiate(random.choice(fraction_list), display_value, asking_price, old_price_list[-2])
            return "I can only do.... "+ str(display_value) +" ugx |]\n\t Deal or No deal!", display_value
            # deal = input("Deal or No deal? ").lower()
            # if(deal == "deal"):
            #     return "Deal!"
            # else:
            #     continue
        else:
            return "You can't enter a lower price than the last one!"
    else:
        return "No deal!"
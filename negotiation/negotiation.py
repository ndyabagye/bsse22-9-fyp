import random

def negotiate(fraction, old_offer, asking_price, old_price):
    if (asking_price <= old_price):
        print("You can't lower your offer")
        return old_offer
    else:
        bargain = old_offer - ((old_offer - asking_price) * fraction)
        return round(bargain, -2)

def lower_price():
    display_value = 100000
    last_price = 70000
    asking_price = 0

    old_price = asking_price
    asking_price = float(input("What is the asking price? "))
    utiliy = asking_price - old_price

    if (display_value <= asking_price):
        return "Deal!"
    elif (display_value > asking_price):
        if(asking_price >= last_price):
            fraction_list = [0, 1/3, 2/3]
            display_value = negotiate(random.choice(fraction_list), display_value, asking_price, old_price)
            print("I can only do.... ",display_value,"ugx")
            deal = input("Deal or No deal? ").lower()
            if(deal == "deal"):
                return "Deal!"
            # else:
            #     continue
        else:
            print("You can't enter a lower price than the last one!")
    else:
        return "No deal!"
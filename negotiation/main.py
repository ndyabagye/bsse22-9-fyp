import random
import json
import pickle
import numpy as np
import re

import nltk
from nltk.stem import WordNetLemmatizer
import negotiation

from tensorflow.keras.models import load_model

lemmatizer = WordNetLemmatizer()

intents = json.loads(open('intents.json').read())

words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbotmodel.h5')

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word)  for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words= clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1

    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    results.sort(key=lambda  x:x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list


def get_response(intents_list,intents_json):
    tag= intents_list[0]['intent']
    list_of_intents =intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result

print("|============= Welcome to Negotiation Chatbot System! =============|")
print("|============================== Feel Free ============================|")
print("|================================== To ===============================|")
print("|=========================== State your price ================|")

old_price_list = [0]
offer_list = [0]
display_value = 100000
last_price = 70000

while True:
    message = input("| You: ").lower()
    ints = predict_class(message)
    print(ints[0]['intent'])
    res = get_response(ints, intents)
        
    # if message == "bye" or message == "goodbye" or message == "deal":
    if ints[0]['intent'] == "goodbye" or ints[0]['intent'] == "deal":
        print("| Bot:", res)
        print("|===================== The Program End here! =====================|")
        exit()



    else:
        if ints[0]['intent'] == "negotiate":      #checks to see the intent of the chatbot
            figures = re.findall(r'\d+', message)   #finds all the numbers in the message
            if len(figures) == 0:
                print("| Bot:", res)
                continue
            else:
                asking_price = float(figures[0])
                old_price_list.append(asking_price)
                reply = negotiation.lower_price(asking_price, old_price_list, display_value, last_price)
                res = reply[0]
                offer_list.append(reply[1])
                display_value = reply[1]
                print(asking_price, old_price_list, display_value, last_price,offer_list)
    print("| Bot:", res)
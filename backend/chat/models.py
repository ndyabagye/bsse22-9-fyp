from http import client
from django.db import models
import random
import json
import pickle
import numpy as np
import re
import nltk
from nltk.stem import WordNetLemmatizer
import tensorflow as tf
from keras.models import load_model
from simple_multivendor_site.settings import PROJECT_ROOT
import os

from negotiation.models import Negotiator

class ChatBot(models.Model):

    lemmatizer = WordNetLemmatizer()
    words = pickle.load(open(os.path.join(PROJECT_ROOT, 'words.pkl'), 'rb'))
    intents = json.loads(open(os.path.join(PROJECT_ROOT, 'intents.json')).read())
    classes = pickle.load(open(os.path.join(PROJECT_ROOT, 'classes.pkl'), 'rb'))
    model = load_model(os.path.join(PROJECT_ROOT, 'chatbotmodel.h5'))

    def chat(client_response):
        for i in client_response:
            client_response[i] = client_response[i][0]

        old_price_list = client_response['old_price_list'].split(",")
        offer_list = client_response['offer_list'].split(",")

        x = 0
        for i in old_price_list:
            old_price_list[x] = int(old_price_list[x])
            x = x+1

        y = 0
        for i in offer_list:
            offer_list[y] = int(offer_list[y])
            y = y+1

        base_price = int(client_response['base_price'])
        selling_price = int(client_response['selling_price'])

        message = client_response['client_response'].lower()

        ints = ChatBot.predict_class(message)
        print("")
        print(ints)
        print("")

        res = ChatBot.get_response(ints, ChatBot.intents)
        if message == "bye" or message == "Goodbye" or message == "deal":
            res = ChatBot.get_response(ints, ChatBot.intents)
            chatbot_response = {
                'ai_response': res,
                'offer_list': offer_list,
                'old_price_List': old_price_list,
                'selling_price': selling_price,
                'base_price':base_price,
            }
            return chatbot_response
        else:
            if ints[0]['intent'] == "negotiate":      #checks to see the intent of the chatbot
                figures = re.findall(r'\d+', message)   #finds all the numbers in the message
                if len(figures) == 0:
                    chatbot_response = {
                        'ai_response': ai_response,
                        'offer_list': offer_list,
                        'old_price_List': old_price_list,
                        'selling_price': selling_price,
                        'base_price':base_price,
                    }
                    return chatbot_response
                else:

                    client_offer = int(figures[0])
                    old_price_list.append(client_offer)
                    reply = Negotiator.lower_price(client_offer, old_price_list, selling_price, base_price)
                    print('')
                    print(reply)
                    print("")
                    ai_response = reply[0]
                    offer_list.append(reply[1])
                    selling_price = reply[1]

                chatbot_response = {
                    'ai_response': ai_response,
                    'offer_list': offer_list,
                    'old_price_List': old_price_list,
                    'selling_price': selling_price,
                    'base_price':base_price,
                }
                return chatbot_response

        chatbot_response = {
            'ai_response': res,
            'offer_list': offer_list,
            'old_price_List': old_price_list,
            'selling_price': selling_price,
            'base_price':base_price,
        }
        return chatbot_response

        """message = client_response['client_response'].lower()
        ints = ChatBot.predict_class(message)
        res = ChatBot.get_response(ints, ChatBot.intents)

        if ints[0]['intent'] == "goodbye" or ints[0]['intent'] == "deal":
            return res
        elif ints[0]['intent'] == "negotiate":
            figures = re.findall(r'\d+', message)   #finds all the numbers in the message
            if len(figures) == 0:
                return res
            else:
                client_offer = float(figures[0])

                old_price_list.append(client_offer)
                reply = Negotiator.lower_price(client_offer, old_price_list, selling_price, base_price)
                ai_response = reply[0]
                offer_list.append(reply[1])
                selling_price = reply[1]

                chatbot_response = {
                    'ai_response': ai_response,
                    'offer_list': offer_list,
                    'old_price_List': old_price_list,
                    'selling_price': selling_price,
                    'base_price':base_price,
                }

                print("")
                print(chatbot_response)
                print("")
                return chatbot_response

        return res"""


    def clean_up_sentence(sentence):
        sentence_words = nltk.word_tokenize(sentence)
        sentence_words = [ChatBot.lemmatizer.lemmatize(word)  for word in sentence_words]
        return sentence_words

    def bag_of_words(sentence):
        sentence_words= ChatBot.clean_up_sentence(sentence)
        bag = [0] * len(ChatBot.words)
        for w in sentence_words:
            for i, word in enumerate(ChatBot.words):
                if word == w:
                    bag[i] = 1

        return np.array(bag)

    def predict_class(sentence):
        bow = ChatBot.bag_of_words(sentence)
        res = ChatBot.model.predict(np.array([bow]))[0]
        ERROR_THRESHOLD = 0.25
        results = [[i,r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

        results.sort(key=lambda  x:x[1], reverse=True)
        return_list = []
        for r in results:
            return_list.append({'intent': ChatBot.classes[r[0]], 'probability': str(r[1])})
        return return_list

    def get_response(intents_list,intents_json):
        tag= intents_list[0]['intent']
        list_of_intents =intents_json['intents']
        for i in list_of_intents:
            if i['tag'] == tag:
                result = random.choice(i['responses'])
                break
        return result
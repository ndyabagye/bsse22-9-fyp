import xmlrpc.client
import scraping2
import asyncio


url = 'http://localhost:8069'
db = 'finalyear'
username = 'jkigula@icloud.com'
password = 'ni3r-mauh-xdwn'

common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))
models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(url))

client_response = {
    
}
order = {}
for i in client_response:
    order[i] = client_response[i]
uid = common.authenticate(db, username, password, {})


'''id = models.execute_kw(
        db, uid, password,
        'product', 'create',[
            order
    ])'''

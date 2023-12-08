import requests

# url = 'http://127.0.0.1:5000/text'
# text=str(input("Text : "))
# data = {'text': text}

# response = requests.get(url, json=data)
# print(response.json())

url2="http://127.0.0.1:5000/test"
response=requests.get(url2)
print(response.json())
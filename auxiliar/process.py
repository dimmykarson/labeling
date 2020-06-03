import numpy as np
import pandas as pd
import codecs
import requests

url = "http://localhost:8080/api/v1/arguments"

class Argumento:
    def __init__(self, text, label, importance, process, comments):
        self.text = text
        self.label = label
        self.importance = importance
        self.process = process
        self.comments = comments

class Tupla:

    def __init__(self, data):
        self.processo = data[1]
        self.deferido = data[4]
        self.label = data[5]
        self.argumentos_pro = []
        argumento = data[6]
        commentario = data[7]
        self.argumentos_pro.append((argumento, commentario))
        if data[8]:
            argumento = data[8]
            commentario = data[9]
            self.argumentos_pro.append((argumento, commentario))
        if data[10]:
            argumento = data[10]
            commentario = data[11]
            self.argumentos_pro.append((argumento, commentario))

        self.argumentos_con = []
        if data[12]:
            argumento = data[12]
            commentario = data[13]
            self.argumentos_con.append((argumento, commentario))
        
        if data[14]:
            argumento = data[14]
            commentario = data[15]
            self.argumentos_con.append((argumento, commentario))
        
        if data[16]:
            argumento = data[16]
            commentario = data[16]
            self.argumentos_con.append((argumento, commentario))


if __name__ == '__main__':
    registros = []
    with codecs.open("processos.tsv", "r", encoding="utf-8") as file:
        lines = file.readlines()
        for line in lines:
            data = line.split("\t")
            data = Tupla(data)
            registros.append(data)
    print("Len registros ", len(registros))
    argumentos = []
    for reg in registros:
        label = reg.label
        processo = reg.processo
        for k, arg_pro in enumerate(reg.argumentos_pro):
            argumento = arg_pro[0]
            commentario = arg_pro[1]
            arg = Argumento(argumento, label, k, processo, commentario)
            argumentos.append(arg)
    print("Len argumentos", len(argumentos))

    for arg in argumentos:
        data = {
        'text': arg.text,
        'label': arg.label,
        'importance': arg.importance,
        'process': arg.process,
        'comments': arg.comments
        }
        x = requests.post(url, data = data)

            

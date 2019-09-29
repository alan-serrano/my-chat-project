## Api rest ejercicio

```
{
    user: {
        idJuan: {
            name: Juan
        }
    },

    message: {
        idJuan: {
            idMaria:[
                {
                    text
                    time
                }
            ]
        }
    }
}
```

```
{
    "user": {
        "idJuan": {
            "email": "juan.gmail.com",
            "name": "Juan"
        },
        "idMaria": {
            "email": "Maria.gmail.com",
            "name":  "Maria"
        }
    },
    
    "message": {
        "idMessage": {
            emisor: idJuan
            receptor: idMaria
            text: Hola que tal
            time: 14-05
        }
        
        "idMessage2": {
            emisor: idMaria
            receptor: idJuan
            text: Todo bien y vos?
        }
    }
    
]
```
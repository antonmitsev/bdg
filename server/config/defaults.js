module.exports = {
    records : 1000,
    collection: 'stoRaRo',
    apis: {
        'heroes' : {
            api: 'heroes',
            db: 'hero-api',
            fields: {   // PUT data fields here. If FORM field corresponds DB field - use 'FIELD_NAME': false or 'FIELD_NAME_FORM': 'FIELD_NAME_DB'
                'id': false,
                'name': false,
                'month': false,
                'amount': false
            }
        },
        'notes' : {
            api: 'notes',
            db: 'notes',
            fields: {
                'text': 'body', 
                'title': 'title'
            }
        },        
    }
  };
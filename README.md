# dynamo-graphql-api

> Basic CRUD API with graphql & dynamodb (No resource ids!)

- stack: express + graphql + grahpiql + dynamodb
- Creates & seeds dynamodb table on Biblical artifacts from scraped wikipedia.  
- GUI for interfacing with dynamodb and graphql.  
- Provides CRUD API: create, read, update, delete & list.  


## Installation

```
npm i
mv .env.sample .env
npm run dynamodb
migrate up
npm start
```

## Usage

**dynamodb GUI**  
Visit `http://localhost:8000/shell/`

**graphiql**  
Visit `locahost:3000`, enter into first column:
```
# query {
#   read(name: "Saba'a Stele") {
#     name
#     location
#     date
#     significance
#   }
# }

query {
  list {
    name
    location
    date
    significance
  }
}

# mutation {
#   create(artifcat: {
#     	name: "Nimrud Slab"
#       location: "Queensland"
#     	date: "2017"
#     	significance: "New Year"
#   	}) {
#     name
#     location
#   }
# }
```

**cli**  
```
curl -XPOST -H "Content-Type:application/graphql"  -d 'mutation {
  create(artifcat: {
    	name: "ben"
      location: "Queensland"
    	date: "2017"
    	significance: "New Year"
  	}) {
    name
    location
  }
}' http://localhost:3000
```

## TODO
- [] update
- [] delete

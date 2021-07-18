const {DATOCMS_TOKEN} = process.env;
import { SiteClient } from 'datocms-client';

export default async (request, response) => {

   

    if(request.method === 'GET'){
      const result = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': DATOCMS_TOKEN,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ "query": `query {
            allGroups (
                filter: {
                  author: { in: "${request.query.user}"}
                }
              ){
                id
                title
                image
                url
              }
        }` })
      })
      .then((response) => response.json())

      response.
        status(200).
        json(result.data.allGroups)

    }

    else {
      const client = new SiteClient(DATOCMS_TOKEN);
      const registroCriado = await client.items.create({
          itemType: "976440",
          ...request.body,
      })

      response.
        status(201).
        json(registroCriado)

    }
}
const {PEXELS_TOKEN} = process.env;

export default async (request, response) => {

    if(request.method === 'GET'){
      const result = await fetch('https://api.pexels.com/v1/search?query=group&locale=pt-BR', {
        headers: {
          'Authorization': PEXELS_TOKEN
        }
      })
      .then((response) => response.json())
      
      const listResultFilter = result.photos.map(item => {
        return {'id':item.id,'url':item.src.tiny}
      })
      response.
        status(200).
        json(listResultFilter)

    }
}
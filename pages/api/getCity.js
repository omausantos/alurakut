const {GOOGLEMAPS_TOKEN} = process.env;


export default async (request, response) => {

    const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${request.query.latlng}&key=AIzaSyBmXHxby6s2tOMKgsE_7MX0DNkzshanink`)
        .then((response) => response.json())

    response.status(200).json(result.results[0].address_components[3].long_name)
}
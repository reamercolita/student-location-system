const GEOCODING_ENDPOINT = 'https://nominatim.openstreetmap.org/search'

export async function geocodeAddress(address) {
  const params = new URLSearchParams({
    q: address,
    format: 'jsonv2',
    limit: '1',
    addressdetails: '1',
  })

  const response = await fetch(`${GEOCODING_ENDPOINT}?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Unable to contact the geocoding service.')
  }

  const results = await response.json()

  if (!results.length) {
    throw new Error(
      'Address not found. Try adding the city, province, or a more complete address.',
    )
  }

  return {
    lat: Number.parseFloat(results[0].lat),
    lng: Number.parseFloat(results[0].lon),
    displayName: results[0].display_name,
  }
}

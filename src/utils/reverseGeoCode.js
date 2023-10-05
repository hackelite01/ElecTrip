const API_KEY = "z6DIYeUVZ6oFAYoGIfL2AYS6uLuUi7sdLIoTFuALy3o";

const reverseGeoCode = async (coordinates) => {
  const API_ENDPOINT = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${coordinates.lat},${coordinates.lng}&lang=en-US&apiKey=${API_KEY}`;
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data.items[0].title;
};

export { reverseGeoCode };

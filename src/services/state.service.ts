
export const fetchStatesRequest = async () => {
  let response = await fetch(
    'https://nga-states-lga.onrender.com/fetch'
  );
  return await response.json();
}

export const getLGAFromApiRequest = async (state?: string) => {
  let response = await fetch(
    'https://nga-states-lga.onrender.com/?state=' + state
  );
  return await response.json();
}
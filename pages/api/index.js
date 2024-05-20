import axios from 'axios';

export default async (req, res) => {
  const { data } = await axios.get(`${req.url.slice(6)}`);
  res.json(data);
};
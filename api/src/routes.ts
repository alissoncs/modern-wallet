import { Router } from 'express';

const routes = Router();

//primary routes
routes.get("/", (req, res) => {
  return res.json([ 'done' ]);
});

export default routes;

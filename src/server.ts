

import server from './app';
import { CONSTANTS } from "./config/constants";


server.listen(process.env.PORT || 3000, () => console.log(`Listening on localhost:${CONSTANTS.MESSAGES.PORT}`));
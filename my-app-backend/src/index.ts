import config from './config.js';
import { app } from './server.js';
const port = config.port ?? 3000;

// **** Run **** //
app.listen(port, () => console.log(`Server is running on port ${port}`));

import app from './app';
import { PORT } from './config/config';

// -- The APP is listening to the port set in the config file -- //
app.listen(PORT, () => {
    console.log(`The server's running on port ${PORT}`);
});
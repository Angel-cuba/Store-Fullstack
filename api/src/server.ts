import app from './app'
import './config/db.connection'

app.listen(app.get('port'), () =>
  console.log('Server on port', app.get('port'))
)

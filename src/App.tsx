import React, { useState } from 'react'
import * as ROUTES from './assets/routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { FullScreen, Login, Gallery } from './components'
import './styles/App.scss'

/*
TODO:
- Admin interface to upload photos
- Load photos from firebase storage
- Fetch url and metadata from firestore
- Compress image during upload to enable faster loading of gallery view
- Lazyload images
*/

const App: React.FC = () => {
    return (
        <div className="App">
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path={ROUTES.LOGIN} exact component={Login} />
                    <Route path={ROUTES.GALLERY} exact component={Gallery} />
                    <Route>
                        <div>
                            <p>404</p>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App

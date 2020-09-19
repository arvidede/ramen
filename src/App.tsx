import React, { useState } from 'react'
import * as ROUTES from './assets/routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Gallery, Admin } from './components'
import './styles/App.scss'

/*
TODO:
- [x] Login interface
- [] Admin interface to upload photos
- [] Upload multiple photos
- [] Load photos from firebase storage
- [] Fetch url and metadata from firestore
- [] Compress image during upload to enable faster loading of gallery view
- [] Lazyload images
- [] Standardized image size
- [] Enable uploading user to crop image
*/

const App: React.FC = () => {
    return (
        <div className="App">
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path={ROUTES.ADMIN} exact component={Admin} />
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

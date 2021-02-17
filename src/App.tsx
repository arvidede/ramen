import React from 'react'
import * as ROUTES from './assets/routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Gallery, Admin } from './components'
import './styles/App.scss'

/*
TODO:
- [x] Login interface
- [x] Admin interface to upload photos
- [x] Upload multiple photos
- [x] Load photos from firebase storage
- [x] Fetch url and metadata from firestore
- [] Compress image during upload to enable faster loading of gallery view
- [] Lazyload images
- [] Standardized image size
- [] Enable uploading user to crop image
*/

const App: React.FC = () => {
    return (
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
    )
}

export default App

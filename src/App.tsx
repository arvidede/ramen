import React from 'react'
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import { Admin, Gallery } from './components'
import './styles/App.scss'
import Routes from './utils/routes'

/*
TODO:
- [x] Login interface
- [x] Admin interface to upload photos
- [x] Upload multiple photos
- [x] Load photos from firebase storage
- [x] Fetch url and metadata from firestore
- [x] Compress image during upload to enable faster loading of gallery view
- [x] Lazyload images
- [] Standardized image size
- [] Enable uploading user to crop image
*/

const App: React.FC = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path={Routes.Admin} element={<Admin />} />
                <Route path={Routes.Gallery} element={<Gallery />} />
                <Route
                    path="*"
                    Component={() => (
                        <div>
                            <p>404</p>
                        </div>
                    )}
                ></Route>
            </Switch>
        </Router>
    )
}

export default App

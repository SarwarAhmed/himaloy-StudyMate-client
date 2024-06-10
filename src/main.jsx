import ReactDOM from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './providers/AuthProviders.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </HelmetProvider>
)

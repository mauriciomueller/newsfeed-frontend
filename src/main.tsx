import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import { queryClient } from './services/queryClient'
import { QueryClientProvider } from 'react-query'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "./styles/vars.css"
import { SettingsProvider } from './context/SettingsContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<SettingsProvider>
						<App />
					</SettingsProvider>
				</AuthProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>,
)

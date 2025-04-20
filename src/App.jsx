import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import Chatdata from './Pages/Chatdata'
import PageNotFound from './Pages/PageNotFound'
import Signup from './Pages/Signup'
import { Provider } from 'react-redux'
import store from './Redux/Store'

const App = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
           <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/log-in" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/chat-with-login" element={<Chatdata />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
      </BrowserRouter>
      </Provider>
  )
}

export default App
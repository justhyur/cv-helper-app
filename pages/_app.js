import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from '/lib/Context';
import {useEffect} from 'react';
import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  useEffect(()=>{
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    async function establishConnection(){
        try {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            axios.post(`${API_URL}/connection`, {...result, pathname: router.pathname, localStorage: {...localStorage, "ally-supports-cache": false}}).catch((e)=>{console.log(e)});
        }catch (e) {
            axios.post(`${API_URL}/connection`, {err: e}).catch((e)=>{console.log(e)})
        }
    }
    establishConnection();
  },[Component]) 

  return(<>
      <header>
        <h1 className="title">
          Hyur&apos;s <Link className="main-link" href="/"><b>CV Helper</b></Link>
        </h1>
      </header>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="light"
        />
    </>
  ) 
}

export default MyApp

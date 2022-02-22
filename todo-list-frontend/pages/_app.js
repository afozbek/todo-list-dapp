import { TransactionContextProvider } from "contexts/TransactionContext";
import { MoralisProvider } from "react-moralis";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "scss/main.scss";
import Modal from "react-modal/lib/components/Modal";

function MyApp({ Component, pageProps }) {
	const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
	const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;

	Modal.setAppElement("#__next");

	return (
		<MoralisProvider appId={appId} serverUrl={serverUrl}>
			<ToastContainer />
			<TransactionContextProvider>
				<Component {...pageProps} />
			</TransactionContextProvider>
		</MoralisProvider>
	);
}

export default MyApp;

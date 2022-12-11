import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPrompt(){
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
      } = useRegisterSW();

      const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
      }

      return (
        <div className="p-0 m-0 w-0 h-0">
          { (offlineReady || needRefresh) ?
             <div className="fixed right-0 bottom-0 m-4 p-3 rounded z-10 text-left shadow-lg bg-gray-700 text-white">
                <div className="mb-2">
                  { offlineReady
                    ? <span>App ready to work offline</span>
                    : <span>New content available, click on reload button to update.</span>
                  }
                </div>
                { needRefresh  ? (
                    <button onClick={() => updateServiceWorker(true)} type="button" className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out mr-3">Reload</button>
                ) : null }
                <button onClick={() => close()} type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Close</button>
            </div> : null
          }
        </div>
      );
}
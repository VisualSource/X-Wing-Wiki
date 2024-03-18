import { useRegisterSW } from "virtual:pwa-register/react";
import { Transition } from "@headlessui/react";

export default function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="m-0 h-0 w-0 p-0">
      <Transition
        show={offlineReady || needRefresh}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="-translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="-translate-x-0"
        leaveTo="translate-x-full"
        className="fixed bottom-0 right-0 z-10 m-4 rounded bg-gray-700 p-3 text-left text-white shadow-lg"
      >
        <div className="mb-2">
          {offlineReady ? (
            <span>App ready to work offline</span>
          ) : (
            <span>
              New content available, click on reload button to update.
            </span>
          )}
        </div>
        {needRefresh ? (
          <button
            onClick={() => updateServiceWorker(true)}
            type="button"
            className="mr-3 inline-block rounded bg-green-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg"
          >
            Reload
          </button>
        ) : null}
        <button
          onClick={() => close()}
          type="button"
          className="inline-block rounded bg-gray-800 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg"
        >
          Close
        </button>
      </Transition>
    </div>
  );
}

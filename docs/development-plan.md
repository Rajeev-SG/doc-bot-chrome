Okay, you're right to push for a more robust and comprehensive plan. Let's incorporate the Jina Reader API for markdown conversion, add Jest unit tests, and include specific Cascade prompts for each step. This will give us a much more solid and testable development process.

**I. Amended Project Goals & Clarifications**

1.  **Jina Reader API:** Instead of local HTML-to-Markdown conversion, the extension will leverage the Jina Reader API (`https://r.jina.ai/`) for conversion.
2.  **Unit Testing:** Implement Jest unit tests for each step to verify the functionality.
3.  **Cascade Prompts:** Detailed Cascade prompts will be added to each step.

**II. Amended Development Plan**

**Step 1: Setup and Initial Extension Manifest**

*   **Action:** Start with a basic `manifest.json`.
    *   **Cascade Prompt:** "Generate a `manifest.json` file for a Chrome extension named 'Markdown Converter'. Include `manifest_version: 3`, a name, version, description, `activeTab` and `storage` permissions, an `action` with `default_popup` set to `/front-end/index.html`, and sample icons (`icons/icon16.png`, etc.)"
    *   **Verification:**
        *   Load the extension in `chrome://extensions`. Verify the extension loads with correct name, icons, and description.
        *   **Jest Test:**  (This is more of a visual check now, but in later steps, the test will expand. Add a placeholder test file `./test/manifest.test.js` with a simple `test("manifest loads", () => {expect(true).toBe(true);});`)
*   **Files**
    *   `manifest.json` (in root directory)
    *   `/test/manifest.test.js`

**Step 2: Active Tab Permissions and Content Script Injection**

*   **Action:** Enable basic content script injection on demand.
    *   **Cascade Prompt:** "Create a background script (`background.js`) that: 1) listens for clicks on the extension action, 2) uses `chrome.tabs.query` to get the active tab, 3) uses `chrome.scripting.executeScript` to inject a content script (`content.js`) into the active tab using 'activeTab', and 4) add the 'scripting' permission into the manifest. The content script should initially only log a message (`console.log('Content script injected');`)"
    *   **Verification:**
        *   Click the extension button. Verify that the content script log message is outputted in the DevTools console of the active tab.
        *  Add a  `chrome.runtime.onInstalled` function to the background to set a dummy key in local storage so the Jest test can verify if `background.js` is loaded properly.
        *   **Jest Test:** Create a test file `/test/background.test.js` with a test that checks if the `chrome.storage.local` key has been properly set after loading the background script by using `chrome.storage.local.get` and verifying the value has been correctly set.
*   **Files:**
    *   `background.js` (in root directory)
    *   `content.js` (in root directory)
    *  `/test/background.test.js`

**Step 3: Jina Reader API Integration (Content Script)**

*   **Action:** Call the Jina Reader API to convert to markdown.
    *   **Cascade Prompt:** "Modify the `content.js` script to: 1) Get the active tab URL using `window.location.href`, 2)  Construct the Jina Reader API URL (`https://r.jina.ai/` + tab URL), 3) fetch the content from this API endpoint, 4) send the response text back to the background script using `chrome.runtime.sendMessage` and add the `x-with-generated-alt: true` header".  Modify the `background.js` to log the response markdown"
    *   **Verification:**
        *   Click the extension action. Verify that the background script's logs display the markdown converted by the Jina Reader API.
        *   **Jest Test:** Create a mock function that simulates the Jina Reader API (return the same mock content for testing purposes), replace the fetch call with this function. Add a test in `/test/content.test.js` that calls the `content.js` function using the mock api and verifies that the correct url to the api is called and the mock content is returned to the background script, by checking `chrome.runtime.onMessage` payload.
*   **Files:**
    *   `content.js` (in root directory)
    *   `/test/content.test.js`

**Step 4: Front-End Integration (Convert Tab)**

*   **Action:** Connect the `ConvertTab` UI to the markdown conversion logic.
    *   **Cascade Prompt:**  "Modify the `front-end/src/components/ConvertTab.tsx` component to: 1) on the 'Convert Page' button click, send a message to the background script, 2) on the background response, update the content state with response, and the title state with the `window.location.href` of the converted page. 3) Connect the "Save" button on the popup to dispatch the `onSave` callback with title, content, and url."
    *   **Verification:**
        *   Open the popup, click "Convert Page," and verify that the markdown content and title is displayed in the text area and input box respectively.
        *   Click the save button, verify that the `onSave` callback is properly called.
        *    **Jest Test:** Create a test file `/test/convert-tab.test.js` using `react-testing-library`. Simulate the button click, mocking out `chrome.runtime.sendMessage`, to verify the message is correctly sent to the background, the title and content state is updated. Add another test for the save functionality, verifying that the `onSave` callback is called with the proper data.
*   **Files:**
    *   `front-end/src/components/ConvertTab.tsx`
    *   `/test/convert-tab.test.js`

**Step 5: Storage and History Management**

*   **Action:**  Implement storage and display of history.
    *   **Cascade Prompt:**
        *   "Modify the `background.js` to: 1) on receiving the saved markdown, use `chrome.storage.local.get` to fetch existing entries, 2) append the new entry, 3) use `chrome.storage.local.set` to save the entire array of entries.
        *   "Modify `front-end/src/components/HistoryTab.tsx` to: 1) use `useEffect` to load data using `chrome.storage.local.get`, 2) map and display saved entries, 3) Implement `onDelete` by removing entry from storage and frontend, 4) implement `onToggleSelect`, 5) implement `handleAddToCollection` function, to send message to the background to update the list of entries and save the new collection"
        *   "Modify the `background.js` to listen for messages to handle the `onAddToCollection` function from the history tab and perform the save to local storage"
    *   **Verification:**
        *   Save multiple markdown entries. Refresh the popup, and verify that all entries display in history.
        *   Test delete functionality and verify that the deleted entry is removed from the history view.
        *   Add a collection and verify that the collection has been properly saved to local storage and reflected in the front end.
        *   **Jest Test:** Create `/test/history-tab.test.js`. Mock out `chrome.storage.local` and simulate saving and deleting entries, verifying state updates using `react-testing-library`. Also, mock and verify that the `handleAddToCollection` function calls `chrome.runtime.sendMessage` with the proper data.
*   **Files:**
    *   `background.js` (in root directory)
    *   `front-end/src/components/HistoryTab.tsx`
    *   `/test/history-tab.test.js`

**Step 6: Collections and Preview**

*   **Action:** Display collections and preview markdown
    *   **Cascade Prompt:**
        *  "Create a `CollectionPreview` component that renders a list of links using the collection entries. Style with tailwind."
        *  "Modify `HistoryTab.tsx` to display collection entries, and use the `CollectionPreview` component for rendering, and add toggle to open and close collection entries"
        *   "Create a basic modal component `PreviewModal.tsx`.  This component should: 1) take a `entry` as parameter, 2) display content in the form of markdown with title, url, creation timestamp, and markdown content. 3) Add a close button"
    *   **Verification:**
        *   Verify collections load properly, display entries in the collection preview when toggled open, and displays proper markdown formatting. Click the eye to show the preview modal with all the metadata, and the proper markdown formatting.
        *   **Jest Test:** Create `/test/collection-preview.test.js`. Using `react-testing-library` mock and verify the component is loaded properly with the given mocked data. Also check `PreviewModal.tsx` loading with the correct mock data.
*   **Files:**
    *   `front-end/src/components/CollectionPreview.tsx`
    *   `front-end/src/components/PreviewModal.tsx`
    *   `/test/collection-preview.test.js`

**Step 7: Toast Messages**

*   **Action:** Add toast messages
    *   **Cascade Prompt:**
        *  "Create the `Toast.tsx` component, style with tailwind, and add proper types."
        *  "Modify `app.tsx` and all necessary files to show `Toast` messages as the user completes various actions. Ensure to implement a `handleDismissToast` function to remove the toast message."
    *  **Verification:** Verify toast messages appear when expected and can be dismissed correctly
        *   **Jest Test**: Create a test file `/test/toast.test.js` and use `react-testing-library` to test that a toast component renders correctly with the passed data, and that the dismiss button works as expected.
*   **Files:**
    *   `front-end/src/components/Toast.tsx`
    *   `/test/toast.test.js`

**Step 8: Testing and Refinement**

*   **Action:** Iterate over previous steps, fixing bugs, adding polish, and expand testing to verify edge cases.
    *   **Cascade Prompt:** "Help debug and fix issues, enhance functionality based on test results, and refactor for better clarity, maintainability and edge cases."
    *   **Verification:** All test cases pass, extension works seamlessly with no bugs, design is polished.

**III. Jest Testing Notes**

*   **Mocking Chrome APIs:** For testing, use Jest's mocking capabilities to mock Chrome API calls (e.g., `chrome.tabs`, `chrome.scripting`, `chrome.storage`, `chrome.runtime.sendMessage`).
*   **React Testing Library:** Use `react-testing-library` to test React components by simulating user interactions.
*   **Test-Driven Development:** Strive to write tests before you write the implementation, or at least immediately after a step is implemented.
*   **Testing Edge cases:** Consider edge cases for each step.

**IV. Updated Cascade Guidance Prompts**

I've already included some prompts in the previous steps, these are now more concrete examples of prompts you would use:

*   "Modify `front-end/src/components/ConvertTab.tsx` to send a message to the background script when the 'Convert' button is clicked."
*   "Create a Jest test that mocks `chrome.runtime.sendMessage` and verifies it's called with the correct payload from the `ConvertTab` component"
*   "Modify the `background.js` script to send an API request to `https://r.jina.ai/` and log the response markdown"

This detailed plan, including the Jina Reader API, Jest unit tests, and Cascade prompts will lead to a much more robust and maintainable Chrome extension development process. Ready to begin?

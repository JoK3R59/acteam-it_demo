import { configureStore } from '@reduxjs/toolkit';

import connectedSlice from './features/login/connectedSlice';
import directoryPDFSlice from './features/directoryPDF/directoryPDFSlice';
import linkWebviewSlice from './features/linkWebview/linkWebviewSlice';

export const store = configureStore({
  reducer: {
    connected: connectedSlice,
    directoryPDF: directoryPDFSlice,
    linkWebview: linkWebviewSlice
  },
});
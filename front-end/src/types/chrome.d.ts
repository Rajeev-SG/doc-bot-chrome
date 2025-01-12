/// <reference types="chrome"/>

declare namespace Chrome {
  export type TabQueryInfo = chrome.tabs.QueryInfo;
  export type Tab = chrome.tabs.Tab;
  export type Runtime = typeof chrome.runtime;
}

import React from "react";
import { MovieConsumer } from "../MovieContext";

export default function HeaderBar() {
  return (
    <MovieConsumer>
      {context => (
        <div className="header">
          <img src="" alt="M-Box" />
          <div className="controls">
            <div className="searchbox">
              <input type="text" />
              <div className="search-result" />
            </div>
            <select onChange={e => context.onLangSelect(e.target.value)}>
              <option value="zh-TW">zh-TW</option>
              <option value="en-US">en-US</option>
            </select>
          </div>
        </div>
      )}
    </MovieConsumer>
  );
}

import React, { PureComponent } from "react";
import { MovieConsumer } from "../MovieContext";
import SearchResults from "./SearchResults";
import { withNamespaces } from "react-i18next";
import logo from "../../images/tmdb.svg";

class HeaderBar extends PureComponent {
  state = {
    focus: false,
  };

  onFocusHandler() {
    this.state.focus === false
      ? this.setState({ focus: true })
      : this.setState({ focus: false });
  }

  render() {
    return (
      <MovieConsumer>
        {context => (
          <div className="header">
            <img src={logo} alt="M-Box" className="logo" />
            <div className="controls">
              <div className="searchbox">
                <input
                  type="text"
                  placeholder={this.props.t("enterSearchTerm")}
                  onChange={e => context.onInputChange(e.target.value)}
                  onFocus={e => this.onFocusHandler(e)}
                  onBlur={e => this.onFocusHandler(e)}
                  value={context.searchTerm}
                  style={{ maxWidth: this.state.focus ? 250 : 65 }}
                />
                <div className="search-result">
                  <SearchResults
                    results={context.searchResults}
                    term={context.searchTerm}
                    handleClick={context.onSearchResultClicked}
                  />
                </div>
              </div>
              <select onChange={e => context.onLangSelect(e.target.value)}>
                <option value="zh-TW">{this.props.t("zh-TW")}</option>
                <option value="en-US">{this.props.t("en-US")}</option>
              </select>
            </div>
          </div>
        )}
      </MovieConsumer>
    );
  }
}

export default withNamespaces()(HeaderBar);

import * as React from 'react';

class UserSettingsSearch extends React.Component<any, any> {
    handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    }
    render() {
        return <div className="user-settings-search">
            <form className="user-settings-search-form" onSubmit={this.handleSearch}>
                <fieldset className="inline">
                    <label htmlFor="">search field</label>
                    <select>
                        <option value="email">email</option>
                        <option value="name">name</option>
                        <option value="role">role</option>
                    </select>
                    <label htmlFor="">sort by</label>
                    <select>
                        <option value="field">search field</option>
                        <option value="date">date created</option>
                    </select>
                </fieldset>
                <fieldset className="inline">
                    <input id="user-search" type="text" placeholder="search query" />
                    <button type="submit">search</button>
                </fieldset>
            </form>
        </div>
    }
}

export default UserSettingsSearch;